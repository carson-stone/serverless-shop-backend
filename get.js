import handler from './libs/handler-lib';
import dynamoDB from './libs/dynamodb-lib';

export const main = handler(async function (event, context) {
  const data = event.pathParameters;

  const params = {
    TableName: process.env.reviewTableName,
    Key: {
      product: data.product,
      reviewId: event.pathParameters.reviewId,
    },
  };

  const result = await dynamoDB.get(params);
  if (!result.Item) {
    throw new Error('Review not found');
  }

  return result.Item;
});
