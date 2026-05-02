"""
Fetch all ISPU (KemenLH) stations and insert into air_quality table.

API: GET https://ispu.kemenlh.go.id/apimobile/v1/getStations
Needs: pip install duckdb requests
"""

from __future__ import annotations

import json
from pathlib import Path

import duckdb
import requests

BASE_DIR = Path(__file__).resolve().parent
DUCKDB_FILE = BASE_DIR / "cctv.duckdb"
KEMENLH_URL = "https://ispu.kemenlh.go.id/apimobile/v1/getStations"

CHROME_UA = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36"
)


def _float(val):
    if val is None:
        return None
    try:
        return float(val)
    except (ValueError, TypeError):
        return None

def fetchStations() -> list[dict]:
    r = requests.get(
        KEMENLH_URL,
        headers={
            "User-Agent": CHROME_UA,
            "Accept": "application/json",
        },
        timeout=30,
    )
    r.raise_for_status()
    data = r.json()
    if not isinstance(data, dict):
        raise ValueError("KemenLH returned non-object JSON")
    return data.get("rows", [])


def insertStation(con: duckdb.DuckDBPyConnection, row: dict) -> None:
    con.execute(
        """
        INSERT INTO air_quality (
            id_stasiun, waktu, lat, lon,
            a_pm10, a_pm25, a_so2, a_co, a_o3, a_no2, a_hc,
            c_pm10, c_pm25, c_so2, c_co, c_o3, c_no2, c_hc,
            t_pm10, t_pm25, t_so2, t_co, t_o3, t_no2, t_hc,
            nama, alamat, kota, provinsi, param,
            stasiun_uji, stasiun_show, stasiun_show_detail,
            p3e, time_offset, time_z,
            is_maintenance, auto_validation, tipe,
            kelurahan, kecamatan,
            val, cat, kategori, waktu_text, tipe_text
        ) VALUES (
            ?, ?, ?, ?,
            ?, ?, ?, ?, ?, ?, ?,
            ?, ?, ?, ?, ?, ?, ?,
            ?, ?, ?, ?, ?, ?, ?,
            ?, ?, ?, ?, ?,
            ?, ?, ?,
            ?, ?, ?,
            ?, ?, ?,
            ?, ?,
            ?, ?, CAST(? AS JSON), ?, ?
        )
        """,
        [
            row.get("id_stasiun"),
            row.get("waktu"),
            _float(row.get("lat")),
            _float(row.get("lon")),
            _float(row.get("a_pm10")),
            _float(row.get("a_pm25")),
            _float(row.get("a_so2")),
            _float(row.get("a_co")),
            _float(row.get("a_o3")),
            _float(row.get("a_no2")),
            _float(row.get("a_hc")),
            _float(row.get("c_pm10")),
            _float(row.get("c_pm25")),
            _float(row.get("c_so2")),
            _float(row.get("c_co")),
            _float(row.get("c_o3")),
            _float(row.get("c_no2")),
            _float(row.get("c_hc")),
            _float(row.get("t_pm10")),
            _float(row.get("t_pm25")),
            _float(row.get("t_so2")),
            _float(row.get("t_co")),
            _float(row.get("t_o3")),
            _float(row.get("t_no2")),
            _float(row.get("t_hc")),
            row.get("nama"),
            row.get("alamat"),
            row.get("kota"),
            row.get("provinsi"),
            row.get("param"),
            row.get("stasiun_uji"),
            row.get("stasiun_show"),
            row.get("stasiun_show_detail"),
            row.get("p3e"),
            row.get("time_offset"),
            row.get("time_z"),
            row.get("is_maintenance"),
            row.get("auto_validation"),
            row.get("tipe"),
            row.get("kelurahan"),
            row.get("kecamatan"),
            _float(row.get("val")),
            row.get("cat"),
            json.dumps(row.get("kategori"), ensure_ascii=False) if row.get("kategori") else None,
            row.get("waktu_text"),
            row.get("tipe_text"),
        ],
    )


def main() -> None:
    con = duckdb.connect(str(DUCKDB_FILE))

    try:
        stations = fetchStations()
    except (requests.RequestException, ValueError) as e:
        print(f"ERROR fetching stations: {e}")
        con.close()
        return

    if not stations:
        print("No stations returned from KemenLH API.")
        con.close()
        return

    inserted = 0
    errored = 0
    for row in stations:
        try:
            insertStation(con, row)
            inserted += 1
        except Exception as e:
            print(f"ERROR {row.get('id_stasiun', '?')}: {e}")
            errored += 1

    con.close()
    print(f"Done. {inserted} inserted, {errored} errors, {len(stations)} total stations.")


if __name__ == "__main__":
    main()
