import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import TypescriptParser from '@typescript-eslint/parser';
import pluginReact from 'eslint-plugin-react';
import eslintConfigPrettier from 'eslint-config-prettier';

export default tseslint.config({
	ignores: [
		'dist',
		'dist-electron',
		'dist-react',
		'src/electron/main.ts',
		'src/electron/util.ts',
	],

	settings: {
		react: {
			version: 'detect',
		},
	},

	files: ['**/*.{ts,tsx}'],

	languageOptions: {
		sourceType: 'module',
		globals: {
			...globals.browser,
		},
		parser: TypescriptParser,
		parserOptions: {
			project: ['./tsconfig.node.json', './tsconfig.app.json'],
			ecmaVersion: 2023,
			ecmaFeatures: {
				jsx: true,
			},
			tsconfigRootDir: import.meta.dirname,
			allowJs: true,
		},
	},

	plugins: {
		...pluginJs.configs.recommended,
		...tseslint.configs.recommendedTypeChecked,
		...pluginReact.configs.flat.recommended,
		...eslintConfigPrettier,
	},
});
