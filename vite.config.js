import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

/**
 * Vite 설정
 * base: GitHub Pages 주소(https://{사용자명}.github.io/my-portfolio/)에 맞춘 경로
 */
export default defineConfig({
  plugins: [react()],
  base: '/my-portfolio/',
});
