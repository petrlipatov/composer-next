import { test, expect } from '@playwright/test';

test.describe('Pieces Page', () => {
  test('should match the screenshot', async ({ page }) => {
    // Переходим на страницу
    await page.goto('/pieces');

    // Убеждаемся, что основной контент страницы теперь виден.
    await expect(page.getByTestId('pieces-page')).toBeVisible();

    // Делаем скриншот.
    await expect(page).toHaveScreenshot('pieces-page.png', {
      maxDiffPixelRatio: 0.02,
    });
  });
});
