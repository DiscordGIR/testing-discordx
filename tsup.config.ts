import { defineConfig } from 'tsup';

export default defineConfig(options => ({
	entry: ['src/index.ts'],
	format: 'esm',
	minify: false,
	target: 'node16',
	keepNames: true,
	splitting: false,
	skipNodeModulesBundle: true,
	sourcemap: options.watch ? 'inline' : true,
	onSuccess: options.watch ? 'node --enable-source-maps dist/index.js' : undefined,
}));
