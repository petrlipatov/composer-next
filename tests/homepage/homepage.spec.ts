import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test("should match the screenshot", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByTestId("home-page-loader")).toBeHidden({
      timeout: 5000,
    });

    await expect(page.getByTestId("home-page")).toBeVisible();

    await expect(page).toHaveScreenshot("homepage.png");
  });
});
