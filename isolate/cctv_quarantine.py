"""
For each CCTV camera:
  1. getKecamatanName(lat, lon) → kecamatan name from Nominatim
  2. findKabupaten(con, lat, lon)  → nearest kabupaten (kode, nama, distance)
  3. findKecamatanKode(con, kecamatan_name, kode_kabupaten) → wilayah match

Only cameras with a valid wilayah match are inserted into cctv_list_final.
adm2 = kabupaten kode, adm4 = kecamatan kode (first/best levenshtein match).
"""

import time
from pathlib import Path
import duckdb
from cctv_to_kecamatan import getKecamatanName, findKecamatanKode, NOMINATIM_DELAY_S
from cctv_to_kabupaten import findKabupaten

BASE_DIR = Path(__file__).resolve().parent
DUCKDB_FILE = BASE_DIR / "cctv.duckdb"

def run_finalize(con: duckdb.DuckDBPyConnection) -> None:
    rows = con.execute(
        """
        SELECT camera_code, latitude, longitude, location_text, route_slug
        FROM cctv_list
        WHERE latitude IS NOT NULL AND longitude IS NOT NULL
        ORDER BY camera_code
        """
    ).fetchall()

    if not rows:
        print("No CCTV rows with coordinates.")
        return

    def quarantine(camera_code, lat, lon, location_text, route_slug, kode_kabupaten, kode_kecamatan, reason):
        con.execute(
            """
            INSERT INTO cctv_list_quarantine
                (camera_code, latitude, longitude, location_text, route_slug, adm2, adm4)
            VALUES (?, ?, ?, ?, ?, ?, ?)
            """,
            [camera_code, float(lat), float(lon), location_text, route_slug, kode_kabupaten, kode_kecamatan],
        )
        print(f"QUARANTINE {camera_code}  adm2={kode_kabupaten!r}  adm4={kode_kecamatan!r}  reason={reason}")

    for i, (camera_code, lat, lon, location_text, route_slug) in enumerate(rows):
        if i and NOMINATIM_DELAY_S > 0:
            time.sleep(NOMINATIM_DELAY_S)

        kecamatan_name = getKecamatanName(float(lat), float(lon))
        kabupaten_row = findKabupaten(con, float(lat), float(lon))
        kode_kabupaten = kabupaten_row[0] if kabupaten_row else None
        nama_kabupaten = kabupaten_row[1] if kabupaten_row else None

        wilayah_results = []
        if kecamatan_name and kode_kabupaten:
            wilayah_results = findKecamatanKode(con, kecamatan_name, kode_kabupaten)

        if not wilayah_results:
            quarantine(camera_code, lat, lon, location_text, route_slug, kode_kabupaten, None, "no wilayah match")
            continue

        best_nama, kode_kecamatan, best_sim = wilayah_results[0]

        print(wilayah_results)
        # Some of the response returned kelurahan only which is not valid for bmkg parameter (must be kecamatan)
        # so we try to retrieve the first kecamatan below the kelurahan
        if len(kode_kecamatan) <= 8: # if pass -> indicating kelurahan
            deeper = con.execute(
                """
                SELECT kode, nama FROM wilayah_kecamatan_kelurahan
                WHERE kode LIKE ? || '%' AND length(kode) > 8
                LIMIT 1
                """,
                [kode_kecamatan],
            ).fetchone()
            if deeper:
                kode_kecamatan, best_nama = deeper[0], deeper[1]
            else:
                quarantine(camera_code, lat, lon, location_text, route_slug, kode_kabupaten, kode_kecamatan, "kode too short, no deeper kode found")
                continue

        con.execute(
            """
            INSERT INTO cctv_list_final
                (camera_code, latitude, longitude, location_text, route_slug, adm2, adm4)
            VALUES (?, ?, ?, ?, ?, ?, ?)
            """,
            [camera_code, float(lat), float(lon), location_text, route_slug, kode_kabupaten, kode_kecamatan],
        )
        print(
            f"INSERT {camera_code}  adm2={kode_kabupaten!r} ({nama_kabupaten!r})  "
            f"adm4={kode_kecamatan!r} ({best_nama!r}, sim={best_sim})"
        )

    print("Done finalize.")


if __name__ == "__main__":
    con = duckdb.connect(str(DUCKDB_FILE))
    run_finalize(con)
    con.close()
