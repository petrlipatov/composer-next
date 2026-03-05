import { test, expect } from '@playwright/test';

test.describe('Info Page', () => {
  test('should match the screenshot', async ({ page }) => {
    // Переходим на страницу
    await page.goto('/info');

    // Убеждаемся, что основной контент страницы виден.
    await expect(page.getByTestId('info-page')).toBeVisible();

    // Делаем скриншот.
    await expect(page).toHaveScreenshot('info-page.png');
  });
});
