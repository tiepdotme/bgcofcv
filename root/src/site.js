require("./scss/site.scss");
import $ from "jquery";
window.jQuery = $;
window.$ = $;
require("popper.js");
import "bootstrap";
import Chart from "chart.js";
import "chartjs-plugin-labels";

$(document).ready(() => {
    if ($(".charts").length > 0) {
        Chart.defaults.global.title.fontSize = 18;
        Chart.defaults.global.title.fontColor = "#00868b ";

        const growthChartCtx = $("#growth");
        const growthChart = new Chart(growthChartCtx, {
            type: "bar",
            data: {
                label: "Membership Growth",
                labels: ["2004", "2006", "2008", "2010", "2014", "2016"],
                datasets: [
                    {
                        data: [3597, 4330, 5032, 5006, 7794, 8415],
                        backgroundColor: [
                            "rgba(255, 99, 132, 0.2)",
                            "rgba(54, 162, 235, 0.2)",
                            "rgba(255, 206, 86, 0.2)",
                            "rgba(75, 192, 192, 0.2)",
                            "rgba(153, 102, 255, 0.2)",
                            "rgba(255, 159, 64, 0.2)"
                        ],
                        borderColor: [
                            "rgba(255,99,132,1)",
                            "rgba(54, 162, 235, 1)",
                            "rgba(255, 206, 86, 1)",
                            "rgba(75, 192, 192, 1)",
                            "rgba(153, 102, 255, 1)",
                            "rgba(255, 159, 64, 1)"
                        ],
                        borderWidth: 1
                    }
                ]
            },
            options: {
                scales: {
                    yAxes: [
                        {
                            ticks: {
                                beginAtZero: true
                            }
                        }
                    ]
                },
                title: {
                    text: "Membership Growth",
                    display: true
                },
                legend: {
                    display: false
                }
            }
        });

        const diversityChartCtx = $("#diversity");
        const diversityChart = new Chart(diversityChartCtx, {
            options: {
                title: {
                    text: "Ethnicity",
                    display: true
                },
                legend: {
                    labels: {
                        padding: 5,
                        fontSize: 11
                    }
                },
                layout: {
                    padding: 5
                },
                plugins: {
                    labels: {
                        render: "percentage",
                        overlap: false
                    }
                }
            },
            type: "pie",
            data: {
                labels: ["Hispanic", "Asian", "African-American", "Caucasian", "Native American", "Multi-Racial"],
                datasets: [
                    {
                        label: "Ethnicity",
                        data: [80, 1, 7, 10, 0, 2],
                        backgroundColor: [
                            "rgba(255, 99, 132, 0.2)",
                            "rgba(54, 162, 235, 0.2)",
                            "rgba(255, 206, 86, 0.2)",
                            "rgba(75, 192, 192, 0.2)",
                            "rgba(153, 102, 255, 0.2)",
                            "rgba(255, 159, 64, 0.2)"
                        ],
                        borderColor: [
                            "rgba(255,99,132,1)",
                            "rgba(54, 162, 235, 1)",
                            "rgba(255, 206, 86, 1)",
                            "rgba(75, 192, 192, 1)",
                            "rgba(153, 102, 255, 1)",
                            "rgba(255, 159, 64, 1)"
                        ],
                        borderWidth: 1
                    }
                ]
            }
        });

        const agesChartCtx = $("#ages");
        const agesChart = new Chart(agesChartCtx, {
            options: {
                title: {
                    text: "Age Groups",
                    display: true
                },
                layout: {
                    padding: 5
                },
                plugins: {
                    labels: {
                        render: "percentage",
                        overlap: false
                    }
                }
            },
            type: "pie",
            data: {
                labels: ["14-18 yrs", "7-10 yrs", "11-13 yrs"],
                datasets: [
                    {
                        data: [28, 37, 35],
                        backgroundColor: [
                            "rgba(255, 99, 132, 0.2)",
                            "rgba(54, 162, 235, 0.2)",
                            "rgba(255, 206, 86, 0.2)"
                        ],
                        borderColor: ["rgba(255,99,132,1)", "rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)"],
                        borderWidth: 1
                    }
                ]
            }
        });

        const genderChartCtx = $("#gender");
        const genderChart = new Chart(genderChartCtx, {
            options: {
                title: {
                    text: "Gender",
                    display: true
                },
                layout: {
                    padding: 5
                },
                plugins: {
                    labels: {
                        render: "percentage",
                        overlap: false
                    }
                }
            },
            type: "pie",
            data: {
                labels: ["Boys", "Girls"],
                datasets: [
                    {
                        label: "Gender",
                        data: [56, 44],
                        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
                        borderColor: ["rgba(255,99,132,1)", "rgba(54, 162, 235, 1)"],
                        borderWidth: 1
                    }
                ]
            }
        });
    }
});
