"""
Scheduler: fetch CCTV chart data every 30 seconds.
Uses a shared DuckDB connection — no extra pool.
Run: python scheduler/cctv_scheduler.py
"""

import os
import sys
import time
from datetime import datetime
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

import duckdb
from cctv_ingest_lifetime import load_camera_rows, crawl_once

BASE_DIR = Path(__file__).resolve().parent.parent
DUCKDB_PATH = BASE_DIR / "cctv.duckdb"
POLL_SECONDS = 30


def run(con: duckdb.DuckDBPyConnection) -> None:
    camera_rows = load_camera_rows(con)
    print(f"CCTV scheduler started. cameras={len(camera_rows)} interval={POLL_SECONDS}s")

    while True:
        print(f"\n[{datetime.now():%Y-%m-%d %H:%M:%S}] Running CCTV crawl...")
        started = time.time()
        try:
            crawl_once(con, camera_rows)
        except Exception as e:
            print(f"ERROR in CCTV crawl: {e}")

        elapsed = time.time() - started
        sleep_for = max(0.0, POLL_SECONDS - elapsed)
        print(f"Crawl took {elapsed:.1f}s, sleeping {sleep_for:.1f}s")
        time.sleep(sleep_for)


# if __name__ == "__main__":
#     con = duckdb.connect(str(DUCKDB_PATH))
#     run(con)
