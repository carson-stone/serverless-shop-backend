import handler from './libs/handler-lib';
import dynamoDB from './libs/dynamodb-lib';

export const main = handler(async function (event, context) {
  const data = JSON.parse(event.body);

  const params = {
    TableName: process.env.reviewTableName,
    KeyConditionExpression: 'productId = :productId',
    ExpressionAttributeValues: {
      ':productId': data.productId,
    },
  };

  const result = await dynamoDB.query(params);

  return result.Items;
});
