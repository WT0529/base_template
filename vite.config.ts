import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import postcssPxToViewport from 'postcss-px-to-viewport'
import Pages from 'vite-plugin-pages' // 页面路由
import Layouts from 'vite-plugin-vue-layouts' // 布局

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Pages(),
    Layouts(),
  ],
  css: {
    preprocessorOptions: {
      scss: {}
    },
    // 移动端适配
    postcss: {
      plugins: [
        // viewport 布局适配
        postcssPxToViewport({
          viewportWidth: 375
        })
      ]
    }
  },
  resolve: {
    // 配置路径别名
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@types': path.resolve(__dirname, './src/types'),
      '@stores': path.resolve(__dirname, './src/stores'),
      '@api': path.resolve(__dirname, './src/api'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@layouts': path.resolve(__dirname, './src/layouts'),
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json']
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets', // 打包后的静态资源目录
    cssCodeSplit: true,  // 按需加载
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
