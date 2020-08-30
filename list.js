import handler from './libs/handler-lib';
import dynamoDB from './libs/dynamodb-lib';

export const main = handler(async function (event, context) {
  const product = event.pathParameters.product;

  const params = {
    TableName: process.env.reviewTableName,
    KeyConditionExpression: 'product = :product',
    ExpressionAttributeValues: {
      ':product': product,
    },
  };

  const result = await dynamoDB.query(params);

  return result.Items;
});
