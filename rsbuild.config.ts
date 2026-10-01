import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";

export default defineConfig({
  plugins: [pluginReact()],

  html: {
    template: "./src/index.html",
    title: "Resizable Graphics",
  },

  source: {
    entry: {
      index: "./src/index.tsx",
    },
    // Import from "@/..." instead of "../../..".
    alias: {
      "@": "./src",
    },
  },

  output: {
    target: "web",
    distPath: {
      root: "dist",
    },
    cssModules: {
      // Only *.module.css files are treated as CSS Modules; plain .css stays global.
      auto: true,
      // Readable class names in dev, short hashes in production.
      localIdentName:
        process.env.NODE_ENV === "production"
          ? "[hash:base64:6]"
          : "[path][name]__[local]--[hash:base64:5]",
      namedExport: false,
      exportLocalsConvention: "camelCase",
    },
    // Inline assets under 8kb as data URIs.
    dataUriLimit: 8 * 1024,
  },

  server: {
    port: 3000,
    open: true,
  },

  dev: {
    // Keep the overlay so runtime errors surface in the browser.
    hmr: true,
  },

  performance: {
    chunkSplit: {
      strategy: "split-by-experience",
    },
  },
});
