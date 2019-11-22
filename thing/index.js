const NUM_DEVICES = 5;

const http = require('http');

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

var device = getRandomInt(1, NUM_DEVICES + 1);
var timestamp = new Date();
var bandwidth = getRandomInt(0, 100);

var payload = {
    "device": device,
    "timestamp": timestamp,
    "bandwidth": bandwidth
};

const options = {
    hostname: 'localhost',
    port: 80,
    path: '/device',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
};

console.log(payload);
const req = http.request(options, (res) => {
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
        console.log(`BODY: ${chunk}`);
    });
});

req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
});

// Write data to request body
req.write(JSON.stringify(payload));
req.end();
