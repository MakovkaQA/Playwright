const { test, expect } = require("@playwright/test");
const { user, password } = require("../user");

test.beforeEach(async ({ page }) => {
  await page.goto("https://netology.ru/?modal=sign_in");
});

test("Successful authorization", async ({ page }) => {
  await page.getByPlaceholder("Email").click();
  await page.getByPlaceholder("Email").fill(user);
  await page.getByPlaceholder("Пароль").click();
  await page.getByPlaceholder("Пароль").fill(password);
  await page.getByTestId("login-submit-btn").click();
  await expect(page).toHaveURL("https://netology.ru/profile");

  await expect(
    page.getByRole("heading", { name: "Моё обучение" })
  ).toBeVisible();
});

test("Unsuccessful authorization", async ({ page }) => {
  await page.getByPlaceholder("Email").click();
  await page.getByPlaceholder("Email").fill("invalidUser");
  await page.getByPlaceholder("Пароль").click();
  await page.getByPlaceholder("Пароль").fill("invalidPassword");
  await page.getByTestId("login-submit-btn").click();

  await expect(page.getByText("Неверный email")).toBeVisible();
  await expect(page).toHaveURL("https://netology.ru/?modal=sign_in");
});
