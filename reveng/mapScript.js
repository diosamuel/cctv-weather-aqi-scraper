
// let value2;

// const contentString22038 =
//     '<h4 id="firstHeading" class="firstHeading">22038</h4>' +
//     '<div id="bodyContent">' +
//     "<p>NAGREG - BTS. KAB. BANDUNG/GARUT<br>" +
//     "KAB. BANDUNG"
// "</p>"
// "</div>";

// const contentString22037 =
//     '<h4 id="firstHeading" class="firstHeading">22037</h4>' +
//     '<div id="bodyContent">' +
//     "<p>JLN. CIBIRU (BANDUNG)<br>" +
//     "KOTA BANDUNG"
// "</p>"
// "</div>";

// const contentString22033 =
//     '<h4 id="firstHeading" class="firstHeading">22033</h4>' +
//     '<div id="bodyContent">' +
//     "<p>BTS. KOTA PADALARANG - BTS. KOTA BANDUNG<br>" +
//     "BANDUNG BARAT"
// "</p>"
// "</div>";

// const contentString22039 =
//     '<h4 id="firstHeading" class="firstHeading">22039</h4>' +
//     '<div id="bodyContent">' +
//     "<p>NAGREG - BTS. KAB. BANDUNG/GARUT<br>" +
//     "KAB. BANDUNG"
// "</p>"
// "</div>";


// const contentString21002 =
//     '<h4 id="firstHeading" class="firstHeading">21002</h4>' +
//     '<div id="bodyContent">' +
//     "<p>BTS. KOTA CILEGON - BTS. KOTA SERANG<br>" +
//     "Kabupaten Serang, Banten"
// "</p>"
// "</div>";

let cameraArray = [];
// let cameraArray = [
//     ["22038", -6.965059, 107.800353, 1, contentString22038, "APC22038/"],
//     ["22033", -6.851428614763325, 107.49740817624972, 4, contentString22033, 'APC22033/'],
//     ["22037", -6.938431748250849, 107.73510572853868, 3, contentString22037, 'APC22037/'],
//     ["21002", -6.056445852598069, 106.1120356666794, 5, contentString21002, "APC21002/"],
// ];



// async function mapClickedCallback() {
//     // const cameraArrayElement  = document.getElementById('cameraArray');
//     // const cameraArray  = JSON.parse(cameraArrayElement);
//     const varx = JSON.parse(document.getElementById('mydata').textContent);    
//     var nlat = varx.lat;
//     var nlon = varx.lon
//     const cameraArrayElement = JSON.parse(document.getElementById('cameraArray').textContent);
//     cameraArray = cameraArrayElement.cameraArray
    
//     const { Map, InfoWindow } = await google.maps.importLibrary("maps");
//     const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary("marker");
//     const map = new Map(document.getElementById("mapClicked"), {
//         center: { lat: nlat, lng: nlon },
//         zoom: 13,
//         disableDefaultUI: true,
//         mapId: "992aec9628c71f1e",
//     });

//     // const infoWindow = new InfoWindow();

//     for (let i = 0; i < cameraArray.length; i++) {
//         const beach = cameraArray[i];
//         const pin = new PinElement({
//             glyph: `${i + 1}`,
//             scale: 1,
//             background: "#12e354",
//             borderColor: "#137333",
//         });
//         const marker = new AdvancedMarkerElement({
//             position: { lat: beach[1], lng: beach[2] },
//             map,
//             title: beach[4],
//             content: pin.element,
//             gmpClickable: true,
//         });
//         const infoWindow = new InfoWindow();
//         allMyMarkers.push(marker);
        
//         // const advancedMarkers = [...querySelectorAll('gmp-advanced-marker')];
//         // console.log(advancedMarkers)

//         marker.addListener("gmp-click", () => {
//             window.location.pathname = beach[5];
//         });

