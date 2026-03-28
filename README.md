# Studi kasus: Sleman

## Konteks CCTV (Kemenpupr / apace-ai)


| Column        | Value                                                                                  |
| ------------- | -------------------------------------------------------------------------------------- |
| **Koordinat** | -7.681344, 110.338788                                                                  |
| **ID CCTV**   | `APC26015`                                                                             |
| **Lokasi**    | TEMPEL (SALAM) BTS. PROV. JATENG – BTS. KOTA SLEMAN, Kabupaten Sleman, D.I. Yogyakarta |


---

## Referensi API

Ringkasan endpoint yang dipakai untuk studi ini. Ganti `{cctvId}` dengan ID kamera (misalnya `APC26015`). Respons penuh disimpan di folder `[real_dataset/](real_dataset/)`; cuplikan di bawah mempercepat pemahaman struktur JSON.

### CCTV — Chart 1 (volume & kecepatan per golongan, jendela 5 menit)


| Column      | Value                                                                                         |
| ----------- | --------------------------------------------------------------------------------------------- |
| **Metode**  | `GET`                                                                                         |
| **URL**     | `https://apace-ai.com/generateChart1Data/{cctvId}`                                            |
| **Ringkas** | Label golongan, hitungan arah normal / berlawanan, kecepatan rata-rata & agregat per golongan |


```bash
curl --request GET \
  --url "https://apace-ai.com/generateChart1Data/APC26015" \
  --header "User-Agent: insomnia/12.3.1"
```

**Contoh respons** (dipangkas; file lengkap: `[real_dataset/sleman-cctv-chart1.json](real_dataset/sleman-cctv-chart1.json)`):

```json
{
  "label5MinData": [
    "Gol-1", "Gol-2", "Gol-3", "Gol-4", "Gol-5a", "Gol-5b",
    "Gol-6a", "Gol-6b", "Gol-7a", "Gol-7b", "Gol-7c", "Gol-8"
  ],
  "lastUpdate5minutes": "2026-03-27 15:15:00",
  "listChart1_Normal": [123, 56, 4, 19, 0, 0, 0, 3, 0, 0, 0, 0],
  "listChart1_Opposite": [172, 63, 7, 5, 0, 0, 0, 3, 0, 1, 0, 0],
  "speed_Normal": [28.02, 26.02, 25.11, 0.0, 0.0, 30.36, 28.61, 23.21, 0.0, 0.0, 0.0, 29.08],
  "speed_Opposite": [26.65, 26.08, 19.27, 6.15, 11.32, 0.0, 24.09, 0.0, 23.28, 0.0, 15.58, 28.78],
  "speed_gol_Normal": [27.706666666666667, 0.0, 10.12, 17.273333333333333, 19.041],
  "speed_gol_Opposite": [27.169999999999998, 6.15, 5.823333333333333, 15.790000000000001, 16.562],
  "speed_max_gol_Normal_list": [75, 84.93, 75, 75, 75],
  "speed_max_gol_Opposite_list": [75, 84.93, 75, 82.35000000000001, 75]
}
```

---

### CCTV — Chart 2 (volume per jam, 60 menit, komposisi SM / MP / KS / BB / TB)


| Column      | Value                                                                                                                        |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------- |
| **Metode**  | `GET`                                                                                                                        |
| **URL**     | `https://apace-ai.com/generateChart2Data/{cctvId}`                                                                           |
| **Ringkas** | `hourlyLabel` berisi 24 slot; setiap `listData60_60_`* adalah deret nilai per jam; `totalVolume_`* adalah total per kategori |


```bash
curl --request GET \
  --url "https://apace-ai.com/generateChart2Data/APC26015" \
  --header "User-Agent: insomnia/12.3.1"
```

**Contoh respons** (6 jam pertama; API mengembalikan 24 elemen per deret — lengkap: `[real_dataset/sleman-cctv-chart2.json](real_dataset/sleman-cctv-chart2.json)`):

```json
{
  "hourlyLabel": ["00-01", "01-02", "02-03", "03-04", "04-05", "05-06"],
  "listData60_60_SM": [452.0, 302.0, 247.0, 200.0, 275.0, 607.0],
  "listData60_60_MP": [239.0, 160.0, 145.0, 150.0, 179.0, 307.0],
  "listData60_60_KS": [0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
  "listData60_60_BB": [12.0, 9.0, 12.0, 11.0, 12.0, 36.0],
  "listData60_60_TB": [25.0, 17.0, 17.0, 30.0, 24.0, 23.0],
  "totalVolume_SM": 31042.0,
  "totalVolume_MP": 14309.0,
  "totalVolume_KS": 37.0,
  "totalVolume_BB": 1032.0,
  "totalVolume_TB": 301.0
}
```

---

### CCTV — Chart 3 (perbandingan harian / 7 hari / historis per jam)


| Column      | Value                                                                                                                                      |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| **Metode**  | `GET`                                                                                                                                      |
| **URL**     | `https://apace-ai.com/generateChart3Data/{cctvId}`                                                                                         |
| **Ringkas** | Sama-sama berbasis `hourlyLabel`; banyak kunci `dataNormal_`*, `dataLastDateNormal_`*, `dataLast7Normal_*`, dll. untuk grafik perbandingan |


