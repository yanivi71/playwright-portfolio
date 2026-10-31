import { test, expect } from '../fixtures/base';

test('login with valid user', async ({ page, loginPage }) => {
  await loginPage.login('standard_user', 'secret_sauce');
  await expect(page).toHaveURL(/inventory/);
});

test('login with wrong password shows error', async ({ loginPage }) => {
  await loginPage.login('standard_user', 'wrong_password');
  await loginPage.expectErrorContains('Username and password do not match');
});