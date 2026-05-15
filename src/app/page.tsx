import { Suspense } from "react";
import HomeShell from "@/components/HomeShell";
import StreamedEventsBar from "./StreamedEventsBar";
import { messages } from "@/i18n/messages";

export default function Page() {
  return (
    <main className="min-h-screen">
      <Suspense
        fallback={
          <div className="border-b border-white/10 bg-black/40 px-4 py-5 text-center text-xs text-white/40">
            {messages.en.eventsLoading}
          </div>
        }
      >
        <StreamedEventsBar />
      </Suspense>
      <HomeShell />
    </main>
  );
}
