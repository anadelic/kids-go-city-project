import { expect, test } from '@playwright/test';

test('navigation test', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await expect(page).toHaveURL('http://localhost:3000/');
  await expect(
    page.getByRole('heading', { name: 'Vienna with little ones' }),
  ).toBeVisible();
  await expect(page.locator('h1')).toHaveText('Vienna with little ones');
});
