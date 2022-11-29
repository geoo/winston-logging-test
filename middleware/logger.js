const {createLogger, format, transports} = require("winston");
const {json} = require("express");
const {combine, timestamp, label, printf, prettyPrint} = format;
const CATEGORY = "winston custom format";

/*
* logger start
* https://reflectoring.io/node-logging-winston/
* */

function getDefaultLogger(req) {

    let printFormat =
        (process.env.WEBSITE_HOSTNAME
            && process.env.WEBSITE_HOSTNAME.indexOf('azure') != 1)
            ? format.json() : prettyPrint()

    return createLogger({
        level: "debug", // log everything from debug and higher
        label: "logging-test",
        format: combine(
            format.timestamp(),
            format.colorize(),
            printFormat
        ),
        defaultMeta: {
            originalUrl: req.originalUrl,
            userId: req.user.userId
        },
        transports: [new transports.Console({level: "debug"})],
    })
};

module.exports = function (app) {
    app.use((req, res, next) => {
        req.logger = getDefaultLogger(req);
        next();
    });
};