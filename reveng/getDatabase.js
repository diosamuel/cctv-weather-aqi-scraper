
var currentSecond = 0;
var currentSecondIndex = 0;
var FiveSecondIndex = 0;

var minutesData;

var lastTimeHour;
var lastTimeMinute;

var UtcTimeHour;
var UtcTimeMinute;


var dataWarnaMarker;
var allMyMarkers = [];
var laneNumber;
var barChart1;
var barChart2;
var barChart3;
var Chart1Data;
var Chart2Data;
var Chart3Data;
var hourlyData;





var selectDirection = 'Semua'

var dataToShow = {
    selectedClass: 'Semua',
    dataTipe0: 'dataBoth_All',
    datalabel0: 'Hari ini',
    dataTipe1: 'dataLastDateBoth_All',
    datalabel1: 'Kemarin',
    dataTipe2: 'dataLast7Both_All',
    datalabel2: 'Rata-rata 7 hari terakhir',
    titleText: 'Arah: ' + selectDirection + ', Kelas: Semua',
}

const datalabel0Value = ['SM', 'MP', 'KS',
    'BB', 'TB', 'Semua']
const datalabel1Value = ['Last day SM', 'Last day MP', 'Last day KS',
    'Last day BB', 'Last day TB', 'Last day ALL']
const datalabel2Value = ['Rata-rata 7 hari terakhir', 'Last day MP', 'Last day KS',
    'Last day BB', 'Last day TB', 'Last day ALL']

const dataTipe0NormalValue = ['dataNormal_SM', 'dataNormal_MP', 'dataNormal_KS',
    'dataNormal_BB', 'dataNormal_TB', 'dataNormal_All']
const dataTipe1NormalValue = ['dataLastDateNormal_SM', 'dataLastDateNormal_MP', 'dataLastDateNormal_KS',
    'dataLastDateNormal_BB', 'dataLastDateNormal_TB', 'dataLastDateNormal_All']
const dataTipe2NormalValue = ['dataLast7Normal_SM', 'dataLast7Normal_MP', 'dataLast7Normal_KS',
    'dataLast7Normal_BB', 'dataLast7Normal_TB', 'dataLast7Normal_All']

const dataTipe0OppositeValue = ['dataOpposite_SM', 'dataOpposite_MP', 'dataOpposite_KS',
    'dataOpposite_BB', 'dataOpposite_TB', 'dataOpposite_All']
const dataTipe1OppositeValue = ['dataLastDateOpposite_SM', 'dataLastDateOpposite_MP', 'dataLastDateOpposite_KS',
    'dataLastDateOpposite_BB', 'dataLastDateOpposite_TB', 'dataLastDateOpposite_All']
const dataTipe2OppositeValue = ['dataLast7Opposite_SM', 'dataLast7Opposite_MP', 'dataLast7Opposite_KS',
    'dataLast7Opposite_BB', 'dataLast7Opposite_TB', 'dataLast7Opposite_All']

const dataTipe0BothValue = ['dataBoth_SM', 'dataBoth_MP', 'dataBoth_KS',
    'dataBoth_BB', 'dataBoth_TB', 'dataBoth_All']
const dataTipe1BothValue = ['dataLastDateBoth_SM', 'dataLastDateBoth_MP', 'dataLastDateBoth_KS',
    'dataLastDateBoth_BB', 'dataLastDateBoth_TB', 'dataLastDateBoth_All']
const dataTipe2BothValue = ['dataLast7Both_SM', 'dataLast7Both_MP', 'dataLast7Both_KS',
    'dataLast7Both_BB', 'dataLast7Both_TB', 'dataLast7Both_All']

function getCurrentTime() {
    $(document).ready(function () {
        laneNumber = window.location.pathname;
        laneNumber = laneNumber.replace("/", "");
        // console.log(window.location.pathname)
        // laneNumber = laneNumber.replace("/", "");

        function runIt() {
            const now = new Date();
            lastTimeHour = now.getHours();
            var currentTimeMinute = now.getMinutes();
            var currentTimeSecond = now.getSeconds();
            UtcTimeHour = now.getHours();
            UtcTimeMinute = now.getMinutes();

            setWarnaMarker();
            // if (currentTimeSecond === 30) {
            //     setWarnaMarker();
            // }

            if (window.location.pathname !== "/") {
                getChart1Data();
                getChart2Data();
                getChart3Data();

                if (currentTimeMinute != lastTimeMinute) {
                    lastTimeMinute = currentTimeMinute;
                    get1MinData(laneNumber);
                }
            }
        };

        setWarnaMarker();

        if (window.location.pathname !== "/") {
            getChart1Data();
            getChart2Data();
            getChart3Data();
            get1MinData(laneNumber);
            update5minuteCharts();
            updateTabel_PerbandinganVolumeKendaraan();
        }


        runIt();
        setInterval(runIt, 5000);
    });

}


