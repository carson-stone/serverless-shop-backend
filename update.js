import handler from './libs/handler-lib';
import dynamoDB from './libs/dynamodB-lib';

export const main = handler(async function (event, context) {
  const data = JSON.parse(event.body);

  const params = {
    TableName: process.env.reviewTableName,
    Key: {
      productId: data.productId,
      reviewId: event.pathParameters.reviewId,
    },
    UpdateExpression: 'SET rating = :rating, image = :image',
    ExpressionAttributeValues: {
      ':rating': data.rating || null,
      ':image': data.image || null,
    },
    ReturnValues: 'ALL_NEW',
  };

  const res = await dynamoDB.update(params);

  return { status: true };
});
