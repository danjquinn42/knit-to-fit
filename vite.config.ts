import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: [
        "favicon.svg",
        "robots.txt",
        "apple-touch-icon.png",
        "lookup.json", // ensure this is precached if placed in /public
      ],
      manifest: {
        name: "Knit to Fit",
        short_name: "KnitToFit",
        description: "Offline form + local lookup",
        theme_color: "#ffffff",
        icons: [
          { src: "pwa-192x192.png", sizes: "192x192", type: "image/png" },
          { src: "pwa-512x512.png", sizes: "512x512", type: "image/png" },
          {
            src: "pwa-maskable-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
      // Optional: runtime caching (useful if lookup.json is fetched at runtime)
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /\/lookup\.json$/,
            handler: "CacheFirst",
            options: { cacheName: "lookup-cache" },
          },
        ],
      },
    }),
  ],
});
