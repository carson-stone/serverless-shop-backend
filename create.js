import * as uuid from 'uuid';
import handler from './libs/handler-lib';
import dynamoDB from './libs/dynamodb-lib';
import { putS3Object } from './libs/s3-lib';

export const main = handler(async function (event, context) {
  const data = JSON.parse(event.body);
  const imagePath = `review-images/${uuid.v1()}`;

  const params = {
    TableName: process.env.reviewTableName,
    Item: {
      product: decodeURI(data.product),
      reviewId: uuid.v1(),
      userId: event.requestContext.identity.cognitoIdentityId,
      rating: data.rating,
      imagePath,
      createdAt: Date.now(),
    },
  };

  await dynamoDB.put(params);

  await putS3Object(imagePath, data.image);

  return params.Item;
});
