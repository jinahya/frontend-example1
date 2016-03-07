
$(document).ready(function () {
    console.log("$(document).ready()");
    var config = JSON.parse(config);
//    $.getJSON("../config/config.json", function (config) {
//        console.log(config);
//    });
});

$(window).on("load", function () {
    console.log("$(window).on('load')");
});

window.onload = function () {
    console.log("window.onload");
};

