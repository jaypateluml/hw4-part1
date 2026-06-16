// Jay Patel
// COMP 4610 GUI I - HW4 Part 1

// assignment range
var MIN_ALLOWED = -50;
var MAX_ALLOWED = 50;

$(document).ready(function () {

    // digits wont allow negatives
    $.validator.addMethod("wholeNumber", function (value, element) {
        return this.optional(element) || /^-?\d+$/.test(value);
    }, "Please enter a whole number like 5 or -3 (no decimals or letters).");

    // min cant be bigger than its max box
    $.validator.addMethod("notBigger", function (value, element, otherId) {
        var other = parseInt($(otherId).val(), 10);
        var mine = parseInt(value, 10);
        // skip if not a number yet
        if (isNaN(other) || isNaN(mine)) {
            return true;
        }
        return mine <= other;
    }, "The minimum is bigger than its maximum. Lower this value or raise the maximum.");

    // turn on validaton
    $("#tableForm").validate({
        rules: {
            minCol: { required: true, wholeNumber: true, range: [MIN_ALLOWED, MAX_ALLOWED], notBigger: "#maxCol" },
            maxCol: { required: true, wholeNumber: true, range: [MIN_ALLOWED, MAX_ALLOWED] },
            minRow: { required: true, wholeNumber: true, range: [MIN_ALLOWED, MAX_ALLOWED], notBigger: "#maxRow" },
            maxRow: { required: true, wholeNumber: true, range: [MIN_ALLOWED, MAX_ALLOWED] }
        },
        // my own messages
        messages: {
            minCol: {
                required: "Please type the minimum column value.",
                range: "The minimum column must be from -50 to 50."
            },
            maxCol: {
                required: "Please type the maximum column value.",
                range: "The maximum column must be from -50 to 50."
            },
            minRow: {
                required: "Please type the minimum row value.",
                range: "The minimum row must be from -50 to 50."
            },
            maxRow: {
                required: "Please type the maximum row value.",
                range: "The maximum row must be from -50 to 50."
            }
        },
        // show error right after the box
        errorPlacement: function (error, element) {
            error.insertAfter(element);
        },
        // only build if valid, no reload
        submitHandler: function (form) {
            generateTable();
            return false;
        }
    });
});


// read boxes and draw table
function generateTable() {
    var minCol = parseInt($("#minCol").val(), 10);
    var maxCol = parseInt($("#maxCol").val(), 10);
    var minRow = parseInt($("#minRow").val(), 10);
    var maxRow = parseInt($("#maxRow").val(), 10);

    $("#tableArea").html(buildTableHTML(minCol, maxCol, minRow, maxRow));
}


// build the table in html
function buildTableHTML(minCol, maxCol, minRow, maxRow) {
    var html = "<table>";

    // top row colmun numbers
    html += "<thead><tr><th></th>";
    for (var c = minCol; c <= maxCol; c++) {
        html += "<th>" + c + "</th>";
    }
    html += "</tr></thead>";

    // rows and the answerss
    html += "<tbody>";
    for (var r = minRow; r <= maxRow; r++) {
        html += "<tr><th>" + r + "</th>";
        for (var c2 = minCol; c2 <= maxCol; c2++) {
            html += "<td>" + (r * c2) + "</td>";
        }
        html += "</tr>";
    }
    html += "</tbody></table>";
    return html;
}
