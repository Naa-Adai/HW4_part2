/*
File: multiply.js
GUI Assignment: Creating A Multiplication Web App
Mildred Kumah, UMass Lowell Computer Science, mildred_kumah@student.uml.edu
Copyright (c) 2023 by Mildred All rights reserved. May be freely copied or
excerpted for educational purposes with credit to the author.
*/

$(document).ready(function () {
    $("#tabs").tabs();

    $(".slider").slider({
        min: -55,
        max: 50,
        slide: function (event, ui) {
            $(this).next().val(ui.value);
            myFunction();
        }
    });

    $("#button").on("click", function () {
        if ($("#multiplyForm").valid()) {
            createTableTab();
        }
    });


    $("input[name^='firstNum'], input[name^='secondNum'], input[name^='thirdNum'], input[name^='forthNum']").on('input', function () {
        var sliderId = $(this).prev().attr('id');
        $("#" + sliderId).slider("value", $(this).val());
        myFunction();
    });

    $("#multiplyForm").validate({
        rules: {
            firstNum: {
                required: true,
                number: true,
                range: [-55, 50]
            },
            secondNum: {
                required: true,
                number: true,
                range: [-55, 50]
            },
            thirdNum: {
                required: true,
                number: true,
                range: [-55, 50]
            },
            forthNum: {
                required: true,
                number: true,
                range: [-55, 50]
            }
        },
        messages: {
            firstNum: {
                required: "Please enter a valid number for Starting Vertical Number",
                number: "Please enter a valid number",
                range: "Enter a number between -55 and 50"
            },
            secondNum: {
                required: "Please enter a valid number for Ending Vertical Number",
                number: "Please enter a valid number",
                range: "Enter a number between -55 and 50"
            },
            thirdNum: {
                required: "Please enter a valid number for Starting Horizontal Number",
                number: "Please enter a valid number",
                range: "Enter a number between -55 and 50"
            },
            forthNum: {
                required: "Please enter a valid number for Ending Horizontal Number",
                number: "Please enter a valid number",
                range: "Enter a number between -55 and 50"
            }
        },
        submitHandler: function () {
            myFunction();
        }
    });

    function createTableTab() {
    var firstNum = parseInt($("#firstNum").val());
    var secondNum = parseInt($("#secondNum").val());
    var thirdNum = parseInt($("#thirdNum").val());
    var forthNum = parseInt($("#forthNum").val());

    var tableId = "tab-" + firstNum + "-" + secondNum + "-" + thirdNum + "-" + forthNum;
    var tabLabel = firstNum + " to " + secondNum + " by " + thirdNum + " to " + forthNum;

    if ($("#" + tableId).length === 0) {
        $("#tabs ul").append('<li><a href="#' + tableId + '">' + tabLabel + '</a></li>');
        $("#tabs").append('<div id="' + tableId + '"><table class="outputTable"></table></div>');

        // Generate table content inside the tab
        $("#" + tableId + " table").append("<tbody></tbody>");

        try {
            for (var i = firstNum - 1; i <= secondNum; i++) {
                var row = "<tr>";
                for (var j = thirdNum; j <= forthNum; j++) {
                    if (i == firstNum - 1 && j == thirdNum) {
                        row += "<th>x</th>";
                    }
                    if (i == firstNum - 1) {
                        row += "<th>" + j + "</th>";
                    } else if (j == thirdNum) {
                        row += "<th>" + i + "</th>";
                    } else if (j == forthNum) {
                        row += "<td class='result'>" + i * (j - 1) + "</td>";
                        row += "<td class='result'>" + i * j + "</td>";
                    } else {
                        row += "<td>" + i * (j - 1) + "</td>";
                    }
                }
                row += "</tr>";
                $("#" + tableId + " table tbody").append(row);
            }
        } catch (e) {
            console.error('Error generating table content:', e);
        }

        $("#tabs").tabs("refresh");

        $("#tabs").tabs("option", "active", $("#" + tableId).index());
    } else {
        $("#tabs").tabs("option", "active", $("#" + tableId).index());
    }

        // Add a delete button to each tab
        $("#" + tableId).append('<button class="deleteTabBtn">Delete Tab</button>');

        // Attach click event to delete button
        $("#" + tableId + " .deleteTabBtn").on("click", function () {
            removeTab(tableId);
        });
}




    function myFunction() {
        var output = $("#output");

        var firstNum = parseInt(document.getElementById("firstNum").value);
        var secondNum = parseInt(document.getElementById("secondNum").value);
        var thirdNum = parseInt(document.getElementById("thirdNum").value);
        var forthNum = parseInt(document.getElementById("forthNum").value);

        var table = "";

        // Reset error messages
        $("#1n").html('');
        $("#2n").html('');
        $("#3n").html('');
        $("#4n").html('');

        if (isNaN(firstNum) || firstNum < -55) {
            $("#1n").html('Please enter a valid number for Starting Vertical Number (x > -56 )').css("color", "red");
            return;
        }

        if (isNaN(secondNum) || secondNum > 50) {
            $("#2n").html('Please enter a valid number for Ending Vertical Number (x < 51)').css("color", "red");
            return;
        }

        if (isNaN(thirdNum) || thirdNum < -55) {
            $("#3n").html('Please enter a valid number for Starting Horizontal Number (x > -56)').css("color", "red");
            return;
        }

        if (isNaN(forthNum) || forthNum > 50) {
            $("#4n").html('Please enter a valid number for Starting Horizontal Number (x < 51)').css("color", "red");
            return;
        }


        try {
            for (var i = firstNum - 1; i <= secondNum; i++) {
                table += "<tr>";
                for (var j = thirdNum; j <= forthNum; j++) {
                    if (i == firstNum - 1 && j == thirdNum) {
                        table += "<th>x</th>";
                    }
                    if (i == firstNum - 1) {
                        table += "<th>" + j + "</th>";
                    } else if (j == thirdNum) {
                        table += "<th>" + i + "</th>";
                    } else if (j == forthNum) {
                        table += "<td>" + i * (j - 1) + "</td>";
                        table += "<td>" + i * j + "</td>";
                    } else {
                        table += "<td>" + i * (j - 1) + "</td>";
                    }
                }
                table += "</tr>";
            }
        } catch (e) {
            output.innerHTML = 'Something went wrong: ' + e;
            return;
        }

        var output = $("#output");
        output.html(table);
    }

    function removeTab(tabId) {
        var tabToRemove = $("#" + tabId);

        // Remove the tab content
        tabToRemove.remove();

        // Find the corresponding tab title and remove it
        $("#tabs ul li a[href='#" + tabId + "']").closest("li").remove();

        // Refresh tabs after removal
        $("#tabs").tabs("refresh");
    }


});
