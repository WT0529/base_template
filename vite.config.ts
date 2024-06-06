/// <reference types="vitest" />
import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import * as path from "path";
import Pages from "vite-plugin-pages"; // 页面路由
import Layouts from "vite-plugin-vue-layouts"; // 布局
import AutoImport from "unplugin-auto-import/vite";
import AutoComponents from "unplugin-vue-components/vite";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";
import svgLoader from "vite-svg-loader"; // 引用本地SVG
import { createSvgIconsPlugin } from "vite-plugin-svg-icons"; // 本地svg自动生成svg图标
import { createHtmlPlugin } from 'vite-plugin-html' // 配置html模板
import ViteRestart from "vite-plugin-restart";
import { viteMockServe } from "vite-plugin-mock";
import WindiCSS from "vite-plugin-windicss";
import VueSetupExtend from "vite-plugin-vue-setup-extend";
import type { InlineConfig } from "vitest";
import type { UserConfig } from "vite";

interface VitestConfigExport extends UserConfig {
  test: InlineConfig;
}
// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd());
  console.log(typeof env.VITE_PORT);

  return {
    test: {
      include: ["tests/**/*.test.ts"],
    },
    plugins: [
      vue(),
      Pages(),
      Layouts(),
      WindiCSS(),
      VueSetupExtend(),
      // 加载本地svg文件 使用方式: import IconComponent from './my-icon.svg?component'
      svgLoader(),
      ViteRestart({ restart: ["vite.config.ts", ".env.development"] }),
      Icons({
        compiler: "vue3",
        autoInstall: true,
      }),
      AutoImport({
        // 需要自动导入的文件：ts, vue, md
        include: [/\.ts$/, /\.vue$/, /\.md$/],
        // 注册需要全局导入的api
        imports: [
          // 已经预设了全局导入的包
          "vue",
          "vue-router",
          "@vueuse/core",
          // 需要自己定义全局导入规则的包
          {
            // 自己写的模块也可以全局导入
            // import { useUserStore } from '@store/user'
            "@stores/user": ["useUserStore"],
            // 安装的模块亦可以设置全局导入
            axios: [
              // 还可以为默认导出设置别名
              ["default", "axios"],
            ],
          },
        ],
        // ts项目最好在src下生成auto-import.d.ts文件
        dts: "src/auto-import.d.ts",
        // 生成 .eslintrc-auto-import.json 文件，消除 eslint 报错
        eslintrc: {
          // 启用该功能，默认为 fasle，需要改为 true 才能生效
          enabled: true,
          // 生成的文件路径
          filepath: "./.eslintrc-auto-import.json",
          // true | false | 'readonly' | 'readable' | 'writable' | 'writeable'
          globalsPropValue: true,
        },
      }),
      AutoComponents({
        dts: "src/auto-components.d.ts",
        // 自动解析安装的UI组件库组件
        resolvers: [IconsResolver()],
      }),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), "src/assets/icons")], // 与本地储存地址一致
        symbolId: "icon-[dir]-[name]",
      }),
      viteMockServe({
        mockPath: "mock", // 模拟.ts文件的存储文件夹
        // watchFiles: true, // 监视mockPath对应的文件夹内文件中的更改
        // logger: true, // 在控制台显示请求日志
        // supportTs: true, // 读取 ts 文件模块,无法监视.js文件
        // ignore: undefined, // 自动读取模拟.ts 文件时，忽略指定格式的文件
        // localEnabled: process.env.NODE_ENV === 'development',
        // prodEnabled: process.env.NODE_ENV === 'production',
      }),
      createHtmlPlugin({
        minify: true,
        entry: 'src/main.ts',
        template: 'public/index.html',
        inject: {
          data: {
            title: env.VITE_PAGE_TITLE,   // 出现在模版中的 <%- title %>
          },
        },
      })
    ],
    css: {
      preprocessorOptions: {
        scss: {},
      },
      // 移动端适配
      postcss: {
        plugins: [],
      },
    },
    resolve: {
      // 配置路径别名
      alias: {
        "@": path.resolve(__dirname, "src"),
        "@assets": path.resolve(__dirname, "./src/assets"),
        "@types": path.resolve(__dirname, "./src/types"),
        "@stores": path.resolve(__dirname, "./src/stores"),
        "@api": path.resolve(__dirname, "./src/api"),
        "@pages": path.resolve(__dirname, "./src/pages"),
        "@layouts": path.resolve(__dirname, "./src/layouts"),
        "@pugins": path.resolve(__dirname, "./src/pugins"),
      },
      extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json"],
    },
    build: {
      minify: "terser",
      outDir: "dist",
      assetsDir: "assets", // 打包后的静态资源目录
      cssCodeSplit: true, // 按需加载
      terserOptions: {
        compress: {
          // 生产环境时移除console
          drop_console: true,
          drop_debugger: true,
        },
      },
    },
    server: {
      host: env.VITE_HOST,
      port: Number(env.VITE_PORT),
      open: true,
      proxy: {
        "/api": {
          target: "http://localhost:3000",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
  } as VitestConfigExport
});
