/* eslint-disable import/no-extraneous-dependencies */
import { globby } from 'globby';
import { join } from 'path';
import { defineConfig } from 'tsup';
import { fileURLToPath } from 'url';

const path = fileURLToPath(new URL('.', import.meta.url));
const paths = await globby(join(path, 'src/{events,commands}/**/*.{ts,js}'));
export default defineConfig((options) => ({
  entry: ['src/index.ts', ...paths],
  format: 'esm',
  minify: false,
  target: 'node16',
  keepNames: true,
  splitting: false,
  skipNodeModulesBundle: true,
  sourcemap: options.watch ? 'inline' : true,
  onSuccess: options.watch
    ? 'node --enable-source-maps dist/index.js'
    : undefined,
}));
