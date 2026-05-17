"use client";

import { useEffect } from "react";

type Tool = {
  name: string;
  description: string;
  inputSchema: object;
  execute: (input: Record<string, string>) => Promise<unknown>;
};

declare global {
  interface Navigator {
    modelContext?: {
      provideContext?: (context: { tools: Tool[] }) => void;
      registerTool?: (tool: Tool) => void;
    };
  }
}

const tools: Tool[] = [
  {
    name: "site_info",
    description:
      "Get a summary of dmitryracing.com: the tracks featured, the car, and the author.",
    inputSchema: { type: "object", properties: {}, required: [] },
    execute: async () => ({
      title: "Dmitry Alexeenko Racing",
      car: "Porsche 718 Cayman GT4",
      tracks: ["Estoril", "Portimão", "The Ridge", "Pacific Raceways"],
      author: "Dmitry Alexeenko",
      blog: "https://dmitry.ie",
    }),
  },
];

export function WebMCP() {
  useEffect(() => {
    const mc = navigator.modelContext;
    if (!mc) return;
    if (mc.provideContext) mc.provideContext({ tools });
    else if (mc.registerTool) for (const t of tools) mc.registerTool(t);
  }, []);

  return null;
}
