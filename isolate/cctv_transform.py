import duckdb
import json
import time
import requests
from pathlib import Path
from typing import Any, Dict, List

BASE_DIR = Path(__file__).resolve().parent
CCTV_LIST_PATH = BASE_DIR / "dataset" / "cctv-list.json"

def load_camera_rows() -> List[List[Any]]:
    payload = json.loads(CCTV_LIST_PATH.read_text(encoding="utf-8"))
    camera_array = payload.get("cameraArray", [])
    if not isinstance(camera_array, list):
        raise ValueError("cameraArray is not a list")
    return camera_array

def insert_camera_list(con: duckdb.DuckDBPyConnection, camera_rows: List[List[Any]]) -> None:
    insert_sql = """
        INSERT INTO cctv_list (
            camera_code, latitude, longitude, location_text, route_slug, adm2, adm4
        ) VALUES (?, ?, ?, ?, ?,?,?)
    """
    for row in camera_rows:
        camera_code = str(row[0]) if len(row) > 0 else None
        lat = float(row[1]) if len(row) > 1 and row[1] is not None else None
        lon = float(row[2]) if len(row) > 2 and row[2] is not None else None
        location_text = str(row[4]) if len(row) > 4 else None
        route_slug = str(row[5]) if len(row) > 5 else None
        con.execute(insert_sql, [camera_code, lat, lon, location_text, route_slug, "NULL","NULL"])

def init_db(con: duckdb.DuckDBPyConnection) -> None:
    SCHEMA_FILE = BASE_DIR / "schema.sql"
    schema_sql = SCHEMA_FILE.read_text(encoding="utf-8")
    con.execute(schema_sql)

DUCKDB_PATH = BASE_DIR / "cctv.duckdb"

if __name__ == "__main__":
    camera_rows = load_camera_rows()
    con = duckdb.connect(str(DUCKDB_PATH))
    init_db(con)
    insert_camera_list(con, camera_rows)
    print("Success")
