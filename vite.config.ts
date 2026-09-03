import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  vite: {
    base: "/ellin-space-port/",
  },

  tanstackStart: {
    server: { entry: "server" },

    prerender: {
      enabled: false,
    },
  },
});
