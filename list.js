import handler from './libs/handler-lib';
import dynamoDB from './libs/dynamodb-lib';
import encode from './libs/encode-lib';
import { getS3Object } from './libs/s3-lib';

export const main = handler(async function (event, context) {
  const params = {
    TableName: process.env.reviewTableName,
    KeyConditionExpression: 'product = :product',
    ExpressionAttributeValues: {
      ':product': decodeURI(event.pathParameters.product),
    },
  };

  let result = await dynamoDB.query(params);

  let reviews = [];

  for (let review of result.Items) {
    result = await getS3Object(review.imagePath);
    review.image = encode(result.Body);

    reviews.push(review);
  }

  return reviews;
});
