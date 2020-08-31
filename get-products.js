import handler from './libs/handler-lib';
import dynamoDB from './libs/dynamodb-lib';
import encode from './libs/encode-lib';
import { getS3Object } from './libs/s3-lib';

export const main = handler(async function (event, context) {
  const params = {
    TableName: process.env.productTableName,
  };

  let result = await dynamoDB.scan(params);
  if (result.Items.length === 0) {
    throw new Error('No products found');
  }

  let products = [];

  for (let product of result.Items) {
    result = await getS3Object(`merchant-images/${product.name}`);
    product.image = encode(result.Body);

    products.push(product);
  }

  return products;
});
