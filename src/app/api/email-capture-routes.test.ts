import { afterEach, describe, expect, it, vi } from "vitest";

import { POST as notifyPost } from "./notify/route";
import { POST as newsletterPost } from "./newsletter/route";

function jsonRequest(path: string, body: unknown): Request {
  return new Request(`https://dmitryracing.com${path}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("email capture routes", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("fails closed for newsletter submissions in production without D1", async () => {
    vi.stubEnv("NODE_ENV", "production");

    const response = await newsletterPost(
      jsonRequest("/api/newsletter", { email: "driver@example.com" }),
    );

    expect(response.status).toBe(503);
    await expect(response.json()).resolves.toEqual({
      error: "Persistent email storage is unavailable",
    });
  });

  it("fails closed for notify submissions in production without D1", async () => {
    vi.stubEnv("NODE_ENV", "production");

    const response = await notifyPost(
      jsonRequest("/api/notify", { email: "driver@example.com" }),
    );

    expect(response.status).toBe(503);
    await expect(response.json()).resolves.toEqual({
      error: "Persistent email storage is unavailable",
    });
  });

  it("keeps dev-memory fallback outside production", async () => {
    vi.stubEnv("NODE_ENV", "test");

    const response = await newsletterPost(
      jsonRequest("/api/newsletter", { email: "local@example.com" }),
    );

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({
      ok: true,
      note: "dev_memory",
    });
  });
});
