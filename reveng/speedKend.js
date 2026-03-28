


var dataSpeedChart1 = 100;
var dataSpeedChart2 = 100;
var dataSpeedChart3 = 100;
var dataSpeedChart4 = 100;
var dataSpeedChart5 = 100;
var dataSpeedChart6 = 100;
var dataSpeedChart7 = 100;
var dataSpeedChart8 = 100;
var dataSpeedChart9 = 100;
var dataSpeedChart10 = 100;

function drawSpeedChart() {

    var options = {
        //        maintainAspectRatio: false,
        aspectRatio: 1,
        responsive: true,
        cutout: '70%',
        elements: {
            arc: {
                borderColor: '#000000',
                borderWidth: 0  //set as you wish
            }
        },
        plugins: {
            legend: {
                display: false
            },
        },
    };

    // var backgroundColorNormal = ['#ededed', '#077bf7'];
    // var backgroundColorOpposite = ['#ededed', '#00bec4'];
    var backgroundColorNormal = ['#077bf7', '#ededed'];
    var backgroundColorOpposite = ['#00bec4', '#ededed'];

    var chartDefaultData = {
        labels: ['Speed Sesaat', 'Speed Maks.'],
        datasets: [{
            data: [100 - 100, 100],
            backgroundColor: backgroundColorNormal
        }]
    };

    var chartDefaultDataOpposite = {
        labels: ['Speed Sesaat', 'Speed Maks.'],
        datasets: [{
            data: [100 - 100, 100],
            backgroundColor: backgroundColorOpposite
        }]
    };

    // ================= speedChart1 ======================
    speedChart1 = new Chart(document.getElementById('speedChart1').getContext('2d'), {
        type: 'doughnut',
        data: chartDefaultData,
        options: options,
        plugins: [{
            id: 'speedChart1',
            afterDraw: function (speedChart1) {
                chartSpeedTextCreator(speedChart1, dataSpeedChart1.toString());
            },
        }],
    });

    // ================= speedChart2 ======================
    speedChart2 = new Chart(document.getElementById('speedChart2').getContext('2d'), {
        type: 'doughnut',
        data: chartDefaultData,
        options: options,
        plugins: [{
            id: 'speedChart2',
            afterDraw: function (speedChart2) {
                chartSpeedTextCreator(speedChart2, dataSpeedChart2.toString());
            },
        }],
    });

    // // ================= speedChart3 ======================
    speedChart3 = new Chart(document.getElementById('speedChart3').getContext('2d'), {
        type: 'doughnut',
        data: chartDefaultData,
        options: options,
        plugins: [{
            id: 'speedChart3',
            afterDraw: function (speedChart3) {
                chartSpeedTextCreator(speedChart3, dataSpeedChart3.toString());
            },
        }],
    });

    // // ================= speedChart4 ======================
    speedChart4 = new Chart(document.getElementById('speedChart4').getContext('2d'), {
        type: 'doughnut',
        data: chartDefaultData,
        options: options,
        plugins: [{
            id: 'speedChart4',
            afterDraw: function (speedChart4) {
                chartSpeedTextCreator(speedChart4, dataSpeedChart4.toString());
            },
        }],
    });

    // // ================= speedChart5 ======================
    speedChart5 = new Chart(document.getElementById('speedChart5').getContext('2d'), {
        type: 'doughnut',
        data: chartDefaultData,
        options: options,
        plugins: [{
            id: 'speedChart5',
            afterDraw: function (speedChart5) {
                chartSpeedTextCreator(speedChart5, dataSpeedChart5.toString());
            },
        }],
    });

    // // ================= speedChart6 ======================
    speedChart6 = new Chart(document.getElementById('speedChart6').getContext('2d'), {
        type: 'doughnut',
        data: chartDefaultDataOpposite,
        options: options,
        plugins: [{
            id: 'speedChart6',
            afterDraw: function (speedChart6) {
                chartSpeedTextCreator(speedChart6, dataSpeedChart6.toString());
            },
        }],
    });

    // // ================= speedChart7 ======================
    speedChart7 = new Chart(document.getElementById('speedChart7').getContext('2d'), {
        type: 'doughnut',
        data: chartDefaultDataOpposite,
        options: options,
        plugins: [{
            id: 'speedChart7',
            afterDraw: function (speedChart7) {
                chartSpeedTextCreator(speedChart7, dataSpeedChart7.toString());
            },
        }],
    });

    // // ================= speedChart8 ======================
    speedChart8 = new Chart(document.getElementById('speedChart8').getContext('2d'), {
        type: 'doughnut',
        data: chartDefaultDataOpposite,
        options: options,
        plugins: [{
            id: 'speedChart8',
            afterDraw: function (speedChart8) {
                chartSpeedTextCreator(speedChart8, dataSpeedChart8.toString());
            },
        }],
    });

    // // ================= speedChart9 ======================
    speedChart9 = new Chart(document.getElementById('speedChart9').getContext('2d'), {
        type: 'doughnut',
        data: chartDefaultDataOpposite,
        options: options,
        plugins: [{
            id: 'speedChart9',
            afterDraw: function (speedChart9) {
                chartSpeedTextCreator(speedChart9, dataSpeedChart9.toString());
            },
        }],
    });

    // // ================= speedChart10 ======================
    speedChart10 = new Chart(document.getElementById('speedChart10').getContext('2d'), {
        type: 'doughnut',
        data: chartDefaultDataOpposite,
        options: options,
        plugins: [{
            id: 'speedChart10',
            afterDraw: function (speedChart10) {
                chartSpeedTextCreator(speedChart10, dataSpeedChart10.toString());
            },
        }],
    });
}

