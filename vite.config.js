import { existsSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';

// Every page is an HTML entry in ./pages, picked up automatically:
//   index.html                 -> /
//   pricing.html               -> /pricing
//   features-manage-x.html     -> /features/manage-x   (a "features-" prefix becomes a /features/ folder)
// Add a page by dropping a new .html file (and its script) in ./pages.
const PAGES_DIR = resolve(__dirname, 'pages');
const files = readdirSync(PAGES_DIR).filter((file) => file.endsWith('.html')).map((file) => file.slice(0, -'.html'.length));

// Resolved per request (not at startup) so a page added while the dev server is running is routed straight away.
const pageFor = (path) => {
  const name = path.replace(/^\/|\/$/g, '').replace(/^features\//, 'features-');
  return name && name !== 'index' && /^[a-z0-9-]+$/.test(name) && existsSync(resolve(PAGES_DIR, `${name}.html`)) ? `/${name}.html` : null;
};

const cleanUrls = () => {
  const rewrite = (req, _res, next) => {
    const [path, query = ''] = (req.url || '').split('?');
    const target = pageFor(path);
    if (target) req.url = `${target}${query ? `?${query}` : ''}`;
    next();
  };
  return {
    name: 'modojo-clean-urls',
    configureServer(server) { server.middlewares.use(rewrite); },
    configurePreviewServer(server) { server.middlewares.use(rewrite); },
  };
};

export default defineConfig({
  root: PAGES_DIR,
  publicDir: resolve(__dirname, 'public'),
  envDir: __dirname,
  plugins: [cleanUrls()],
  server: { fs: { allow: [__dirname] } },
  build: {
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true,
    rollupOptions: {
      input: Object.fromEntries(files.map((name) => [name, resolve(PAGES_DIR, `${name}.html`)])),
    },
  },
});
