
var dataTotalVolChart1 = 100;
var dataTotalVolChart2 = 100;
var dataTotalVolChart3 = 100;
var dataTotalVolChart4 = 100;
var dataTotalVolChart5 = 100;

var dataTotalVolChart1_MAX = 100;
var dataTotalVolChart2_MAX = 100;
var dataTotalVolChart3_MAX = 100;
var dataTotalVolChart4_MAX = 100;
var dataTotalVolChart5_MAX = 100;

function volChartTextCreator(chart, texta) {
    var width = chart.width,
        height = chart.height,
        ctx = chart.ctx;

    // var canvasWidth = $('.chart-area').width();
    var canvasHeight = $('.chart-area').height();

    // console.log('chartTextCreator============', texti)

    ctx.restore();
    var fontSize = (canvasHeight / 120).toFixed(2);
    ctx.font = fontSize + "em sans-serif";
    ctx.textBaseline = "middle";

    var text = texta,
        textX = Math.round((width - ctx.measureText(text).width) / 2),
        textY = height / 2;
    ctx.fillText(text, textX, textY);

    // var text2 = 'asdasdasd',
    //     textX = Math.round((width - ctx.measureText(text2).width) / 2),
    //     textY = height;
    // ctx.fillText(text2, textX, textY);

    ctx.save();
};

function updateTotalVolumeChart() {
    if (typeof Chart2Data === 'undefined') {
        console.log("Variable is Undefined");
        // getCurrentTime();
    }
    else {
        // ================= volChart1 ======================
        dataTotalVolChart1 = Chart2Data.totalVolume_SM;
        if (dataTotalVolChart1 > dataTotalVolChart1_MAX) {
            dataTotalVolChart1_MAX = dataTotalVolChart1;
        };
        volChart1.data.datasets[0].data = [100 - dataTotalVolChart1 / dataTotalVolChart1_MAX * 100, 
        dataTotalVolChart1 / dataTotalVolChart1_MAX * 100];
        // console.log(dataTotalVolChart1 / dataTotalVolChart1_MAX * 100, 100 - (dataTotalVolChart1 / dataTotalVolChart1_MAX * 100));
        volChart1.update();
        
        // ================= volChart2 ======================
        dataTotalVolChart2 = Chart2Data.totalVolume_MP;
        if (dataTotalVolChart2 > dataTotalVolChart2_MAX) {
            dataTotalVolChart2_MAX = dataTotalVolChart2;
        };
        volChart2.data.datasets[0].data = [100 - dataTotalVolChart2 / dataTotalVolChart2_MAX * 100, 
        dataTotalVolChart2 / dataTotalVolChart2_MAX * 100];
        volChart2.update();
        
        // ================= volChart3 ======================
        dataTotalVolChart3 = Chart2Data.totalVolume_KS;
        if (dataTotalVolChart3 > dataTotalVolChart3_MAX) {
            dataTotalVolChart3_MAX = dataTotalVolChart3;
        };
        volChart3.data.datasets[0].data = [100 - dataTotalVolChart3 / dataTotalVolChart3_MAX * 100, 
        dataTotalVolChart3 / dataTotalVolChart3_MAX * 100];
        volChart3.update();
        
        // ================= volChart4 ======================
        dataTotalVolChart4 = Chart2Data.totalVolume_BB;
        if (dataTotalVolChart4 > dataTotalVolChart4_MAX) {
            dataTotalVolChart4_MAX = dataTotalVolChart4;
        };
        volChart4.data.datasets[0].data = [100 - dataTotalVolChart4 / dataTotalVolChart4_MAX * 100, 
        dataTotalVolChart4 / dataTotalVolChart4_MAX * 100];
        volChart4.update();
        
        // ================= volChart5 ======================
        dataTotalVolChart5 = Chart2Data.totalVolume_TB;
        if (dataTotalVolChart5 > dataTotalVolChart5_MAX) {
            dataTotalVolChart5_MAX = dataTotalVolChart5;
        };
        volChart5.data.datasets[0].data = [100 - dataTotalVolChart5 / dataTotalVolChart5_MAX * 100, 
        dataTotalVolChart5 / dataTotalVolChart5_MAX * 100];
        volChart5.update();


    }
};

function drawTotalVolumeChart() {
    var options = {
        //        maintainAspectRatio: false,
        aspectRatio: 1,
        responsive: true,
        cutout: '80%',
        // rotation: (0.5 * Math.PI),
        // rotation: (0.5 * Math.PI) - (25 / 180 * Math.PI),
        elements: {
            arc: {
                borderColor: '#000000',
                borderWidth: 0  //set as you wish
            }
        },
        plugins: {
            legend: {
                display: false,
                reverse: true
            },
        },
    };

    // var backgroundColorNormal = ['#077bf7', '#ededed'];
    // var backgroundColorOpposite = ['#00bec4', '#ededed'];


    // ================= volChart1 ======================
    volChart1 = new Chart(document.getElementById('volCircleChart1').getContext('2d'), {
        type: 'doughnut',
        data: {
            labels: ['', 'SM'],
            datasets: [{
                data: [100 - 100, 100],
                backgroundColor: ['#ededed', '#9636e0'],
            }]
        },
        options: options,
        plugins: [{
            id: 'volChart1',
            afterDraw: function (volChart1) {
                volChartTextCreator(volChart1, dataTotalVolChart1.toString());
            },
        }],
    });

    // ================= volChart2 ======================
    volChart2 = new Chart(document.getElementById('volCircleChart2').getContext('2d'), {
        type: 'doughnut',
        data: {
            label: ['', 'MP'],
            datasets: [{
                data: [100 - 100, 100],
                backgroundColor: ['#ededed', '#e0367d'],
            }]
        },
        options: options,
        plugins: [{
            id: 'volChart2',
            afterDraw: function (volChart2) {
                volChartTextCreator(volChart2, dataTotalVolChart2.toString());
            },
        }],
    });

    // ================= volChart3 ======================
    volChart3 = new Chart(document.getElementById('volCircleChart3').getContext('2d'), {
        type: 'doughnut',
        data: {
            labels: ['', 'KS'],
            datasets: [{
                data: [100 - 100, 100],
                backgroundColor: ['#ededed', '#fc7b03'],
            }]
        },
        options: options,
        plugins: [{
            id: 'volChart3',
            afterDraw: function (volChart3) {
                volChartTextCreator(volChart3, dataTotalVolChart3.toString());
            },
        }],
    });

    // ================= volChart4 ======================
    volChart4 = new Chart(document.getElementById('volCircleChart4').getContext('2d'), {
        type: 'doughnut',
        data: {
            labels: ['', 'BB'],
            datasets: [{
                data: [100 - 100, 100],
                backgroundColor: ['#ededed', '#2a8e91'],
            }]
        },
        options: options,
        plugins: [{
            id: 'volChart4',
            afterDraw: function (volChart4) {
                volChartTextCreator(volChart4, dataTotalVolChart3.toString());
            },
        }],
    });

    // ================= volChart5 ======================
    volChart5 = new Chart(document.getElementById('volCircleChart5').getContext('2d'), {
        type: 'doughnut',
        data: {
            labels: ['', 'TB'],
            datasets: [{
                data: [100 - 100, 100],
                backgroundColor: ['#ededed', '#9eb307'],
            }]
        },
        options: options,
        plugins: [{
            id: 'volChart5',
            afterDraw: function (volChart5) {
                volChartTextCreator(volChart5, dataTotalVolChart5.toString());
            },
        }],
    });

};
