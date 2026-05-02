"""
Read lat/lon from cctv_list in isolate/cctv.duckdb, reverse-geocode via
Nominatim, and return the kecamatan name from the first available address
field: city_district → village → town → suburb.

Needs: pip install duckdb requests
"""

from __future__ import annotations

import time
from pathlib import Path

import duckdb
import requests

BASE_DIR = Path(__file__).resolve().parent
DUCKDB_FILE = BASE_DIR / "cctv.duckdb"
NOMINATIM = "https://nominatim.openstreetmap.org/reverse"
NOMINATIM_DELAY_S = 1.05

CHROME_UA = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36"
)

KECAMATAN_KEYS = ("city_district", "village", "town", "suburb")


def getKecamatanName(lat: float, lon: float) -> str | None:
    """
    Reverse-geocode (lat, lon) via Nominatim and return the kecamatan name.
    Checks address fields in order: city_district, village, town, suburb.
    Returns the first non-empty value, or None if none found.
    """
    r = requests.get(
        NOMINATIM,
        params={"lat": lat, "lon": lon, "format": "json", "addressdetails": 1},
        headers={
            "User-Agent": CHROME_UA,
            "Accept": "application/json",
            "Accept-Language": "id,en",
        },
        timeout=30,
    )
    r.raise_for_status()
    data = r.json()

    addr = data.get("address")
    if not isinstance(addr, dict):
        return None

    for key in KECAMATAN_KEYS:
        val = addr.get(key)
        if val and str(val).strip():
            return str(val).strip()

    return None


def findKecamatanKode(con: duckdb.DuckDBPyConnection, kecamatan_name: str, kode_kabupaten:str) -> list[tuple[str, str]]:
    """
    LIKE-match kecamatan_name against wilayah_kecamatan_kelurahan.nama (case-insensitive).
    Returns list of (kode, nama) tuples.
    """
    if not kecamatan_name or not kecamatan_name.strip():
        return []
    nama_kecamatan = kecamatan_name.strip().lower()
    rows = con.execute(
        """
        SELECT nama, kode, levenshtein(?, lower(nama)) AS sim
        FROM wilayah_kecamatan_kelurahan
        WHERE sim < 2
          AND kode LIKE ? || '%'
          AND length(kode) > 8
        ORDER BY sim ASC
        """,
        [nama_kecamatan, kode_kabupaten],
    ).fetchall()
    return rows


# import duckdb
# con = duckdb.connect(str("cctv.duckdb"),read_only=True)
# res = findKecamatanKode(con, "caturharjo","34.04")

# print(res)