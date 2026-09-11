// Custom static generation: renders the app to static HTML so crawlers and
// no-JS visitors get real content in the initial response (the <noscript>
// fallback in index.html stays as a belt-and-braces fallback). The site is a
// single page (no router), so rendering <App /> covers every server URL.
// Loads src/App.tsx (not main.tsx, which calls createRoot at import time).
// Runs after `vite build`; no extra dependencies (vite + react-dom only).
import { createServer } from "vite";
import { renderToString } from "react-dom/server";
import { readFile, writeFile } from "node:fs/promises";
import React from "react";

const vite = await createServer({
  server: { middlewareMode: true },
  appType: "custom",
  logLevel: "error",
});

// Suppress the react SSR useLayoutEffect warning (static snapshot; the
// client re-renders fresh, nothing hydrates).
const origError = console.error;
console.error = (...args: unknown[]) => {
  if (String(args[0]).includes("useLayoutEffect")) return;
  origError(...args);
};

try {
  const { default: App } = await vite.ssrLoadModule("/src/App.tsx");
  const html = renderToString(React.createElement(React.StrictMode, null, React.createElement(App)));
  await vite.close();

  const dist = decodeURIComponent(new URL("../dist/index.html", import.meta.url).pathname);
  const file = await readFile(dist, "utf8");
  if (!file.includes('<div id="root"></div>')) {
    throw new Error("root div placeholder not found in dist/index.html");
  }
  await writeFile(dist, file.replace('<div id="root"></div>', `<div id="root">${html}</div>`));
  console.log(`[prerender] app rendered to dist/index.html (${html.length} bytes)`);
} catch (err) {
  await vite.close();
  throw err;
}
