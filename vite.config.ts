import { defineConfig } from "@lovable.dev/vite-tanstack-config";

const isLovableSandbox =
  process.env["LOVABLE_SANDBOX"] === "1" ||
  !!process.env["DEV_SERVER__PROJECT_PATH"];

export default defineConfig({
  // GitHub Pages is a static host, so don't generate a Nitro server there.
  nitro: isLovableSandbox ? undefined : false,

  // GitHub Pages project URL:
  // https://ellinsd.github.io/ellin-space-port/
  vite: {
    base: "/ellin-space-port/",
  },

  tanstackStart: {
    server: { entry: "server" },

    // Generate index.html and other static pages during build.
    prerender: {
      enabled: true,
      crawlLinks: true,
      autoSubfolderIndex: true,
      failOnError: true,
    },
  },
});
