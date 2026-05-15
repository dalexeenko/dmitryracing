type Table = "newsletter" | "notify";

const g = globalThis as unknown as {
  __dmitryracing_dev_store?: Map<Table, Set<string>>;
};

function store(): Map<Table, Set<string>> {
  if (!g.__dmitryracing_dev_store) {
    g.__dmitryracing_dev_store = new Map([
      ["newsletter", new Set()],
      ["notify", new Set()],
    ]);
  }
  return g.__dmitryracing_dev_store;
}

export function devMemoryAdd(table: Table, email: string): "ok" | "duplicate" {
  const s = store().get(table)!;
  if (s.has(email)) return "duplicate";
  s.add(email);
  return "ok";
}
