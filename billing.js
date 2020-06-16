import stripePackage from 'stripe';
import handler from './libs/handler-lib';
import { calculateCost } from './libs/billing-lib';

export const main = handler(async function (event, context) {
  const { cart, source } = JSON.parse(event.body);
  const amount = calculateCost(cart);
  const description = `serverless shop purchase at ${Date.now}`;

  const stripe = stripePackage(process.env.stripeSecretKey);

  await stripe.charges.create({
    source,
    amount,
    description,
    currency: 'usd',
  });

  return { status: true };
});
