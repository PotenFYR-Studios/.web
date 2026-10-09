import { defineConfig, type PluginOption } from 'vite';
import react from '@vitejs/plugin-react';
import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

// Build-time Minecraft server status, probed by scripts/sync-github.ts and
// cached in node_modules/.cache/mc-server-status.json. Static default keeps
// the section honest (live client-side confirm) even without a prior probe.
function mcServerStatusPlugin(): PluginOption {
  const cachePath = fileURLToPath(new URL('./node_modules/.cache/mc-server-status.json', import.meta.url));
  let status = {
    host: 'play.potenfyr.in',
    online: true,
    players: 0,
    max: 100,
    version: '26.3' as string | null,
    probedAt: '',
  };
  if (existsSync(cachePath)) {
    try {
      status = JSON.parse(readFileSync(cachePath, 'utf-8'));
    } catch {
      // keep default
    }
  }
  return {
    name: 'mc-server-status',
    config() {
      return {
        define: {
          __MC_SERVER_STATUS__: JSON.stringify(status),
        },
      };
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [react(), mcServerStatusPlugin()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
