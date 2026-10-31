import { test, expect } from '../fixtures/base';

test('add product to cart', async ({ page, loginPage, inventoryPage }) => {
  await loginPage.login('standard_user', 'secret_sauce');
  await inventoryPage.addToCart('Sauce Labs Backpack');
  await inventoryPage.expectCartCount(1);

  await inventoryPage.openCart();
  await expect(page).toHaveURL(/cart/);
  await expect(page.locator('[data-test="inventory-item-name"]')).toHaveText('Sauce Labs Backpack');
});