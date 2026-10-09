/// <reference types="vite/client" />

// Injected at build time by the mc-server-status plugin in vite.config.ts.
declare const __MC_SERVER_STATUS__: {
  host: string;
  online: boolean;
  players: number;
  max: number;
  version: string | null;
  probedAt: string;
};
