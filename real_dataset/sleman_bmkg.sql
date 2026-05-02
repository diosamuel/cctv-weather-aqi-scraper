-- BMKG-style weather JSON (Sleman sample)
-- Dialect: DuckDB
-- Source shape: real_dataset/sleman-bmkg.json
--
-- Root `lokasi` is flattened; nested `data` (array of lokasi + cuaca grids) is JSON.

CREATE SEQUENCE IF NOT EXISTS seq_sleman_bmkg_id START 1;

CREATE TABLE IF NOT EXISTS sleman_bmkg (
  id BIGINT PRIMARY KEY DEFAULT nextval('seq_sleman_bmkg_id'),

  adm1 VARCHAR(16),
  adm2 VARCHAR(16),
  adm3 VARCHAR(16),
  adm4 VARCHAR(32),
  provinsi VARCHAR(128),
  kotkab VARCHAR(128),
  kecamatan VARCHAR(128),
  desa VARCHAR(128),
  lon DOUBLE,
  lat DOUBLE,
  timezone VARCHAR(32),

  -- JSON `data` array from the file (each item: lokasi, cuaca nested arrays)
  weather_data JSON,

  ingested_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
