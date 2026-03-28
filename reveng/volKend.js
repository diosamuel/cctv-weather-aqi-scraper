var dataArrayChart1 = 100
var dataArrayChart2 = 100
var dataArrayChart3 = 100
var dataArrayChart4 = 100
var dataArrayChart5 = 100
var dataArrayChart6 = 100
var dataArrayChart7 = 100
var dataArrayChart8 = 100
var dataArrayChart9 = 100
var dataArrayChart10 = 100
var dataArrayChart11 = 100


// var dataArrayChart1_MAX = 10;
// var dataArrayChart2_MAX = 10;
// var dataArrayChart3_MAX = 10;
// var dataArrayChart4_MAX = 10;
// var dataArrayChart5_MAX = 10;
// var dataArrayChart6_MAX = 10;
// var dataArrayChart7_MAX = 10;
// var dataArrayChart8_MAX = 10;
// var dataArrayChart9_MAX = 10;
// var dataArrayChart10_MAX = 10;
// var dataArrayChart11_MAX = 10;




function chartTextCreator(chart, texta) {
    var width = chart.width,
        height = chart.height,
        ctx = chart.ctx;

    var canvasWidth = $('.chart-area').width();
    var canvasHeight = $('.chart-area').height();

    // console.log('chartTextCreator============', texti)

    ctx.restore();
    var fontSize = (canvasHeight / 100).toFixed(2);
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

function updateDoughnutChart(idx) {
    // console.log("updateDoughnutChart Variable is Undefined");
    if (typeof minutesData === 'undefined') {
        console.log("updateDoughnutChart Variable is Undefined");
        // getCurrentTime();
    }
    else {
        // ================= Chart1 ======================
        dataArrayChart1 = minutesData.data1Normal_SM[idx];
        // console.log("dataArrayChart1 : ", dataArrayChart1);
        var dataArrayChart1_MAX = minutesData.dataArrayChart1_MAX;
        // if (dataArrayChart1 > dataArrayChart1_MAX) {
        //     dataArrayChart1_MAX = dataArrayChart1;
        // };
        percent_value1 = dataArrayChart1 / dataArrayChart1_MAX * 100;
        Chart1.data.datasets[0].data = [100 - percent_value1, percent_value1];
        Chart1.update();

        // $("#lastUpdate").text("Hello world!");

        // ================= Chart2 ======================
        dataArrayChart2 = minutesData.data1Normal_MP[idx];
        var dataArrayChart2_MAX = minutesData.dataArrayChart2_MAX;

        percent_value2 = dataArrayChart2 / dataArrayChart2_MAX * 100;
        dataChart2 = [100 - percent_value2, percent_value2];
        Chart2.data.datasets[0].data = dataChart2;
        Chart2.update();

        // ================= Chart3 ======================
        dataArrayChart3 = minutesData.data1Normal_KS[idx];
        var dataArrayChart3_MAX = minutesData.dataArrayChart3_MAX;
        percent_value3 = dataArrayChart3 / dataArrayChart3_MAX * 100;
        dataChart3 = [100 - percent_value3, percent_value3];
        Chart3.data.datasets[0].data = dataChart3;
        Chart3.update();

        // ================= Chart4 ======================
        dataArrayChart4 = minutesData.data1Normal_BB[idx];
        var dataArrayChart4_MAX = minutesData.dataArrayChart4_MAX;
        percent_value4 = dataArrayChart4 / dataArrayChart4_MAX * 100;
        dataChart4 = [100 - percent_value4, percent_value4];
        Chart4.data.datasets[0].data = dataChart4;
        Chart4.update();

        // ================= Chart5 ======================
        dataArrayChart5 = minutesData.data1Normal_TB[idx];
        var dataArrayChart5_MAX = minutesData.dataArrayChart5_MAX;
        percent_value5 = dataArrayChart5 / dataArrayChart5_MAX * 100;
        dataChart5 = [100 - percent_value5, percent_value5];
        Chart5.data.datasets[0].data = dataChart5;
        Chart5.update();

        // ================= Chart6 ======================
        dataArrayChart6 = minutesData.data1Opposite_SM[idx];
        var dataArrayChart6_MAX = minutesData.dataArrayChart6_MAX;
        percent_value6 = dataArrayChart6 / dataArrayChart6_MAX * 100;
        dataChart6 = [100 - percent_value6, percent_value6];
        Chart6.data.datasets[0].data = dataChart6;
        Chart6.update();

        // ================= Chart7 ======================
        dataArrayChart7 = minutesData.data1Opposite_MP[idx];
        var dataArrayChart7_MAX = minutesData.dataArrayChart7_MAX;
        percent_value7 = dataArrayChart7 / dataArrayChart7_MAX * 100;
        dataChart7 = [100 - percent_value7, percent_value7];
        Chart7.data.datasets[0].data = dataChart7;
        Chart7.update();

        // ================= Chart8 ======================
        dataArrayChart8 = minutesData.data1Opposite_KS[idx];
        var dataArrayChart8_MAX = minutesData.dataArrayChart8_MAX;
        percent_value8 = dataArrayChart8 / dataArrayChart8_MAX * 100;
        dataChart8 = [100 - percent_value8, percent_value8];
        Chart8.data.datasets[0].data = dataChart8;
        Chart8.update();


        // ================= Chart9 ======================
        dataArrayChart9 = minutesData.data1Opposite_BB[idx];
        var dataArrayChart9_MAX = minutesData.dataArrayChart9_MAX;
        percent_value9 = dataArrayChart9 / dataArrayChart9_MAX * 100;
        dataChart9 = [100 - percent_value9, percent_value9];
        Chart9.data.datasets[0].data = dataChart9;
        Chart9.update();

        // ================= Chart10 ======================
        dataArrayChart10 = minutesData.data1Opposite_TB[idx];
        dataArrayChart10_MAX = minutesData.dataArrayChart10_MAX;
        percent_value10 = dataArrayChart10 / dataArrayChart10_MAX * 100;
        dataChart10 = [100 - percent_value10, percent_value10];
        Chart10.data.datasets[0].data = dataChart10;
        Chart10.update();

        // ================= Chart11 ======================
        dataArrayChart11 = minutesData.data1SumAll[idx];
        var dataArrayChart11_MAX = minutesData.dataArrayChart11_MAX;
        percent_value11 = dataArrayChart11 / dataArrayChart11_MAX * 100;
        dataChart11 = [100 - percent_value11, percent_value11];
        Chart11.data.datasets[0].data = dataChart11;

        var gradBackgroundColor = ['#ededed', '#fac5c5']
        // percent_value11 = 55

        // var pererval = percent_value11 <= 25
        // console.log('percent_value11 ============== ', percent_value11)
        switch (true) {
            case percent_value11 <= 25:
                gradBackgroundColor = ['#ededed', '#00d407'];
                break;
            case percent_value11 > 25 && percent_value11 <= 50:
                gradBackgroundColor = ['#ededed', '#94d400'];
                break;
            case percent_value11 > 50 && percent_value11 <= 75:
                gradBackgroundColor = ['#ededed', '#ffd900'];
                break;
            case percent_value11 > 75:
                gradBackgroundColor = ['#ededed', '#ff3300'];
                break;
        };

        Chart11.data.datasets[0].backgroundColor = gradBackgroundColor;

        Chart11.update();
    };
}

function drawDoughnutChart() {
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
        events: [],
        hover: {
            mode: null  // Disables hover interactions
        },
        tooltips: {
            enabled: false  // Disables tooltips on hover
        }
    };

    var backgroundColorNormal = ['#ededed', '#077bf7'];
    var backgroundColorOpposite = ['#ededed', '#00bec4'];

    var chartNormalDefaultData = {
        labels: ['', 'Value'],
        datasets: [{
            data: [100 - 100, 100],
            backgroundColor: backgroundColorNormal
        }]
    };

    var chartOppositeDefaultData = {
        labels: ['', 'Value'],
        datasets: [{
            data: [100 - 100, 100],
            backgroundColor: backgroundColorOpposite
        }]
    };

    // ================= Chart1 ======================
    // console.log('dataArrayChart1 ============== ', minutesData.data1Normal_SM, idx)
    Chart1 = new Chart(document.getElementById('circleChart1').getContext('2d'), {
        type: 'doughnut',
        data: chartNormalDefaultData,
        options: options,
        plugins: [{
            id: 'Chart1',
            afterDraw: function (Chart1) {
                if (typeof dataArrayChart1 !== 'undefined') {
                    chartTextCreator(Chart1, dataArrayChart1.toString());
                }
                else {
                    chartTextCreator(Chart1, 'No Data');
                }
            },
        }],
    });

    // ================= Chart2 ======================

    // var context_circleChart2 = document.getElementById('circleChart2').getContext('2d');
    // var percent_value2 = dataArrayChart2 / 3000 * 100;
    Chart2 = new Chart(document.getElementById('circleChart2').getContext('2d'), {
        type: 'doughnut',
        data: chartNormalDefaultData,
        options: options,
        plugins: [{
            id: 'Chart2',
            afterDraw: function (Chart2) {
                if (typeof dataArrayChart2 !== 'undefined') {
                    chartTextCreator(Chart2, dataArrayChart2.toString());
                }
                else {
                    chartTextCreator(Chart2, 'No Data');
                }
            },
        }],
    });

    // ================= Chart3 ======================
    Chart3 = new Chart(document.getElementById('circleChart3').getContext('2d'), {
        type: 'doughnut',
        data: chartNormalDefaultData,
        options: options,
        plugins: [{
            id: 'Chart3',
            afterDraw: function (Chart3) {
                if (typeof dataArrayChart3 !== 'undefined') {
                    chartTextCreator(Chart3, dataArrayChart3.toString());
                }
                else {
                    chartTextCreator(Chart3, 'No Data');
                }
            },
        }],
    });

    // ================= Chart4 ======================
    Chart4 = new Chart(document.getElementById('circleChart4').getContext('2d'), {
        type: 'doughnut',
        data: chartNormalDefaultData,
        options: options,
        plugins: [{
            id: 'Chart4',
            afterDraw: function (Chart4) {
                if (typeof dataArrayChart4 !== 'undefined') {
                    chartTextCreator(Chart4, dataArrayChart4.toString());
                }
                else {
                    chartTextCreator(Chart4, 'No Data');
                }
            },
        }],
    });

    // ================= Chart5 ======================
    Chart5 = new Chart(document.getElementById('circleChart5').getContext('2d'), {
        type: 'doughnut',
        data: chartNormalDefaultData,
        options: options,
        plugins: [{
            id: 'Chart5',
            afterDraw: function (Chart5) {
                if (typeof dataArrayChart5 !== 'undefined') {
                    chartTextCreator(Chart5, dataArrayChart5.toString());
                }
                else {
                    chartTextCreator(Chart5, 'No Data');
                }
            },
        }],
    });

    // ================= Chart6 ======================
    Chart6 = new Chart(document.getElementById('circleChart6').getContext('2d'), {
        type: 'doughnut',
        data: chartOppositeDefaultData,
        options: options,
        plugins: [{
            id: 'Chart6',
            afterDraw: function (Chart6) {
                if (typeof dataArrayChart6 !== 'undefined') {
                    chartTextCreator(Chart6, dataArrayChart6.toString());
                }
                else {
                    chartTextCreator(Chart6, 'No Data');
                }
            },
        }],
    });

    // ================= Chart7 ======================
    Chart7 = new Chart(document.getElementById('circleChart7').getContext('2d'), {
        type: 'doughnut',
        data: chartOppositeDefaultData,
        options: options,
        plugins: [{
            id: 'Chart7',
            afterDraw: function (Chart7) {
                if (typeof dataArrayChart7 !== 'undefined') {
                    chartTextCreator(Chart7, dataArrayChart7.toString());
                }
                else {
                    chartTextCreator(Chart7, 'No Data');
                }
            },
        }],
    });

    // ================= Chart8 ======================
    Chart8 = new Chart(document.getElementById('circleChart8').getContext('2d'), {
        type: 'doughnut',
        data: chartOppositeDefaultData,
        options: options,
        plugins: [{
            id: 'Chart8',
            afterDraw: function (Chart8) {
                if (typeof dataArrayChart8 !== 'undefined') {
                    chartTextCreator(Chart8, dataArrayChart8.toString());
                }
                else {
                    chartTextCreator(Chart8, 'No Data');
                }
            },
        }],
    });

    // ================= Chart9 ======================
    Chart9 = new Chart(document.getElementById('circleChart9').getContext('2d'), {
        type: 'doughnut',
        data: chartOppositeDefaultData,
        options: options,
        plugins: [{
            id: 'Chart9',
            afterDraw: function (Chart9) {
                if (typeof dataArrayChart9 !== 'undefined') {
                    chartTextCreator(Chart9, dataArrayChart9.toString());
                }
                else {
                    chartTextCreator(Chart9, 'No Data');
                }
            },
        }],
    });

    // ================= Chart10 ======================
    Chart10 = new Chart(document.getElementById('circleChart10').getContext('2d'), {
        type: 'doughnut',
        data: chartOppositeDefaultData,
        options: options,
        plugins: [{
            id: 'Chart10',
            afterDraw: function (Chart10) {
                if (typeof dataArrayChart10 !== 'undefined') {
                    chartTextCreator(Chart10, dataArrayChart10.toString());
                }
                else {
                    chartTextCreator(Chart10, 'No Data');
                }
            },
        }],
    });

    // ================= Chart11 ======================
    Chart11 = new Chart(document.getElementById('circleChart11').getContext('2d'), {
        type: 'doughnut',
        data: {
            labels: ['', 'value'],
            datasets: [{
                // label: ['Completed', 'Pending'],
                data: [100, 100 - 100],
                backgroundColor: ['#ff3300', '#ededed']
                // backgroundColor: ['rgba(0, 0, 0, 0)', '#ffffff']
            }]
        },
        options: options,
        plugins: [{
            id: 'Chart11',
            beforeDraw: function (Chart11) {
                if (typeof dataArrayChart11 !== 'undefined') {
                    chartTextCreator(Chart11, dataArrayChart11.toString());
                }
                else {
                    chartTextCreator(Chart11, 'No Data');
                }
                // drawMultiRadiantCircle(Chart11, canvasHeight, canvasHeight, 120, someColors);
                // getGradient
                // chartTextCreator(Chart1, 100);
            },
        }],
    });

}





    // // ================= Chart2 ======================

    // // var context_circleChart2 = document.getElementById('circleChart2').getContext('2d');
    // // var percent_value2 = dataArrayChart2 / 3000 * 100;
    // Chart2 = new Chart(document.getElementById('circleChart2').getContext('2d'), {
    //     type: 'doughnut',
    //     data: {
    //         labels: ['Completed', 'Pending'],
    //         datasets: [{
    //             label: ['Completed', 'Pending'],
    //             data: [100, 100 - 100],
    //             backgroundColor: backgroundColorNormal
    //         }]
    //     },
    //     options: options,
    //     plugins: [{
    //         id: 'Chart2',
    //         afterDraw: function (Chart2) {
    //             if (typeof dataArrayChart2 !== 'undefined') {
    //                 chartTextCreator(Chart2, dataArrayChart2.toString());
    //             }
    //             else {
    //                 chartTextCreator(Chart2, 'No Data');
    //             }
    //         },
    //     }],
    // });

    // // ================= Chart3 ======================
    // Chart3 = new Chart(document.getElementById('circleChart3').getContext('2d'), {
    //     type: 'doughnut',
    //     data: {
    //         labels: ['Completed', 'Pending'],
    //         datasets: [{
    //             label: ['Completed', 'Pending'],
    //             data: [100, 100 - 100],
    //             backgroundColor: backgroundColorNormal
    //         }]
    //     },
    //     options: options,
    //     plugins: [{
    //         id: 'Chart3',
    //         afterDraw: function (Chart3) {
    //             if (typeof dataArrayChart3 !== 'undefined') {
    //                 chartTextCreator(Chart3, dataArrayChart3.toString());
    //             }
    //             else {
    //                 chartTextCreator(Chart3, 'No Data');
    //             }
    //         },
    //     }],
    // });

    // // ================= Chart4 ======================
    // Chart4 = new Chart(document.getElementById('circleChart4').getContext('2d'), {
    //     type: 'doughnut',
    //     data: {
    //         labels: ['Completed', 'Pending'],
    //         datasets: [{
    //             label: ['Completed', 'Pending'],
    //             data: [100, 100 - 100],
    //             backgroundColor: backgroundColorNormal
    //         }]
    //     },
    //     options: options,
    //     plugins: [{
    //         id: 'Chart4',
    //         afterDraw: function (Chart4) {
    //             if (typeof dataArrayChart4 !== 'undefined') {
    //                 chartTextCreator(Chart4, dataArrayChart4.toString());
    //             }
    //             else {
    //                 chartTextCreator(Chart4, 'No Data');
    //             }
    //         },
    //     }],
    // });

    // // ================= Chart5 ======================
    // Chart5 = new Chart(document.getElementById('circleChart5').getContext('2d'), {
    //     type: 'doughnut',
    //     data: {
    //         labels: ['Completed', 'Pending'],
    //         datasets: [{
    //             label: ['Completed', 'Pending'],
    //             data: [100, 100 - 100],
    //             backgroundColor: backgroundColorNormal
    //         }]
    //     },
    //     options: options,
    //     plugins: [{
    //         id: 'Chart5',
    //         afterDraw: function (Chart5) {
    //             if (typeof dataArrayChart5 !== 'undefined') {
    //                 chartTextCreator(Chart5, dataArrayChart5.toString());
    //             }
    //             else {
    //                 chartTextCreator(Chart5, 'No Data');
    //             }
    //         },
    //     }],
    // });

    // // ================= Chart6 ======================
    // Chart6 = new Chart(document.getElementById('circleChart6').getContext('2d'), {
    //     type: 'doughnut',
    //     data: {
    //         labels: ['Completed', 'Pending'],
    //         datasets: [{
    //             label: ['Completed', 'Pending'],
    //             data: [100, 100 - 100],
    //             backgroundColor: backgroundColorOpposite
    //         }]
    //     },
    //     options: options,
    //     plugins: [{
    //         id: 'Chart6',
    //         afterDraw: function (Chart6) {
    //             if (typeof dataArrayChart6 !== 'undefined') {
    //                 chartTextCreator(Chart6, dataArrayChart6.toString());
    //             }
    //             else {
    //                 chartTextCreator(Chart6, 'No Data');
    //             }
    //         },
    //     }],
    // });

    // // ================= Chart7 ======================
    // Chart7 = new Chart(document.getElementById('circleChart7').getContext('2d'), {
    //     type: 'doughnut',
    //     data: {
    //         labels: ['Completed', 'Pending'],
    //         datasets: [{
    //             label: ['Completed', 'Pending'],
    //             data: [100, 100 - 100],
    //             backgroundColor: backgroundColorOpposite
    //         }]
    //     },
    //     options: options,
    //     plugins: [{
    //         id: 'Chart7',
    //         afterDraw: function (Chart7) {
    //             if (typeof dataArrayChart7 !== 'undefined') {
    //                 chartTextCreator(Chart7, dataArrayChart7.toString());
    //             }
    //             else {
    //                 chartTextCreator(Chart7, 'No Data');
    //             }
    //         },
    //     }],
    // });

    // // ================= Chart8 ======================
    // Chart8 = new Chart(document.getElementById('circleChart8').getContext('2d'), {
    //     type: 'doughnut',
    //     data: {
    //         labels: ['Completed', 'Pending'],
    //         datasets: [{
    //             label: ['Completed', 'Pending'],
    //             data: [100, 100 - 100],
    //             backgroundColor: backgroundColorOpposite
    //         }]
    //     },
    //     options: options,
    //     plugins: [{
    //         id: 'Chart8',
    //         afterDraw: function (Chart8) {
    //             if (typeof dataArrayChart8 !== 'undefined') {
    //                 chartTextCreator(Chart8, dataArrayChart8.toString());
    //             }
    //             else {
    //                 chartTextCreator(Chart8, 'No Data');
    //             }
    //         },
    //     }],
    // });

    // // ================= Chart9 ======================
    // Chart9 = new Chart(document.getElementById('circleChart9').getContext('2d'), {
    //     type: 'doughnut',
    //     data: {
    //         labels: ['Completed', 'Pending'],
    //         datasets: [{
    //             label: ['Completed', 'Pending'],
    //             data: [100, 100 - 100],
    //             backgroundColor: backgroundColorOpposite
    //         }]
    //     },
    //     options: options,
    //     plugins: [{
    //         id: 'Chart9',
    //         afterDraw: function (Chart9) {
    //             if (typeof dataArrayChart9 !== 'undefined') {
    //                 chartTextCreator(Chart9, dataArrayChart9.toString());
    //             }
    //             else {
    //                 chartTextCreator(Chart9, 'No Data');
    //             }
    //         },
    //     }],
    // });

    // // ================= Chart10 ======================
    // Chart10 = new Chart(document.getElementById('circleChart10').getContext('2d'), {
    //     type: 'doughnut',
    //     data: {
    //         labels: ['Completed', 'Pending'],
    //         datasets: [{
    //             label: ['Completed', 'Pending'],
    //             data: [100, 100 - 100],
    //             backgroundColor: backgroundColorOpposite
    //         }]
    //     },
    //     options: options,
    //     plugins: [{
    //         id: 'Chart10',
    //         afterDraw: function (Chart10) {
    //             if (typeof dataArrayChart10 !== 'undefined') {
    //                 chartTextCreator(Chart10, dataArrayChart10.toString());
    //             }
    //             else {
    //                 chartTextCreator(Chart10, 'No Data');
    //             }
    //         },
    //     }],
    // });

    // // ================= Chart11 ======================
    // Chart11 = new Chart(document.getElementById('circleChart11').getContext('2d'), {
    //     type: 'doughnut',
    //     data: {
    //         labels: ['Completed', 'Pending'],
    //         datasets: [{
    //             label: ['Completed', 'Pending'],
    //             data: [100, 100 - 100],
    //             backgroundColor: ['#ff3300', '#ededed']
    //             // backgroundColor: ['rgba(0, 0, 0, 0)', '#ffffff']
    //         }]
    //     },
    //     options: options,
    //     plugins: [{
    //         id: 'Chart11',
    //         beforeDraw: function (Chart11) {
    //             if (typeof dataArrayChart11 !== 'undefined') {
    //                 chartTextCreator(Chart11, dataArrayChart11.toString());
    //             }
    //             else {
    //                 chartTextCreator(Chart11, 'No Data');
    //             }
    //             // drawMultiRadiantCircle(Chart11, canvasHeight, canvasHeight, 120, someColors);
    //             // getGradient
    //             // chartTextCreator(Chart1, 100);
    //         },
    //     }],
    // });