```bash
curl --request GET \
  --url "https://apace-ai.com/generateChart3Data/APC26015" \
  --header "User-Agent: insomnia/12.3.1"
```

**Contoh respons** (6 jam pertama pada beberapa kunci; respons asli panjang — `[real_dataset/sleman-cctv-chart3.json](real_dataset/sleman-cctv-chart3.json)`):

```json
{
  "hourlyLabel": ["00-01", "01-02", "02-03", "03-04", "04-05", "05-06"],
  "dataNormal_SM": [23, 21, 10, 13, 22, 94],
  "dataNormal_MP": [68, 46, 67, 72, 81, 143],
  "dataNormal_All": [109, 79, 87, 107, 116, 274],
  "dataLastDateNormal_SM": [20, 16, 26, 22, 38, 58],
  "dataLast7Normal_SM": [23, 15, 10, 9, 13, 64]
}
```

*(Respons lengkap berisi puluhan field serupa untuk KS, BB, TB, dan agregat `All`.)*

---

### Cuaca — BMKG (publik, ADM4)


| Column      | Value                                                                                                         |
| ----------- | ------------------------------------------------------------------------------------------------------------- |
| **Metode**  | `GET`                                                                                                         |
| **URL**     | `https://api.bmkg.go.id/publik/prakiraan-cuaca?adm4=34.04.13.2001`                                            |
| **Catatan** | `adm4` Sleman untuk contoh ini; bentuk JSON mengikuti dokumentasi BMKG (lokasi + array prakiraan per periode) |


```bash
curl --request GET \
  --url "https://api.bmkg.go.id/publik/prakiraan-cuaca?adm4=34.04.13.2001"
```

**Contoh bentuk respons** (cuplikan dari `[dataset/example-weather-bmkg.json](dataset/example-weather-bmkg.json)`; wilayah contoh berbeda, strukturnya sama):

```json
{
  "lokasi": {
    "adm4": "18.71.02.1003",
    "provinsi": "Lampung",
    "kotkab": "Kota Bandar Lampung",
    "kecamatan": "Sukarame",
    "desa": "Sukarame",
    "lon": 105.2996544044,
    "lat": -5.3876462162,
    "timezone": "Asia/Jakarta"
  },
  "data": [
    {
      "lokasi": { "type": "adm4", "adm4": "18.71.02.1003" },
      "cuaca": [
        [
          {
            "datetime": "2026-03-25T21:00:00Z",
            "t": 23,
            "weather_desc": "Berawan",
            "weather_desc_en": "Mostly Cloudy",
            "ws": 11.7,
            "hu": 96,
            "local_datetime": "2026-03-26 04:00:00"
          }
        ]
      ]
    }
  ]
}
```

---

### Kualitas udara — WAQI (geo feed)


| Column      | Value                                                                            |
| ----------- | -------------------------------------------------------------------------------- |
| **Metode**  | `GET`                                                                            |
| **URL**     | `https://api.waqi.info/feed/geo:{lat};{lon}/?token={token}`                      |
| **Catatan** | Ganti token dengan kunci Anda; jangan commit token produksi ke repositori publik |


```bash
curl --request GET \
  --url "https://api.waqi.info/feed/geo:-7.681707070167145;110.33887085051082/?token=50c79da4c1f2e8b5d43dc6a95881d3caa4c9e829" \
  --header "User-Agent: insomnia/12.3.1"
```

**Contoh respons** (inti; lengkap: `[real_dataset/sleman-aqi.json](real_dataset/sleman-aqi.json)`):

```json
{
  "status": "ok",
  "data": {
    "aqi": 42,
    "idx": 13653,
    "dominentpol": "pm25",
    "city": {
      "geo": [-7.731, 110.354],
      "name": "Sleman, Indonesia",
      "url": "https://aqicn.org/city/indonesia/sleman"
    },
    "iaqi": {
      "pm25": { "v": 42 },
      "t": { "v": 30.3 },
      "h": { "v": 74.7 }
    },
    "time": {
      "s": "2026-03-28 16:00:00",
      "tz": "+07:00",
      "iso": "2026-03-28T16:00:00+07:00"
    },
    "forecast": {
      "daily": {
        "pm10": [
          { "day": "2026-03-26", "avg": 55, "max": 77, "min": 19 }
        ]
      }
    }
  }
}
```

---

## File contoh di repositori


| Sumber                  | File di repositori                                                                                                                                                                                        |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CCTV chart 1–3 (Sleman) | `[sleman-cctv-chart1.json](real_dataset/sleman-cctv-chart1.json)` · `[sleman-cctv-chart2.json](real_dataset/sleman-cctv-chart2.json)` · `[sleman-cctv-chart3.json](real_dataset/sleman-cctv-chart3.json)` |
| AQI Sleman              | `[sleman-aqi.json](real_dataset/sleman-aqi.json)`                                                                                                                                                         |
| BMKG (bentuk umum)      | `[example-weather-bmkg.json](dataset/example-weather-bmkg.json)`                                                                                                                                          |


