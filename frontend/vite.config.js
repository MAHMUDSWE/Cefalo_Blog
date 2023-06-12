import { defineConfig, loadEnv } from "vite";

import http from "https";
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],
    server: {
      port: 3000,
      proxy: {
        "/api/v1": {
          target: env.VITE_API_HOST,
          changeOrigin: true,
          secure: false,
          agent: new http.Agent(),
        },
      },
    },
    optimizeDeps: {
      exclude: ["@fortawesome/fontawesome-svg-core"]
    }
  };
});