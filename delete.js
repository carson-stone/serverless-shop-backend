import handler from './libs/handler-lib';
import dynamoDB from './libs/dynamodb-lib';

export const main = handler(async function (event, context) {
  const data = JSON.parse(event.body);

  const params = {
    TableName: process.env.reviewTableName,
    Key: {
      productId: data.productId,
      reviewId: event.pathParameters.reviewId,
    },
  };

  await dynamoDB.delete(params);

  return { status: true };
});
