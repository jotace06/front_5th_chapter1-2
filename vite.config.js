import { defineConfig as defineTestConfig, mergeConfig } from "vitest/config";
import { defineConfig } from "vite";

function createBaseConfig(command) {
  return {
    base: command === "build" ? "/front_5th_chapter1-2/" : "/",
    esbuild: {
      jsxFactory: "createVNode",
    },
    optimizeDeps: {
      esbuildOptions: {
        jsx: "transform",
        jsxFactory: "createVNode",
      },
    },
    build: {
      rollupOptions: {
        input: {
          main: "index.html",
          hash: "index.hash.html",
        },
      },
    },
  };
}

const testConfig = defineTestConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.js",
    exclude: ["**/e2e/**", "**/*.e2e.spec.js", "**/node_modules/**"],
  },
});

export default defineConfig(({ command }) => {
  const baseConfig = createBaseConfig(command);
  return mergeConfig(baseConfig, testConfig);
});
