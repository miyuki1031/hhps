import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'; // これを追加

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom', // ブラウザ環境をシミュレート
    globals: true,        // describeやitをインポートなしで使えるようにする
  },
  resolve: {
    alias: {
      // 「@」が src フォルダを指すように設定
      '@': path.resolve(__dirname, './src'),
    },
  },
})