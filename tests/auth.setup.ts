import { test as setup, expect } from "@playwright/test";

setup("setup authenticated state customer 01", async ({ page }) => {
  const email = "customer@practicesoftwaretesting.com";
  const password = "welcome01";
  const customer01AuthFile = ".auth/customer01.json";

  await page.goto("https://practicesoftwaretesting.com/auth/login");

  // fill email
  await page.getByTestId("email").fill(email);

  // fill password
  await page.getByTestId("password").fill(password);

  // submit login form
  await page.getByTestId("login-submit").click();

  await expect(page.getByTestId("nav-menu")).toContainText("Jane Doe");

  await page.context().storageState({ path: customer01AuthFile });
});