//         marker.addListener("mouseover", () => {
//             infoWindow.open({
//                 anchor: marker,
//                 map,
//             });
//         });
//         marker.addListener("mouseout", () => {
//             infoWindow.close({
//             });
//         });

//     };
//     createCharts();
// }


// async function initMap() {
//     // Request needed libraries.
//     // const { Map, InfoWindow } = await google.maps.importLibrary("maps");
//     const { Map, InfoWindow } = await google.maps.importLibrary("maps");
//     const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary("marker");
//     const map = new Map(document.getElementById("map"), {
//         center: { lat: -2.357285, lng: 118.167168 },
//         zoom: 5.5,
//         disableDefaultUI: true,
//         mapId: "992aec9628c71f1e",
//     });
//     // const varx = JSON.parse(document.getElementById('mydata').textContent);
//     const cameraArrayElement = JSON.parse(document.getElementById('cameraArray').textContent);
//     cameraArray = cameraArrayElement.cameraArray
//     // const infoWindow = new InfoWindow();

//     for (let i = 0; i < cameraArray.length; i++) {
//         const beach = cameraArray[i];
//         // console.log(i, " = ", beach)
//         const pin = new PinElement({
//             glyph: `${i + 1}`,
//             // glyph: "",
//             scale: 1,
//             background: "#12e354",
//             borderColor: "#137333",
//             glyphColor: "#137333",
//         });
//         const marker = new AdvancedMarkerElement({
//             position: { lat: beach[1], lng: beach[2] },
//             map,
//             title: beach[4],
//             content: pin.element,
//             gmpClickable: true,
//         });

//         const infoWindow = new InfoWindow();
//         allMyMarkers.push(marker);

//         marker.addListener("gmp-click", () => {
//             window.location.pathname = beach[5];
//         });

//         marker.addListener("mouseover", () => {
//             infoWindow.open({
//                 anchor: marker,
//                 map,
//             });
//         });
//         marker.addListener("mouseout", () => {
//             infoWindow.close({
//             });
//         });

//     };
// }

function createCharts() {
    $(document).ready(function () {
        barChart1 = new Chart(document.getElementById('barChart1').getContext('2d'), {
            type: 'bar',
            data: {
                labels: [],
                datasets: [
                    {
                        label: 'Normal',
                        backgroundColor: '#077bf7',
                        data: []
                    },

                    {
                        label: 'Opposite',
                        backgroundColor: '#00bec4',
                        data: []
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        grid: {
                            display: false
                        },
                    },
                }
            }
        });

        var chart2Label = ["00-01", "01-02", "02-03", "03-04", "04-05", "05-06", "06-07", "07-08", "08-09",
            "09-10", "10-11", "11-12", "12-13", "13-14", "14-15", "15-16", "16-17",
            "17-18", "18-19", "19-20", "20-21", "21-22", "22-23", "23-00"]

        var barChart2_ctx = document.getElementById('barChart2').getContext('2d');
        barChart2 = new Chart(barChart2_ctx, {
            type: 'bar',
            data: {
                labels: chart2Label,
                datasets: [
                    {
                        label: 'SM',
                        backgroundColor: '#9636e0',
                        data: []
                    },
                    {
                        label: 'MP',
                        backgroundColor: '#e0367d',
                        data: []
                    },
                    {
                        label: 'KS',
                        backgroundColor: '#fc7b03',
                        data: []
                    },
                    {
                        label: 'BB',
                        backgroundColor: '#2a8e91',
                        data: []
                    },
                    {
                        label: 'TB',
                        backgroundColor: '#9eb307',
                        data: []
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        grid: {
                            display: true
                        },
                    },
                }
            }
        });

        var barChart3_ctx = document.getElementById('hourly-chart').getContext('2d');
        barChart3 = new Chart(barChart3_ctx, {
            data: {
                labels: [],
                datasets: [
                    {
                        type: 'bar',
                        backgroundColor: '#4ebef2',
                        data: [],
                        order: 3,
                    },
                    {
                        type: 'line',
                        fill: false,
                        backgroundColor: '#c49404',
                        borderColor: '#c49404',
                        data: [],
                        lineTension: 0.4,
                        order: 2
                    },
                    {
                        type: 'line',
                        fill: false,
                        backgroundColor: '#2d6903',
                        borderColor: '#2d6903',
                        data: [],
                        lineTension: 0.4,
                        order: 1
                    },
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: false, // Set this to true to start the Y-axis at 0
                    },
                    x: {
                        beginAtZero: false, // Set this to true to start the Y-axis at 0
                        display: true,
                    },
                },
                plugins: {
                    title: {
                        position: 'bottom',
                        display: true,
                        text: 'Title'
                    }
                },
            }
        });

        drawDoughnutChart();
        drawTotalVolumeChart();
        drawSpeedChart();

    })
}

