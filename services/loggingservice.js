const express = require('express');
const router = express.Router();

const handler = (func) => (req, res) => {
    try {
        req.logger.info('handler.start');
        func(req, res);
        req.logger.info('handler.end');
    } catch (e) {
        req.logger.error("Meaningful log message", e)

        req.appInsights.trackException({
            exception: e,
            properties: {
                userId: req.user.userId
            }
        })

        res.status(500)
        res.writeHead(500, 'Internal Error').end();
    }
};

module.exports = function () {

    router.get('/success', handler((req, res) => {
        res.send("success!")
    }));

    router.get('/test', handler((req, res) => {
        var test
        test.test()
    }));

    router.get('/test2', (req, res) => {
        try {
            var test
            test.test()
        } catch (e) {
            req.logger.error("Meaningful log message", e)
            req.appInsights.trackException({
                exception: e,
                properties: {
                    userId: req.user.userId
                }
            })
            res.writeHead(500, 'Internal Error').end();
        }
    });

    return router;
}