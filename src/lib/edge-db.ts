/// <reference types="@cloudflare/workers-types" />

export type WorkerEnv = {
  DB?: D1Database;
};

export async function getD1(): Promise<D1Database | null> {
  try {
    const mod = await import(
      /* @vite-ignore */ "cloudflare:workers"
    );
    const env = mod.env as WorkerEnv;
    return env.DB ?? null;
  } catch {
    return null;
  }
}
