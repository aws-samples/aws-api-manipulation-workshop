const AWS = require('aws-sdk');
const sns = new AWS.SNS();
const s3 = new AWS.S3();

const TOPIC_ARN = process.env.TOPIC_ARN;
const THRESHOLD = process.env.THRESHOLD;

exports.handler = async(event) => {
    console.log("Event: " + JSON.stringify(event));
 
    let data = await s3.getObject(buildGetObjectParams(event)).promise();
    let networkEvent = JSON.parse(data.Body);

    let result = null;
    if (networkEvent.bandwidth >= THRESHOLD) {
        result = await publishToSNS(networkEvent); // if bandwith > threshold, send notification
    }
    else {
        result = { statusCode: 200 } // if bandwith > threshold, do nothing
    }

    return result;

    function buildGetObjectParams(event) {
        let record = event.Records[0];
        let bucket = record.s3.bucket.name;
        let key = record.s3.object.key;

        return {
            Bucket: bucket,
            Key: key
        };

    }

    async function publishToSNS(object) {
        let message =
            `
            Device: ${object.device}
            Timestamp: ${object.timestamp}
            Bandwidth: ${object.bandwidth}`;

        let params = {
            Subject: 'Network Event',
            Message: message,
            TopicArn: TOPIC_ARN
        }

        console.log("Publishing: " + JSON.stringify(params));
        return sns.publish(params).promise()
    }
};
