import AWS from 'aws-sdk';

const s3 = new AWS.S3();

export default async function (Key) {
  return s3
    .getObject({
      Bucket: process.env.productBucketName,
      Key,
    })
    .promise();
}
