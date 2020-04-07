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
                labels: [
                    "Hispanic",
                    "Other",
                    "African-American",
                    "Caucasian",
                    "Multi-Racial"
                ],
                datasets: [
                    {
                        label: "Ethnicity",
                        data: [86, 1, 2, 9, 2],
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
                        data: [22, 47, 31],
                        backgroundColor: [
                            "rgba(255, 99, 132, 1)",
                            "rgba(54, 162, 235, 1)",
                            "rgba(255, 206, 86, 1)"
                        ],
                        borderColor: [
                            "rgba(255,99,132,1)",
                            "rgba(54, 162, 235, 1)",
                            "rgba(255, 206, 86, 1)"
                        ],
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
                        backgroundColor: [
                            "rgba(255, 99, 132, 1)",
                            "rgba(54, 162, 235, 1)"
                        ],
                        borderColor: [
                            "rgba(255,99,132,1)",
                            "rgba(54, 162, 235, 1)"
                        ],
                        borderWidth: 1
                    }
                ]
            }
        });
    }

    if ($("#contact-form").length > 0) {
        var $contactForm = $("#contact-form");
        var $formSubmitButton = $("button.btn-submit");
        var $cardContent = $contactForm.parent();

        $contactForm.submit(function(e) {
            e.preventDefault();

            var $recaptcha = $("#g-recaptcha-response");
            if (!$recaptcha.val()) {
                $(".recaptcha-error").remove();
                var errorAlert = [
                    '<p class="recaptcha-error text-danger text-center">',
                    "Please show that you're not a robot",
                    "</p>"
                ]
                    .join("")
                    .replace(/\s\s+/g, "");
                $cardContent.append(errorAlert);
                return;
            }

            var $form = $(this);
            if ($form[0].checkValidity()) {
                $.post($form.attr("action"), $form.serialize())
                    .then(function() {
                        $(".recaptcha-error").remove();

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
                        $(".recaptcha-error").remove();

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
                    if (
                        input.validity.typeMismatch &&
                        $input.attr("name") == "contact_email"
                    ) {
                        $feedback.html("Please provide a valid email");
                    }
                    if (
                        input.validity.valueMissing &&
                        $input.attr("name") == "contact_email"
                    ) {
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

    if ($("#read-more-03-20-2020").length > 0) {
        const readMoreLink = $("#read-more-03-20-2020");
        readMoreLink.click(function() {
            $(this).text(
                // inverted logic
                $(this).attr("aria-expanded") === "true"
                    ? "Read More"
                    : "View Less"
            );
        });
    }

    if ($("#virtual-club-page").length > 0) {
        import(/* webpackChunkName: "date-fns" */ "date-fns").then(function(
            module
        ) {
            const {
                isWithinInterval,
                startOfToday,
                addHours,
                getDay,
                format,
                addMinutes
            } = module;

            const currentDayNumber = getDay(new Date());

            // if weekend
            if ([0, 6].includes(currentDayNumber)) {
                $("#schedule-tabs .nav-item .nav-link")
                    .first()
                    .addClass("active")
                    .attr("aria-selected", true);

                $(".tab-pane")
                    .first()
                    .addClass("active show");

                $(".live-indicator").each(function() {
                    $(this)
                        .find(".is-not-live")
                        .html("Join us weekdays. Find our schedule below")
                        .removeClass("d-none");

                    $(this)
                        .find(".is-live")
                        .remove();
                });

                return;
            }

            const currentActiveTab = $(
                "#schedule-tabs .nav-item .nav-link"
            ).filter(`[data-day=${currentDayNumber}]`);
            const currentActiveTabPane = $(".tab-pane").filter(
                `[data-day=${currentDayNumber}]`
            );
            currentActiveTab.addClass("active").attr("aria-selected", true);

            currentActiveTabPane.addClass("active show");

            const liveStartToday = currentActiveTabPane.data("start");
            const liveEndToday = currentActiveTabPane.data("end");

            const now = new Date();
            const liveStart = addHours(startOfToday(), liveStartToday);
            const liveEnd = addHours(startOfToday(), liveEndToday);
            const isCurrentlyLive = isWithinInterval(now, {
                start: liveStart,
                end: liveEnd
            });

            // if (isCurrentlyLive) {
            //     $(".live-indicator").each(function() {
            //         $(this)
            //             .find(".is-live")
            //             .removeClass("d-none")
            //             .find(".live-description")
            //             .html(
            //                 `Live today, ${format(
            //                     liveStart,
            //                     "EEE, LLL, do"
            //                 )} from ${format(
            //                     liveStart,
            //                     "hh:mmaaaa"
            //                 )} to ${format(liveEnd, "hh:mmaaaa")}`
            //             );

            //         $(this)
            //             .find(".is-not-live")
            //             .remove();
            //     });
            // } else {
            //     $(".live-indicator").each(function() {
            //         $(this)
            //             .find(".is-not-live")
            //             .removeClass("d-none");

            //         $(this)
            //             .find(".is-live")
            //             .remove();
            //     });
            // }
        });
    }
});
