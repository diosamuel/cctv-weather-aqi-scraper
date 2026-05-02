-- Simple plain tables extracted from JSON files in /dataset
-- Dialect: DuckDB

-- ============================================
-- 1) cctv-chart1Data.json (1 row per snapshot)
-- ============================================
CREATE SEQUENCE IF NOT EXISTS seq_vehicle_speed_id START 1;

CREATE TABLE IF NOT EXISTS vehicle_speed (
  id BIGINT PRIMARY KEY DEFAULT nextval('seq_vehicle_speed_id'),
  camera_code VARCHAR(32),
  last_update_5minutes TIMESTAMP,
  label5min_data JSON,
  listchart1_normal JSON,
  listchart1_opposite JSON,
  speed_normal JSON,
  speed_opposite JSON,
  speed_gol_normal JSON,
  speed_gol_opposite JSON,
  speed_max_gol_normal_list JSON,
  speed_max_gol_opposite_list JSON,
  ingested_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- 2) cctv-chart2Data.json (1 row per snapshot)
-- ============================================
CREATE SEQUENCE IF NOT EXISTS seq_hourly_vehicle_speed_id START 1;

CREATE TABLE IF NOT EXISTS hourly_vehicle_speed (
  id BIGINT PRIMARY KEY DEFAULT nextval('seq_hourly_vehicle_speed_id'),
  camera_code VARCHAR(32),
  hourly_label JSON,
  listdata60_60_sm JSON,
  listdata60_60_mp JSON,
  listdata60_60_ks JSON,
  listdata60_60_bb JSON,
  listdata60_60_tb JSON,
  totalvolume_sm NUMERIC(14,3),
  totalvolume_mp NUMERIC(14,3),
  totalvolume_ks NUMERIC(14,3),
  totalvolume_bb NUMERIC(14,3),
  totalvolume_tb NUMERIC(14,3),
  ingested_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- 3) cctv-chart3Data.json (1 row per snapshot)
-- ============================================
-- Keep all dynamic comparison series as JSON columns.
CREATE SEQUENCE IF NOT EXISTS seq_all_timeseries_vehicle_speed_id START 1;

CREATE TABLE IF NOT EXISTS all_timeseries_vehicle_speed (
  id BIGINT PRIMARY KEY DEFAULT nextval('seq_all_timeseries_vehicle_speed_id'),
  camera_code VARCHAR(32),
  hourly_label JSON,

  datanormal_sm JSON,
  datanormal_mp JSON,
  datanormal_ks JSON,
  datanormal_bb JSON,
  datanormal_tb JSON,
  datanormal_all JSON,

  datalastdatenormal_sm JSON,
  datalastdatenormal_mp JSON,
  datalastdatenormal_ks JSON,
  datalastdatenormal_bb JSON,
  datalastdatenormal_tb JSON,
  datalastdatenormal_all JSON,

  datalast7normal_sm JSON,
  datalast7normal_mp JSON,
  datalast7normal_ks JSON,
  datalast7normal_bb JSON,
  datalast7normal_tb JSON,
  datalast7normal_all JSON,

  dataopposite_sm JSON,
  dataopposite_mp JSON,
  dataopposite_ks JSON,
  dataopposite_bb JSON,
  dataopposite_tb JSON,
  dataopposite_all JSON,

  datalastdateopposite_sm JSON,
  datalastdateopposite_mp JSON,
  datalastdateopposite_ks JSON,
  datalastdateopposite_bb JSON,
  datalastdateopposite_tb JSON,
  datalastdateopposite_all JSON,

  datalast7opposite_sm JSON,
  datalast7opposite_mp JSON,
  datalast7opposite_ks JSON,
  datalast7opposite_bb JSON,
  datalast7opposite_tb JSON,
  datalast7opposite_all JSON,

  databoth_sm JSON,
  databoth_mp JSON,
  databoth_ks JSON,
  databoth_bb JSON,
  databoth_tb JSON,
  databoth_all JSON,

  datalastdateboth_sm JSON,
  datalastdateboth_mp JSON,
  datalastdateboth_ks JSON,
  datalastdateboth_bb JSON,
  datalastdateboth_tb JSON,
  datalastdateboth_all JSON,

  datalast7both_sm JSON,
  datalast7both_mp JSON,
  datalast7both_ks JSON,
  datalast7both_bb JSON,
  datalast7both_tb JSON,
  datalast7both_all JSON,

  ingested_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ========================================
-- 4) cctv-list.json (1 row per camera item)
-- ========================================
CREATE SEQUENCE IF NOT EXISTS seq_cctv_list_data_id START 1;

CREATE TABLE IF NOT EXISTS cctv_list_data (
  id BIGINT PRIMARY KEY DEFAULT nextval('seq_cctv_list_data_id'),
  camera_code VARCHAR(32),
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  location_text TEXT,
  route_slug VARCHAR(64),
  adm2 VARCHAR(13),
  ingested_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Populate administrative_code after loading wilayah_* tables:
--   cron/cctv_list_data_administrative_code.sql
