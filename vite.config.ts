import vinext from "vinext";
import { cloudflare } from "@cloudflare/vite-plugin";
import { defineConfig } from "vite";

export default defineConfig(({ command, mode }) => ({
  plugins: [
    vinext(),
    // Use Node for everyday UI development. The Workers emulator can retain
    // request-scoped RSC promises across HMR and hang subsequent requests.
    // Keep the production Workers build and explicit emulator mode available.
    ...(command === "build" || mode === "workers"
      ? [cloudflare({
          viteEnvironment: {
            name: "rsc",
            childEnvironments: ["ssr"],
          },
        })]
      : []),
  ],
  server: { host: "127.0.0.1", strictPort: true },
}));
