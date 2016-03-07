"use-strict";

var config;

$(document).ready(function () {
    console.log("$(document).ready()");
    $.getJSON({
        url: 'config/default.json',
        success: function (data) {
            config = data;
            console.log('baseurl: ' + config.baseurl);
        }});
    /*
     $.ajax({
     url: 'config/default.json',
     beforeSend: function (xhr) {
     if (xhr.overrideMimeType) {
     xhr.overrideMimeType("application/json");
     }
     },
     dataType: "json",
     success: function (data, status, jqxhr) {
     console.log('data: ' + data);
     console.log('status: ' + status);
     console.log('jqxhr: ' + jqxhr);
     config = data;
     console.log('baseurl: ' + config.baseurl);
     },
     error: function (jqxhr) {
     }
     });
     */
});

$(window).on("load", function () {
    console.log("$(window).on('load')");
});

window.onload = function () {
    console.log("window.onload");
};

