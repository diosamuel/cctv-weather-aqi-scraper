"""
Reverse-geocode CCTV points with Nominatim. Match wilayah_kecamatan_kelurahan.nama
using address fields in order: city_district, village, town, suburb.
Scoped by administrative_code when set.

Needs: pip install duckdb requests
Run: python cctv_nominatim_wilayah.py
"""

from __future__ import annotations

import json
import sys
import time
from pathlib import Path

import duckdb
import requests

# --- config (edit here) ---
REPO_ROOT = Path(__file__).resolve().parent.parent
DUCKDB_FILE = REPO_ROOT / "cctv.duckdb"
NOMINATIM_DELAY_S = 1.05
OUTPUT_JSON_LINES = False

# Chrome-like User-Agent (Nominatim still expects modest request rate; see NOMINATIM_DELAY_S)
CHROME_USER_AGENT = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36"
)

NOMINATIM = "https://nominatim.openstreetmap.org/reverse"


def reverse_nominatim(lat: float, lon: float, *, timeout: float = 30) -> dict:
    r = requests.get(
        NOMINATIM,
        params={"lat": lat, "lon": lon, "format": "json", "addressdetails": 1},
        headers={
            "User-Agent": CHROME_USER_AGENT,
            "Accept": "application/json",
            "Accept-Language": "id,en",
        },
        timeout=timeout,
    )
    r.raise_for_status()
    data = r.json()
    if not isinstance(data, dict):
        raise ValueError("Nominatim returned non-object JSON")
    return data


def _addr_part(addr: dict, key: str) -> str | None:
    v = addr.get(key)
    if not v:
        return None
    t = str(v).strip()
    return t or None


def pick_place_fields(
    payload: dict,
) -> tuple[str | None, str | None, str | None, str | None, str | None, str | None]:
    """
    Returns (city_district, village, town, suburb, match_label, match_source).
    match_label: first non-empty among city_district, village, town, suburb.
    match_source: which key supplied match_label, or None.
    """
    addr = payload.get("address")
    if not isinstance(addr, dict):
        return None, None, None, None, None, None
    cd = _addr_part(addr, "city_district")
    vil = _addr_part(addr, "village")
    town = _addr_part(addr, "town")
    sub = _addr_part(addr, "suburb")
    if cd:
        return cd, vil, town, sub, cd, "city_district"
    if vil:
        return cd, vil, town, sub, vil, "village"
    if town:
        return cd, vil, town, sub, town, "town"
    if sub:
        return cd, vil, town, sub, sub, "suburb"
    return cd, vil, town, sub, None, None


def wilayah_matches(con: duckdb.DuckDBPyConnection, label: str, adm: str | None) -> list[tuple[str, str]]:
    label = " ".join(label.split()).strip()
    if not label:
        return []
    if adm:
        adm = adm.strip()
        q = """
            SELECT kode, nama FROM wilayah_kecamatan_kelurahan
            WHERE lower(trim(nama)) = lower(trim(?))
              AND (kode = ? OR kode LIKE ? || '.%')
            ORDER BY length(kode) DESC, kode
        """
        return [(str(a), str(b)) for a, b in con.execute(q, [label, adm, adm]).fetchall()]
    q = """
        SELECT kode, nama FROM wilayah_kecamatan_kelurahan
        WHERE lower(trim(nama)) = lower(trim(?))
        ORDER BY length(kode) DESC, kode
    """
    return [(str(a), str(b)) for a, b in con.execute(q, [label]).fetchall()]


def main() -> None:
    db = DUCKDB_FILE.resolve()
    if not db.is_file():
        print(f"Database not found: {db}", file=sys.stderr)
        sys.exit(2)

    con = duckdb.connect(str(db), read_only=True)
    try:
        con.execute("SELECT 1 FROM wilayah_kecamatan_kelurahan LIMIT 1")
    except duckdb.CatalogException:
        print("Missing table wilayah_kecamatan_kelurahan.", file=sys.stderr)
        sys.exit(3)

    rows = con.execute(
        """
        SELECT id, latitude, longitude, administrative_code
        FROM cctv_list_data
        WHERE latitude IS NOT NULL AND longitude IS NOT NULL
        ORDER BY id
        """
    ).fetchall()

    if not rows:
        print("No CCTV rows with coordinates.", file=sys.stderr)
        return

    results: list[dict] = []
    for i, (rid, lat, lon, adm) in enumerate(rows):
        if i and NOMINATIM_DELAY_S > 0:
            time.sleep(NOMINATIM_DELAY_S)
        adm_s = str(adm).strip() if adm is not None else None
        rec: dict = {
            "id": int(rid),
            "latitude": float(lat),
            "longitude": float(lon),
            "administrative_code": adm_s,
            "city_district": None,
            "village": None,
            "town": None,
            "suburb": None,
            "place_match_source": None,
            "nominatim_error": None,
            "display_name": None,
            "wilayah_matches": [],
        }
        try:
            data = reverse_nominatim(float(lat), float(lon))
        except (requests.RequestException, ValueError) as e:
            rec["nominatim_error"] = str(e)
            results.append(rec)
            continue

        rec["display_name"] = data.get("display_name")
        cd, vil, town, sub, label, src = pick_place_fields(data)
        rec["city_district"] = cd
        rec["village"] = vil
        rec["town"] = town
        rec["suburb"] = sub
        rec["place_match_source"] = src
        if label:
            for kode, nama in wilayah_matches(con, label, adm_s):
                rec["wilayah_matches"].append({"kode": kode, "nama": nama})
        results.append(rec)

    con.close()

    if OUTPUT_JSON_LINES:
        for r in results:
            print(json.dumps(r, ensure_ascii=False))
        return

    for r in results:
        adm = r["administrative_code"] or "—"
        if r["nominatim_error"]:
            print(f"id={r['id']} adm={adm} ERROR: {r['nominatim_error']}")
            continue
        cd = r["city_district"] or "—"
        vil = r["village"] or "—"
        town = r["town"] or "—"
        sub = r["suburb"] or "—"
        src = r["place_match_source"] or "—"
        label = r["city_district"] or r["village"] or r["town"] or r["suburb"] or "—"
        if not r["wilayah_matches"]:
            print(
                f"id={r['id']} city_district={cd!r} village={vil!r} town={town!r} suburb={sub!r} "
                f"match={label!r} (from {src}) adm={adm} → no wilayah match"
            )
        else:
            pass
            # for m in r["wilayah_matches"]:
            #     print(
            #         f"id={r['id']} city_district={cd!r} village={vil!r} town={town!r} suburb={sub!r} "
            #         f"match={label!r} (from {src}) adm={adm} → {m['kode']!r} {m['nama']!r}"
            #     )


if __name__ == "__main__":
    main()
