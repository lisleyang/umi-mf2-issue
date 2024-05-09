import { defineConfig } from "umi";
import { ModuleFederationPlugin } from '@module-federation/enhanced/webpack';

export default defineConfig({
  routes: [
    { path: "/", component: "index" },
    { path: "/docs", component: "docs" },
  ],
  npmClient: 'pnpm',
  chainWebpack(memo) {
    memo.plugin('module-federation').use(ModuleFederationPlugin, [
      {
        name: 'federation_provider',
        // filename: 'remoteEntry.js',
        exposes: {
          './button': './src/components/button',
        },
        shared: {
          react: {
            singleton: true,
          },
          'react-dom': {
            singleton: true,
          },
        },
      },
    ]);
  }
});
