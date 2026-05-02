"""
Scheduler: fetch KemenLH AQI once per day.
Uses a shared DuckDB connection — no extra pool.
Run: python scheduler/aqi_scheduler.py
"""

import os
import sys
import time
from datetime import datetime, timedelta
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

import duckdb
from air_quality_index import fetchStations, insertStation

BASE_DIR = Path(__file__).resolve().parent.parent
DUCKDB_PATH = BASE_DIR / "cctv.duckdb"


def next_run_at() -> datetime:
    now = datetime.now()
    target = now.replace(hour=6, minute=0, second=0, microsecond=0)
    if now >= target:
        target += timedelta(days=1)
    return target


def run_aqi_ingest(con: duckdb.DuckDBPyConnection) -> None:
    try:
        stations = fetchStations()
    except Exception as e:
        print(f"  ERROR fetching stations: {e}")
        return

    if not stations:
        print("  No stations returned.")
        return

    ok, err = 0, 0
    for row in stations:
        try:
            insertStation(con, row)
            ok += 1
        except Exception as e:
            print(f"  ERROR {row.get('id_stasiun', '?')}: {e}")
            err += 1

    print(f"  → {ok} inserted, {err} errors, {len(stations)} total stations.")


def run(con: duckdb.DuckDBPyConnection) -> None:
    print("AQI scheduler started. Runs once/day at 06:00.")
    while True:
        print(f"\n[{datetime.now():%Y-%m-%d %H:%M:%S}] Running AQI ingest...")
        try:
            run_aqi_ingest(con)
        except Exception as e:
            print(f"ERROR in AQI ingest: {e}")

        nxt = next_run_at()
        sleep_s = (nxt - datetime.now()).total_seconds()
        if sleep_s <= 0:
            sleep_s = 86400
        print(f"Next run at {nxt:%Y-%m-%d %H:%M:%S} (sleeping {sleep_s:.0f}s)")
        time.sleep(sleep_s)


# if __name__ == "__main__":
#     con = duckdb.connect(str(DUCKDB_PATH))
#     run(con)
