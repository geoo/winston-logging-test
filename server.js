const express = require('express');
const app = express()
const port = 8080

app.use((req, res, done) => {
    req.user = {
        userName: 'username',
        userId: '12345',
        displayName: 'User Display Name',
    }
    done();
});

require('./middleware/monitor')(app);
require('./middleware/logger')(app);

app.use('/testservice', require('./services/loggingservice')());

app.listen(port, () => {
    console.log(`Now listening on port ${port}`);
});