export function calculateCost(cart) {
  let total = 0.0;

  cart.forEach((item) => {
    total += item.price;
  });

  return total * 100;
}
