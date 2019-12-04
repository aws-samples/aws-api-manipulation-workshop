const bucket = process.argv[2];

const port = process.env.PORT || 80;
const AWS = require('aws-sdk');

const express = require('express');
const app = express();

app.use(express.json());
var s3 = new AWS.S3();

app.get('/', function (req, res) {
    res.send('alive');
});

app.post('/device', function (req, res) {
    let event = req.body;

    var timestamp = new Date(event.timestamp).getTime();
    let file = `device-${event.device}/${timestamp}.json`;
    let body = JSON.stringify(event);

    let params = {
        Bucket: bucket,
        Key: file,
        Body: body
    };

    console.log(params);
    s3.putObject(params, function (err, data) {
        if (err) console.log(err, err.stack); // an error occurred
    });

    res.status(200).end();
});

app.listen(port, () => console.log(`App listening on port ${port}!`));
