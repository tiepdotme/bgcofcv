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
        Chart.defaults.global.title.fontSize = 22;
        Chart.defaults.global.title.fontColor = "#00ace8 ";

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
                            "rgba(255, 99, 132, 1)",
                            "rgba(54, 162, 235, 1)",
                            "rgba(255, 206, 86, 1)",
                            "rgba(75, 192, 192, 1)",
                            "rgba(153, 102, 255, 1)",
                            "rgba(255, 159, 64, 1)"
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
                labels: ["Hispanic", "Other", "African-American", "Caucasian", "Multi-Racial"],
                datasets: [
                    {
                        label: "Ethnicity",
                        data: [82, 2, 3, 11, 2],
                        backgroundColor: [
                            "rgba(255, 99, 132, 1)",
                            "rgba(54, 162, 235, 1)",
                            "rgba(255, 206, 86, 1)",
                            "rgba(75, 192, 192, 1)",
                            "rgba(255, 159, 64, 1)"
                        ],
                        borderColor: [
                            "rgba(255,99,132,1)",
                            "rgba(54, 162, 235, 1)",
                            "rgba(255, 206, 86, 1)",
                            "rgba(75, 192, 192, 1)",
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
                labels: ["7-10 yrs", "11-13 yrs", "14-18 yrs"],
                datasets: [
                    {
                        data: [23, 43, 34],
                        backgroundColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)"],
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
                        data: [59, 41],
                        backgroundColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
                        borderColor: ["rgba(255,99,132,1)", "rgba(54, 162, 235, 1)"],
                        borderWidth: 1
                    }
                ]
            }
        });
    }

    if ($("#contact-form").length > 0) {
        var $contactForm = $("#contact-form");
        var $formSubmitButton = $("button.btn-submit");
        $contactForm.submit(function(e) {
            e.preventDefault();
            console.log("g-recaptcha-response", $("#g-recaptcha-response"));
            var $form = $(this);
            if ($form[0].checkValidity()) {
                var $cardContent = $contactForm.parent();
                $.post($form.attr("action"), $form.serialize())
                    .then(function() {
                        var successAlert = [
                            '<div class="mt-3 alert alert-success alert-dismissible fade show" role="alert">',
                            '<button type="button" class="close" data-dismiss="alert" aria-label="Close">',
                            '<span aria-hidden="true">&times;</span>',
                            "</button>",
                            "<strong>Success!</strong> We have received your message and will reply to it as soon as possible.",
                            "</div>"
                        ]
                            .join("")
                            .replace(/\s\s+/g, "");

                        $cardContent.append(successAlert);

                        $contactForm.trigger("reset");
                    })
                    .catch(function() {
                        var errorAlert = [
                            '<div class="mt-3 alert alert-danger alert-dismissible fade show" role="alert">',
                            '<button type="button" class="close" data-dismiss="alert" aria-label="Close">',
                            '<span aria-hidden="true">&times;</span>',
                            "</button>",
                            "<strong>Oops!</strong> An error occurred while sending your message. Please try again.",
                            "</div>"
                        ]
                            .join("")
                            .replace(/\s\s+/g, "");

                        $cardContent.append(errorAlert);

                        $contactForm.trigger("reset");

                        $formSubmitButton.attr("disabled", true);
                    });
            }
        });

        var inputs = document.querySelectorAll("input, textarea");
        inputs.forEach(function(input) {
            var $input = $(input);
            var $formGroup = $input.parents(".form-group");
            var $feedback = $formGroup.find(".form-control-feedback");

            input.addEventListener("input", function() {
                if (input.validity.valid) {
                    $formGroup.removeClass("has-danger");
                } else {
                    $formGroup.addClass("has-danger");
                    if (input.validity.typeMismatch && $input.attr("name") == "contact_email") {
                        $feedback.html("Please provide a valid email");
                    }
                    if (input.validity.valueMissing && $input.attr("name") == "contact_email") {
                        $feedback.html("Email is required");
                    }
                }

                if ($contactForm[0].checkValidity()) {
                    $formSubmitButton.removeAttr("disabled");
                } else {
                    $formSubmitButton.attr("disabled", true);
                }
            });
        });
    }
});
