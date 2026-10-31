import { test } from '../fixtures/base';

test('complete purchase end to end', async ({ loginPage, inventoryPage, checkoutPage }) => {
  await loginPage.login('standard_user', 'secret_sauce');
  await inventoryPage.addToCart('Sauce Labs Backpack');
  await inventoryPage.openCart();

  await checkoutPage.startCheckout();
  await checkoutPage.fillDetails('Yaniv', 'Tester', '12345');
  await checkoutPage.finish();

  await checkoutPage.expectOrderComplete();
});