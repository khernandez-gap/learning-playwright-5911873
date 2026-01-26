import { test, expect } from "@playwright/test";

test.describe("Home Page with no authentication", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://practicesoftwaretesting.com/");
  });

  test("Visual test", async ({ page }) => {
    await page.waitForLoadState("networkidle");
    await expect(page).toHaveScreenshot("home-no-auth.png", {
      mask: [page.getByTitle("Practice Software Testing - Toolshop")],
    });
  });

  test("Check sign in", async ({ page }) => {
    // Ensure the sign-in link is visible
    await expect(page.getByTestId("nav-sign-in")).toHaveText("Sign in");
  });

  test("Validate page title", async ({ page }) => {
    // Check the title of the page
    await expect(page).toHaveTitle(
      "Practice Software Testing - Toolshop - v5.0"
    );
  });

  test("grid loads with 9 items", async ({ page }) => {
    // Check the count of items displayed on the home page
    const productGrid = page.locator(".col-md-9");
    await expect(productGrid.getByRole("link")).toHaveCount(9);

    // using a non locator assertion
    expect(await productGrid.getByRole("link").count()).toBe(9);
  });

  test("search for Thor Hammer", async ({ page }) => {
    // Search for Thor Hammer and check the result
    const productGrid = page.locator(".col-md-9");
    await page.getByTestId("search-query").fill("Thor Hammer");
    await page.getByTestId("search-submit").click();
    await expect(productGrid.getByRole("link")).toHaveCount(1);
    await expect(page.getByAltText("Thor Hammer")).toBeVisible();
  });
});

test.describe("Home Page customer 01 au", () => {
  test.use({
    storageState: ".auth/customer01.json",
  });

  test.beforeEach(async ({ page }) => {
    await page.goto("https://practicesoftwaretesting.com/");
  });

  test("Visual test authenticated", async ({ page }) => {
    await page.waitForLoadState("networkidle");
    await expect(page).toHaveScreenshot("home-page-customer01.png", {
      mask: [page.getByTitle("Practice Software Testing - Toolshop")],
    });
  });

  test("Check customer 01 user is logged in", async ({ page }) => {
    // Ensure the user's name is visible in the navigation menu
    await expect(page.getByTestId("nav-menu")).toContainText("Jane Doe");
  });
});
