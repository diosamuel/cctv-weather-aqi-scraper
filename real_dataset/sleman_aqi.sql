-- Sleman AQI feed (WAQI / aqicn-style JSON)
-- Dialect: DuckDB
-- Source shape: real_dataset/sleman-aqi.json

CREATE SEQUENCE IF NOT EXISTS seq_sleman_aqi_id START 1;

CREATE TABLE IF NOT EXISTS sleman_aqi (
  id BIGINT PRIMARY KEY DEFAULT nextval('seq_sleman_aqi_id'),

  status VARCHAR(16),
  aqi INTEGER,
  idx INTEGER,

  -- Optional; omit at insert if unused — stored as JSON array of objects
  attributions JSON,

  city_lat DOUBLE,
  city_lon DOUBLE,
  city_name VARCHAR(256),
  city_url TEXT,
  city_location VARCHAR(256),

  -- API field is spelled "dominentpol" in JSON
  dominant_pol VARCHAR(32),

  -- Nested index air quality (dew, h, p, pm25, …) — keep as JSON
  iaqi JSON,

  time_s VARCHAR(32),
  time_tz VARCHAR(16),
  time_unix BIGINT,
  time_iso TIMESTAMP,

  -- forecast.daily (pm10, pm25, uvi arrays, …) — keep as JSON
  forecast JSON,

  debug_sync VARCHAR(64),

  ingested_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