function getChart3Data() {
    var indexDatas = window.location.origin + /generateChart3Data/ + laneNumber;

    $.ajax({
        url: indexDatas,
        dataType: "json"
    }).done(function (data) {
        if (typeof data !== 'undefined') {
            Chart3Data = data
            updateBarChart3();
            // update1minuteCharts();
        }
    });

    // $.ajax({
    //     url: indexDatas,
    //     dataType: "json",
    //     success: function(ajaxData) {
    //         Chart3Data = ajaxData
    //         updateBarChart3();
    //     },
    //     error: function(ajaxData){
    //         console.log('Chart3Data :', ajaxData);
    //     }
    // });
}


function getChart2Data() {
    var indexDatas = window.location.origin + /generateChart2Data/ + laneNumber;
    $.ajax({
        url: indexDatas,
        dataType: "json"
    }).done(function (data) {
        Chart2Data = data;
        updateBarChart2();
        // update1minuteCharts();
    });
}

function get1MinData(laneNumber) {
    var indexDatas = window.location.origin + /data1min/ + laneNumber;
    // console.log(indexDatas);

    // $.getJSON(indexDatas, function(response) {
    //     console.log(response);
    // }).fail(function(jqXHR, textStatus, errorThrown) {
    //     console.error('Request failed:', textStatus, errorThrown);
    // });


    $.ajax({
        url: indexDatas,
        dataType: "json"
    }).done(function (data) {
        minutesData = data;
        if (typeof minutesData !== 'undefined') {
            update1minuteCharts();
        }
    });
}

async function setWarnaMarker() {
    const cameraArrayElement = JSON.parse(document.getElementById('cameraArray').textContent);
    const cameraArray = cameraArrayElement.cameraArray;

    const indexDatas = window.location.origin + "/markerColorDatas/";

    const response = await fetch(indexDatas);
    const dataWarnaMarker = await response.json();
    // console.log(allMyMarkers)

    for (let i = 0; i < allMyMarkers.length; i++) {
        const marker = allMyMarkers[i];
        const markerElement = marker.getElement();

        let background_color = dataWarnaMarker.warnaMarkerList[i];
        // console.log(i, background_color)
        if (!background_color || background_color === 'undefined') {
            background_color = "#666666";
        }

        // Find and update inner marker-circle div
        const circle = markerElement.querySelector('.marker-circle');
        if (circle) {
            circle.innerText = `${i + 1}`; // optional, can also use cameraArray[i][0]
        }

        // Update marker style
        markerElement.style.backgroundColor = background_color;
        markerElement.style.borderColor = "#666666";
        markerElement.style.color = "#666666"; // glyph text color
    }
}


async function setWarnaMarker_google() {
    const cameraArrayElement = JSON.parse(document.getElementById('cameraArray').textContent);
    cameraArray = cameraArrayElement.cameraArray
    var indexDatas = window.location.origin + /markerColorDatas/;
    const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary("marker");
    $.ajax({
        url: indexDatas,
        dataType: "json"
    }).done(function (data) {
        dataWarnaMarker = data;
        console.log(dataWarnaMarker)
        // https://developers.google.com/maps/documentation/javascript/advanced-markers/basic-customization#javascript_2
        // https://developers.google.com/maps/documentation/javascript/reference/advanced-markers?utm_source=github&utm_medium=documentation&utm_campaign&utm_content=web_components#AdvancedMarkerElement

        // Loop through the markers
        for (let i = 0; i < allMyMarkers.length; i++) {
            marker = allMyMarkers[i]
            console.log(marker)
            // console.log(i, "=====", dataWarnaMarker.warnaMarkerList[i][0])
            // if(dataWarnaMarker.warnaMarkerList[i][0] === "APC22033"){
            //     console.log(dataWarnaMarker.warnaMarkerList[i])
            // }
            var background_color = dataWarnaMarker.warnaMarkerList[i]
            if (background_color === 'undefined') {
                background_color = "#666666"
            }
            const pin = new PinElement({
                glyph: `${i + 1}`,
                // glyph: `${cameraArray[i][0]}`,
                background: background_color,
                borderColor: "#666666",
                glyphColor: "#666666",
            });

            marker.content = pin.element;
        }
    });
};

function getChart1Data() {
    var indexDatas = window.location.origin + /generateChart1Data/ + laneNumber;
    $.ajax({
        url: indexDatas,
        dataType: "json"
    }).done(function (data) {
        // console.log('getChart1Data data:', data);
        Chart1Data = data
        update5minuteCharts();
        // updateSpeedChart()
    });
}

//function btnClick() {
//    $(document).ready(function () {
//
//        $("#download_button1").click(function () {
//            // alert("button");
//
//            let startDate = document.getElementById('startDate').value;
//            let endDate = document.getElementById('endDate').value;
//
//            console.log('unduhData', endDate.value);
//            if (startDate != '' && endDate != '') {
//                let unduhDataLink = window.location.origin + /unduhData/ + laneNumber +
//                    '/' + startDate + '/' + endDate;
//                window.open(unduhDataLink,);
//                document.getElementById('emptyDateSelected').innerText = 'Terimakasih sudah mengunduh';
//            }
//            else {
//                document.getElementById('emptyDateSelected').innerText = 'Tanggal belum dimasukan'
//            }
//
//        });
//    });
//}
