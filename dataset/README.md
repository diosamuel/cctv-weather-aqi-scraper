# CCTV Analysis

**Dataset referensi** (respons API nyata / dump untuk Sleman dan sejenisnya) ada di folder [`../real_dataset/`](../real_dataset/). Folder `dataset/` ini berisi contoh bentuk JSON, metadata, dan aset pendukung lain — bukan sumber utama dump produksi.

---

https://apace-ai.com/APC{ID}/
raw data
https://apace-ai.com/generateChart1Data/{ID}
https://apace-ai.com/generateChart2Data/{ID}
https://apace-ai.com/generateChart3Data/{ID}
<!-- https://apache-ai.com//data1min/{ID} -->

https://binamarga.pu.go.id/cctv-ai/
ID get from cctv-list.json (CCTV data Available)

every 2 second
<!-- 
# Weather API
https://api.bmkg.go.id/publik/prakiraan-cuaca?adm4={ADMINISTRATIVE_CODE}

kemayoran = 31.71.03.1001
https://api.bmkg.go.id/publik/prakiraan-cuaca?adm4=31.71.03.1001


Dataset
1. weather quality api + cctv traffic api + bmkg
2.  -->

Air quality Index
https://aqicn.org/json-api/doc/#api-Geolocalized_Feed-GetGeolocFeed

TOKEN=50c79da4c1f2e8b5d43dc6a95881d3caa4c9e829

https://api.waqi.info/feed/geo:-7.681707070167145;110.33887085051082/?token=50c79da4c1f2e8b5d43dc6a95881d3caa4c9e829

TOMTOM API

curl -X 'GET' \
  'https://api.tomtom.com/traffic/map/4/tile/flow/relative0/10/825/534.png?tileSize=512&key=*****' \
  -H 'accept: */*'