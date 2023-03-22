import { test } from '@playwright/test';

test('navigation', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page
    .locator('div')
    .filter({ hasText: '+− Leaflet | ©' })
    .nth(2)
    .click();

  await page.getByRole('link', { name: 'Crafts' }).click();
  await page.goto('http://localhost:3000/crafts');
  await page.getByRole('link', { name: 'Weather' }).click();
  await page.getByRole('button', { name: 'Show more outdoor places' }).click();
  await page
    .getByRole('link', {
      name: 'Landgut Wien Cobenzl Am Cobenzl 96a, 1190 Wien',
    })
    .click();
  await page.getByRole('link', { name: 'Home' }).click();
});

test('login', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByPlaceholder('Please enter your username').click();
  await page.getByPlaceholder('Please enter your username').fill('Ana');
  await page.getByPlaceholder('Please enter your password').click();
  await page.getByPlaceholder('Please enter your password').fill('12345');
  await page.getByRole('button', { name: 'Login' }).click();
});
