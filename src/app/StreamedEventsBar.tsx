import { getEvents } from "@/lib/events";
import EventsStrip from "@/components/EventsStrip";

async function delay(ms: number) {
  await new Promise((r) => setTimeout(r, ms));
}

/** Suspense boundary: simulates streamed SSR while events resolve (D1 or seed). */
export default async function StreamedEventsBar() {
  await delay(260);
  const events = await getEvents();
  return <EventsStrip initialEvents={events} />;
}
