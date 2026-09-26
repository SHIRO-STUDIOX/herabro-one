import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from "path"

export default defineConfig({
    plugins: [vue()],
    root: '',

    resolve: {
        alias: {
          // Here you set your alias.
          // The `@` symbol is a common convention for the src directory.
          'app': path.resolve(__dirname, './../../'),
    
        },
      },
    build: {
        // ۱. مسیر outDir را به پوشه اصلی ماژول اصلاح می‌کنیم.
        outDir: './src/assets/vue',
        manifest: false,
        cssCodeSplit: false,
        minify: "terser",
        terserOptions: {
            compress: true,
            mangle: {
              toplevel: true,
              reserved: ["$", "E", "pjax", "jQuery", '/^\$/', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
                'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
                'A', 'B', 'C', 'D', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
                'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
            },
            format: {
              ascii_only: true,
            },
          },

        rollupOptions: {
            input: './src/app/main.js',
            output: {
                entryFileNames: `sidebar.bundle.js`,

                chunkFileNames: `[name]-[hash].js`,

                assetFileNames: (assetInfo) => {
                    if (assetInfo.originalFileNames.toString().endsWith('.css')) {
                        return 'assets/css/sidebar.bundle.css';
                    }
                    return 'assets/vue/[name]-[hash][extname]';
                },
            },
        },
    },

    server: {
        origin: 'http://localhost:8002',
    },
});