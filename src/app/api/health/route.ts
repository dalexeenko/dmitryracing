import { NextResponse } from "next/server";
import { getD1 } from "@/lib/edge-db";

export async function GET() {
  const db = await getD1();
  if (!db) {
    return NextResponse.json(
      {
        ok: true,
        storage: "fallback",
        detail: "D1 binding not available in this runtime (typical for Node `vinext start`).",
      },
      { status: 200 },
    );
  }
  try {
    await db.prepare("SELECT 1").first();
    return NextResponse.json({ ok: true, storage: "d1" });
  } catch {
    return NextResponse.json({
      ok: false,
      storage: "d1_error",
      detail: "D1 reachable but query failed (apply migrations: wrangler d1 migrations apply DB --local)",
    });
  }
}