function updateTabel_PerbandinganVolumeKendaraan() {        

    $("#btnDirect1").on("click", function (e) {
        // e.preventDefault();
        selectDirection = 'Normal';
        updateDirect(dataToShow['selectedClass']);
        console.log('Normal :', dataToShow['selectedClass']);
        // $(this).toggleClass('active', this.checked);
        // $(this).toggleClass('checked', this.checked);
    });
    $("#btnDirect2").on("click", function (e) {
        // e.preventDefault();
        selectDirection = 'Opposite';
        updateDirect(dataToShow['selectedClass'])
        console.log('Opposite :', dataToShow['selectedClass']);
    });
    $("#btnDirect3").on("click", function (e) {
        // e.preventDefault();
        selectDirection = 'Semua';
        updateDirect(dataToShow['selectedClass'])
        console.log('Semua :', dataToShow);
    });

    $("#btn1").on("click", function (e) {
        e.preventDefault(e);
        updateDataToShow(0);
        updateBarChart3();
    });

    $("#btn2").on("click", function (e) {
        e.preventDefault();
        updateDataToShow(1);
        updateBarChart3();
    });

    $("#btn3").on("click", function (e) {
        e.preventDefault();
        updateDataToShow(2);
        updateBarChart3();
    });

    $("#btn4").on("click", function (e) {
        e.preventDefault();
        updateDataToShow(3);
        updateBarChart3();
    });

    $("#btn5").on("click", function (e) {
        e.preventDefault();
        updateDataToShow(4);
        updateBarChart3();
    });

    $("#btn6").on("click", function (e) {
        e.preventDefault();
        updateDataToShow(5);
        updateBarChart3();
    });

    



    function updateDirect(p1) {
        if (p1 == 'SM') {
            $("#btn1").click();
        }
        else if (p1 == 'MP') {
            $("#btn2").click();
        }
        else if (p1 == 'KS') {
            $("#btn3").click();
        }
        else if (p1 == 'BB') {
            $("#btn4").click();
        }
        else if (p1 == 'TB') {
            $("#btn5").click();
        }
        else if (p1 == 'Semua') {
            $("#btn6").click();
        }
    }


}

function update1minuteCharts() {
    $(document).ready(function () {
        currentSecondIndex = lastTimeMinute % 5
        if (typeof minutesData !== 'undefined') {
            $(".lastUpdateMinuteText").text("Di update : " + String(UtcTimeHour).padStart(2, '0') + ':'
                + String(UtcTimeMinute).padStart(2, '0') + " WIB");
            updateDoughnutChart(currentSecondIndex);
        };
    });
}

function update5minuteCharts() {
    // if (typeof databaseData !== 'undefined') {
    //     $(".lastUpdateText").text("Di update : " + databaseData.lastUpdate5minutes);
    //     updateBarChart1();
    // };
    // console.log('update5minuteCharts', Chart1Data);
    if (typeof Chart1Data !== 'undefined') {
        $(".lastUpdateText").text("Di update : " + Chart1Data.lastUpdate5minutes + " WIB");        
        // console.log("Chart1Data", Chart1Data);
        updateBarChart1();
        updateBarChart2();
        updateBarChart3();
        updateSpeedChart();
    };

}


