import * as uuid from 'uuid';
import handler from './libs/handler-lib';
import dynamoDB from './libs/dynamodb-lib';

export const main = handler(async function (event, context) {
  const data = JSON.parse(event.body);

  const params = {
    TableName: process.env.reviewTableName,
    Item: {
      productId: data.productId,
      reviewId: uuid.v1(),
      userId: event.requestContext.identity.cognitoIdentityId,
      rating: data.rating,
      image: data.image,
      createdAt: Date.now(),
    },
  };

  await dynamoDB.put(params);

  return params.Item;
});
