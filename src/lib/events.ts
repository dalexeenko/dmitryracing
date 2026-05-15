import seed from "@/data/events.seed.json";
import { getD1 } from "@/lib/edge-db";

export type CalendarEvent = {
  id: string;
  title: string;
  date: string;
  track: string;
};

export async function getEvents(): Promise<CalendarEvent[]> {
  const db = await getD1();
  if (!db) {
    return seed as CalendarEvent[];
  }
  try {
    const { results } = await db
      .prepare(
        `SELECT id, title, event_date, track_slug
       FROM events
       WHERE event_date >= date('now', '-1 day')
       ORDER BY event_date ASC
       LIMIT 12`,
      )
      .all<{
        id: string;
        title: string;
        event_date: string;
        track_slug: string;
      }>();
    if (results?.length) {
      return results.map((r) => ({
        id: r.id,
        title: r.title,
        date: r.event_date,
        track: r.track_slug,
      }));
    }
  } catch {
    /* D1 present but migrations not applied (local dev) — fall back to seed */
  }
  return seed as CalendarEvent[];
}