function updateBarChart1() {
    if (typeof Chart1Data !== 'undefined') {
        // console.log("Chart1Data.listChart1_Normal", Chart1Data.listChart1_Normal);
        barChart1.data.labels = Chart1Data.label5MinData;
        barChart1.data.datasets[0].data = Chart1Data.listChart1_Normal;
        barChart1.data.datasets[1].data = Chart1Data.listChart1_Opposite;
        barChart1.update();
    }
}


function updateBarChart2() {
    if (typeof Chart2Data !== 'undefined') {
        // console.log('updateBarChart2 Chart2Data', Chart2Data.listData60_60_SM);
        barChart2.data.labels = Chart2Data.hourlyLabel;
        barChart2.data.datasets[0].data = Chart2Data.listData60_60_SM;
        barChart2.data.datasets[1].data = Chart2Data.listData60_60_MP;
        barChart2.data.datasets[2].data = Chart2Data.listData60_60_KS;
        barChart2.data.datasets[3].data = Chart2Data.listData60_60_BB;
        barChart2.data.datasets[4].data = Chart2Data.listData60_60_TB;
        barChart2.update();
        updateTotalVolumeChart();
    };
}


function updateBarChart3() {
    if (typeof Chart3Data !== 'undefined') {
        // console.log("getChart3Data", Chart3Data);
        // console.log("getChart3Data", Chart3Data.hourlyLabel);
        // console.log('databaseData', databaseData.dataOpposite);
        // console.log('dataToShow', hourlyData[dataToShow['dataTipe0']]);
        barChart3.data.labels = Chart3Data.hourlyLabel;
        barChart3.data.datasets[0].data = Chart3Data[dataToShow['dataTipe0']];
        barChart3.data.datasets[0].label = dataToShow['datalabel0'];
        barChart3.data.datasets[1].data = Chart3Data[dataToShow['dataTipe1']];
        barChart3.data.datasets[1].label = dataToShow['datalabel1'];
        barChart3.data.datasets[2].data = Chart3Data[dataToShow['dataTipe2']];
        barChart3.data.datasets[2].label = dataToShow['datalabel2'];
        barChart3.options.plugins.title.text = dataToShow['titleText'];
        barChart3.update();
    }
}



function updateDataToShow(p1) {
    if (selectDirection == 'Normal') {
        dataToShow = {
            selectedClass: datalabel0Value[p1],
            dataTipe0: dataTipe0NormalValue[p1],
            datalabel0: 'Hari ini',
            dataTipe1: dataTipe1NormalValue[p1],
            datalabel1: 'Kemarin',
            dataTipe2: dataTipe2NormalValue[p1],
            datalabel2: 'Rata-rata 7 hari terakhir',
            titleText: 'Arah: ' + selectDirection + ', Kelas: ' + datalabel0Value[p1],
        }
    }
    else if (selectDirection == 'Opposite') {
        dataToShow = {
            selectedClass: datalabel0Value[p1],
            dataTipe0: dataTipe0OppositeValue[p1],
            datalabel0: 'Hari ini',
            dataTipe1: dataTipe1OppositeValue[p1],
            datalabel1: 'Kemarin',
            dataTipe2: dataTipe2OppositeValue[p1],
            datalabel2: 'Rata-rata 7 hari terakhir',
            titleText: 'Arah: ' + selectDirection + ', Kelas: ' + datalabel0Value[p1],
        }
    }
    else {
        dataToShow = {
            selectedClass: datalabel0Value[p1],
            dataTipe0: dataTipe0BothValue[p1],
            datalabel0: 'Hari ini',
            dataTipe1: dataTipe1BothValue[p1],
            datalabel1: 'Kemarin',
            dataTipe2: dataTipe2BothValue[p1],
            datalabel2: 'Rata-rata 7 hari terakhir',
            titleText: 'Arah: ' + selectDirection + ', Kelas: ' + datalabel0Value[p1],
        }
    };
}



