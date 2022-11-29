const appInsights = require('applicationinsights');


const azureInsightsKey = process.env.APPINSIGHTS_INSTRUMENTATIONKEY
let appInsightsClient

if (azureInsightsKey) {
    appInsights
        .setup(azureInsightsKey)
        .setAutoDependencyCorrelation(true)
        .setAutoCollectRequests(true)
        .setAutoCollectPerformance(true, true)
        .setAutoCollectExceptions(true)
        .setAutoCollectDependencies(true)
        .setAutoCollectConsole(true)
        .setUseDiskRetryCaching(true)
        .setSendLiveMetrics(false)
        .setDistributedTracingMode(appInsights.DistributedTracingModes.AI)
        .start();
    appInsightsClient = appInsights.defaultClient;
} else {
    appInsightsClient = {
        trackEvent() {
            //console.log("AAI EVENT: " + JSON.stringify(eventData,null,2));
        },
        trackException(eventData) {
            console.error('AAI EXCEPTION: ' + JSON.stringify(eventData, null, 2));
        },
        trackMetric() {
            //console.log("AAI METRIC: " + JSON.stringify(eventData,null,2));
        },
        trackTrace() {
            //console.log("AAI TRACE: " + JSON.stringify(eventData,null,2));
        },
        trackDependency() {
            //console.log("AAI DEPENDENCY: " + JSON.stringify(eventData,null,2));
        },
        trackRequest() {
            //console.log("AII REQUEST: " + JSON.stringify(eventData,null,2));
        },
        flush() {
        },
    };
}

module.exports = function (app) {
    app.use((req, res, next) => {
        req.appInsights = appInsightsClient
        next();
    });
};