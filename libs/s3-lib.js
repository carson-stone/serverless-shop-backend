import AWS from 'aws-sdk';

const s3 = new AWS.S3();

export async function getS3Object(Key) {
  return s3
    .getObject({
      Bucket: process.env.bucketName,
      Key,
    })
    .promise();
}

export async function putS3Object(Key, image) {
  return s3
    .putObject({
      Bucket: process.env.bucketName,
      Key,
      Body: image,
    })
    .promise();
}