// function cameraMap22033() {
//     map = new google.maps.Map(document.getElementById('mapClicked'),
//         {
//             center: { lat: -6.854050, lng: 107.497780 },
//             zoom: 13,
//             disableDefaultUI: true,
//         }
//     );
//     setMarkers(map);
//     // createCharts();

//     // $(document).ready(function () {
//     //     drawDoughnutChart();
//     //     createCharts();
//     // });
// }


// function cameraMap22037() {
//     map = new google.maps.Map(document.getElementById('mapClicked'),
//         {
//             center: { lat: -6.935008, lng: 107.719226 },
//             zoom: 13,
//             disableDefaultUI: true,
//         }
//     );
//     setMarkers(map);
//     createCharts();

//     // $(document).ready(function () {
//     //     drawDoughnutChart();
//     //     createCharts();
//     // });
// }


// function cameraMap22038() {
//     map = new google.maps.Map(document.getElementById('mapClicked'),
//         {
//             center: { lat: -6.965059, lng: 107.800353 },
//             zoom: 13,
//             disableDefaultUI: true,
//         }
//     );
//     setMarkers(map);
//     createCharts();

//     // $(document).ready(function () {
//     //     createCharts();
//     // });
// }


// function cameraMap22039() {
//     map = new google.maps.Map(document.getElementById('mapClicked'),
//         {
//             center: { lat: -7.036120, lng: 107.907149 },
//             zoom: 13,
//             disableDefaultUI: true,
//         }
//     );
//     setMarkers(map);
//     createCharts();

//     // $(document).ready(function () {
//     //     drawDoughnutChart();
//     //     createCharts();
//     // });
// }


// function cameraMap21002() {
//     map = new google.maps.Map(document.getElementById('mapClicked'),
//         {
//             center: { lat: -6.056317825157035, lng: 106.11196056483072 },
//             zoom: 13,
//             disableDefaultUI: true,
//         }
//     );
//     setMarkers(map);
//     createCharts();

//     // $(document).ready(function () {
//     //     drawDoughnutChart();
//     //     createCharts();
//     // });
// }

// function cameraMap() {
//     map = new google.maps.Map(document.getElementById('mapClicked'),
//         {
//             center: { lat: -2.357285, lng: 117.167168 },
//             zoom: 8.5,
//             disableDefaultUI: true,
//         }
//     );
// }

// ["22039", -7.036120, 107.907149, 2, contentString22039, "APC22039/"],

// const mapid = '992aec9628c71f1e';


// async function setMarkers(map) {
//     const { Map } = await google.maps.importLibrary("maps");
//     const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
//     const shape = {
//         coords: [1, 1, 1, 20, 18, 20, 18, 1],
//         type: "poly",
//     };
//     // console.log(cameraArray)
//     for (let i = 0; i < cameraArray.length; i++) {
//         const beach = cameraArray[i];
//         const marker = new AdvancedMarkerElement({
//             map,
//             position: { lat: beach[1], lng: beach[2] },
//             camera_id: beach[0],
//             shape: shape,
//             zIndex: beach[3]
//         });
//         allMyMarkers.push(marker);

//         const infowindow = new google.maps.InfoWindow({
//             content: beach[4]
//         });
//         marker.setIcon('https://maps.google.com/mapfiles/ms/icons/red-dot.png')

//         marker.addListener("click", () => {
//             window.location.pathname = beach[5];
//         });

//         marker.addListener("mouseover", () => {
//             infowindow.open({
//                 anchor: marker,
//                 map,
//             });
//         });
//         marker.addListener("mouseout", () => {
//             infowindow.close({
//             });
//         });
//     }
// }

Enable Expert Mode

