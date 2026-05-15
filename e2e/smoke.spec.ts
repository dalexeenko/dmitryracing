import { test, expect } from "@playwright/test";

test("home loads and main regions are present", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("#top")).toBeVisible();
  await expect(page.locator("#gallery")).toBeVisible();
  await expect(page.locator("#tracks")).toBeVisible();
  await expect(page.locator("#telemetry")).toBeVisible();
});

test("events API returns JSON", async ({ request }) => {
  const res = await request.get("/api/events");
  expect(res.ok()).toBeTruthy();
  const body = await res.json();
  expect(Array.isArray(body.events)).toBeTruthy();
});
