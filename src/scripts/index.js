"use-strict";

var logger = log4javascript.getLogger("index.js");
logger.addAppender(new log4javascript.BrowserConsoleAppender());
//logger.log("level: " + logger.getLevel());
logger.setLevel(log4javascript.Level.DEBUG);

var config;

$(document).ready(function () {
    //console.log("$(document).ready()");
    logger.debug("$(document).ready()");
    $.getJSON({
        url: 'configs/default.json',
        success: function (data) {
            config = data;
            console.log('baseurl: ' + config.baseurl);
        }});
});

$(window).on("load", function () {
    console.log("$(window).on('load')");
});

window.onload = function () {
    console.log("window.onload");
};

