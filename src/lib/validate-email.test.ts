import { describe, expect, it } from "vitest";
import { isValidEmail, normalizeEmail } from "./validate-email";

describe("validate-email", () => {
  it("normalizes case and spaces", () => {
    expect(normalizeEmail("  Test@Example.COM ")).toBe("test@example.com");
  });

  it("accepts typical emails", () => {
    expect(isValidEmail("a@b.co")).toBe(true);
    expect(isValidEmail("user+tag@example.org")).toBe(true);
  });

  it("rejects invalid", () => {
    expect(isValidEmail("not-an-email")).toBe(false);
    expect(isValidEmail("")).toBe(false);
  });
});
