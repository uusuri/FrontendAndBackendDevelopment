import { defineConfig } from "vite";
import { resolve } from "node:path";
export default defineConfig({base:"./",build:{rollupOptions:{input:Object.fromEntries(["index","catalog","category","product","order","about","guide","contacts"].map(n=>[n,resolve(process.cwd(),n+".html")]))}}});
