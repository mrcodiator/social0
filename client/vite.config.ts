import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path"

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    define: {
      'process.env.REACT_APP_API_URL': JSON.stringify(env.REACT_APP_API_URL),
      'process.env.REACT_APP_PUBLIC_KEY': JSON.stringify(env.REACT_APP_PUBLIC_KEY),
      'process.env.REACT_APP_PUBLIC_SERVICE_ID': JSON.stringify(env.REACT_APP_PUBLIC_SERVICE_ID),
      'process.env.REACT_APP_PUBLIC_TEMPLATE_ID': JSON.stringify(env.REACT_APP_PUBLIC_TEMPLATE_ID),
    },
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  }
})