function updateSpeedChart() {

    if (typeof Chart1Data === 'undefined') {
        console.log("Variable is Speed Undefined");
        // getCurrentTime();
    }
    else {
        // console.log('updateSpeedChart dataNormal_speed_SM : ', Chart1Data.speed_gol_Normal[0]);
        // ================= speedChart1 ======================
        dataSpeedChart1 = Chart1Data.speed_gol_Normal[0].toFixed(1);
        // let dataSpeedChart1Max = 100;
        let dataSpeedChart1Max = Chart1Data.speed_max_gol_Normal_list[0].toFixed(1);
        // percent_value1 = dataSpeedChart1Max / dataSpeedChart1 * 100;
        speedChart1.data.datasets[0].data = [dataSpeedChart1, dataSpeedChart1Max];
        speedChart1.update();

        // ================= speedChart2 ======================
        dataSpeedChart2 = Chart1Data.speed_gol_Normal[1].toFixed(1);
        // let dataSpeedChart2Max = 100;
        let dataSpeedChart2Max = Chart1Data.speed_max_gol_Normal_list[1].toFixed(1);    
        speedChart2.data.datasets[0].data = [dataSpeedChart2, dataSpeedChart2Max];
        speedChart2.update();

        // ================= speedChart3 ======================
        dataSpeedChart3 = Chart1Data.speed_gol_Normal[2].toFixed(1);
        // let dataSpeedChart3Max = 100;
        let dataSpeedChart3Max = Chart1Data.speed_max_gol_Normal_list[2].toFixed(1);  
        speedChart3.data.datasets[0].data = [dataSpeedChart3, dataSpeedChart3Max];
        speedChart3.update();

        // ================= speedChart4 ======================
        dataSpeedChart4 = Chart1Data.speed_gol_Normal[3].toFixed(1);
        // let dataSpeedChart4Max = 100;
        let dataSpeedChart4Max = Chart1Data.speed_max_gol_Normal_list[3].toFixed(1);  
        // let dataSpeedChart4Max = Chart1Data.speedMaxNormal_BB;  
        speedChart4.data.datasets[0].data = [dataSpeedChart4, dataSpeedChart4Max];
        // speedChart4.data.datasets[0].data = [dataSpeedChart4Max.toFixed(1), dataSpeedChart4];
        speedChart4.update();

        // ================= speedChart5 ======================
        dataSpeedChart5 = Chart1Data.speed_gol_Normal[4].toFixed(1);
        // let dataSpeedChart5Max = 100;
        let dataSpeedChart5Max = Chart1Data.speed_max_gol_Normal_list[4].toFixed(1);  
        speedChart5.data.datasets[0].data = [dataSpeedChart5, dataSpeedChart5Max];
        speedChart5.update();

        // ================= speedChart6 ======================
        dataSpeedChart6 = Chart1Data.speed_gol_Opposite[0].toFixed(1);
        // let dataSpeedChart6Max = 100;
        let dataSpeedChart6Max = Chart1Data.speed_max_gol_Opposite_list[0].toFixed(1);
        // percent_value6 = dataSpeedChart6 / dataSpeedChart6Max * 100;
        speedChart6.data.datasets[0].data = [dataSpeedChart6, dataSpeedChart6Max];
        speedChart6.update();
        // console.log('dataSpeedChart1', dataSpeedChart1);

        // ================= speedChart7 ======================
        dataSpeedChart7 = Chart1Data.speed_gol_Opposite[1].toFixed(1);
        // let dataSpeedChart7Max = 100;
        let dataSpeedChart7Max = Chart1Data.speed_max_gol_Opposite_list[1].toFixed(1);
        // percent_value7 = dataSpeedChart7 / dataSpeedChart7Max * 100;
        speedChart7.data.datasets[0].data = [dataSpeedChart7, dataSpeedChart7Max];
        speedChart7.update();

        // ================= speedChart8 ======================
        dataSpeedChart8 = Chart1Data.speed_gol_Opposite[2].toFixed(1);
        // let dataSpeedChart8Max = 100;
        let dataSpeedChart8Max = Chart1Data.speed_max_gol_Opposite_list[2].toFixed(1);
        // percent_value8 = dataSpeedChart8 / dataSpeedChart8Max * 100;
        speedChart8.data.datasets[0].data = [dataSpeedChart8, dataSpeedChart8Max];
        speedChart8.update();

        // ================= speedChart9 ======================
        dataSpeedChart9 = Chart1Data.speed_gol_Opposite[3].toFixed(1);
        // let dataSpeedChart9Max = 100;
        let dataSpeedChart9Max = Chart1Data.speed_max_gol_Opposite_list[3].toFixed(1);
        // percent_value9 = dataSpeedChart9 / dataSpeedChart9Max * 100;
        speedChart9.data.datasets[0].data = [dataSpeedChart9, dataSpeedChart9Max];
        speedChart9.update();

        // ================= speedChart10 ======================
        dataSpeedChart10 = Chart1Data.speed_gol_Opposite[4].toFixed(1);
        // let dataSpeedChart10Max = 100;
        let dataSpeedChart10Max = Chart1Data.speed_max_gol_Opposite_list[4].toFixed(1);
        // percent_value10 = dataSpeedChart10 / dataSpeedChart10Max * 100;
        speedChart10.data.datasets[0].data = [dataSpeedChart10, dataSpeedChart10Max];
        speedChart10.update();
    }

}






function chartSpeedTextCreator(chart, texta) {
    // console.log(texta)
    var width = chart.width,
        height = chart.height,
        ctx = chart.ctx;

    var canvasWidth = $('.chart-area').width();
    var canvasHeight = $('.chart-area').height();

    // console.log('chartTextCreator============', texti)

    ctx.restore();
    var fontSize = (canvasHeight / 150).toFixed(2);
    ctx.font = fontSize + "em sans-serif";
    ctx.textBaseline = "middle";



    var text = texta,
        // var text = 'No Data',
        textX = Math.round((width - ctx.measureText(text).width) / 2),
        textY = height / 2;
    ctx.fillText(text, textX, textY);

    ctx.save();
};
