import { calculateCost } from '../libs/billing-lib';

test('cart total', function () {
  const cart = [{ price: 150.0 }, { price: 100.0 }, { price: 25.0 }];
  const expectedTotal = (150 + 100 + 25) * 100;
  const calculatdeTotal = calculateCost(cart);

  expect(calculatdeTotal).toEqual(expectedTotal);
});
