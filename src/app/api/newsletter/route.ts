import { NextResponse } from "next/server";
import { getD1 } from "@/lib/edge-db";
import { canUseDevMemoryStore, devMemoryAdd } from "@/lib/dev-memory-store";
import { isValidEmail, normalizeEmail } from "@/lib/validate-email";

const storageUnavailable = () =>
  NextResponse.json(
    { error: "Persistent email storage is unavailable" },
    { status: 503 },
  );

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const email =
    typeof body === "object" && body !== null && "email" in body
      ? String((body as { email: unknown }).email)
      : "";
  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }
  const norm = normalizeEmail(email);

  const db = await getD1();
  if (db) {
    try {
      await db
        .prepare(
          "INSERT INTO newsletter_subscribers (email) VALUES (?) ON CONFLICT(email) DO NOTHING",
        )
        .bind(norm)
        .run();
      return NextResponse.json({ ok: true });
    } catch {
      if (!canUseDevMemoryStore()) {
        return storageUnavailable();
      }
    }
  }

  if (!canUseDevMemoryStore()) {
    return storageUnavailable();
  }

  const r = devMemoryAdd("newsletter", norm);
  if (r === "duplicate") {
    return NextResponse.json({ ok: true, note: "already_subscribed" });
  }
  return NextResponse.json({ ok: true, note: "dev_memory" });
}
