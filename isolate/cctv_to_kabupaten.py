"""
Find nearest kabupaten by Euclidean distance on lat/lng.
Uses wilayah_provinsi_kabupaten table in DuckDB.
"""
from __future__ import annotations
import duckdb

def findKabupaten(con: duckdb.DuckDBPyConnection, lat: float, lon: float) -> tuple | None:
    """
    Return the closest wilayah_provinsi_kabupaten row by Euclidean distance.
    Returns a single row as a tuple, or None if the table is empty.
    """
    row = con.execute(
        """
        SELECT
            kode, nama,
            sqrt(pow(lat - ?, 2) + pow(lng - ?, 2)) AS distance
        FROM wilayah_provinsi_kabupaten
        WHERE lat IS NOT NULL AND lng IS NOT NULL AND length(kode) > 2
        ORDER BY distance ASC
        LIMIT 1;
        """,
        [lat, lon],
    ).fetchall()
    return row[0]

