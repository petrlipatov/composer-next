import { test, expect } from '@playwright/test';

test.describe('Work Page', () => {
  test('should match the screenshot', async ({ page }) => {
    // Переходим на страницу
    await page.goto('/work');

    // Убеждаемся, что основной контент страницы теперь виден.
    await expect(page.getByTestId('work-page')).toBeVisible();

    // Делаем скриншот.
    await expect(page).toHaveScreenshot('work-page.png', {
      maxDiffPixelRatio: 0.02,
    });
  });
});
