import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [
    react(),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(__dirname, "src/assets/icons")],
      symbolId: "icon-[name]",
    }),
  ],
  build: {
    sourcemap: true,
  },
  server: {
    fs: {
      strict: false,
    },
  },
});
