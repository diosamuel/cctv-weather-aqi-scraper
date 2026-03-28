-- DuckDB: set cctv_list_data.administrative_code from nearest wilayah centroid.
--
-- Prereqs (same database):
--   - wilayah_provinsi_kabupaten (lat, lng, kode)
--   - wilayah_kecamatan_kelurahan (kode, nama) — no coordinates; used so kode
--     exists in the official hierarchy
--   - cctv_list_data (latitude, longitude)
--
-- Euclidean distance: (lat - lat)^2 + (lon - lon)^2 (same ordering as sqrt).
-- Re-runnable: NULLs administrative_code when camera coords are missing.

ALTER TABLE cctv_list_data ADD COLUMN IF NOT EXISTS administrative_code VARCHAR(13);

UPDATE cctv_list_data
SET administrative_code = NULL
WHERE latitude IS NULL OR longitude IS NULL;

UPDATE cctv_list_data
SET administrative_code = ranked.kode
FROM (
  SELECT id, kode
  FROM (
    SELECT
      c.id,
      w.kode,
      row_number() OVER (
        PARTITION BY c.id
        ORDER BY pow(c.latitude - w.lat, 2) + pow(c.longitude - w.lng, 2)
      ) AS rn
    FROM cctv_list_data c
    INNER JOIN wilayah_provinsi_kabupaten w
      ON w.lat IS NOT NULL AND w.lng IS NOT NULL
    INNER JOIN wilayah_kecamatan_kelurahan kk
      ON kk.kode = w.kode
    WHERE c.latitude IS NOT NULL AND c.longitude IS NOT NULL
  ) AS nearest_per_camera
  WHERE nearest_per_camera.rn = 1
) AS ranked
WHERE cctv_list_data.id = ranked.id;
