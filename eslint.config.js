import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import eslintConfigPrettier from 'eslint-config-prettier';

export default tseslint.config({
	ignores: ['dist', 'dist-electron', 'dist-react'],

	settings: {
		react: {
			version: 'detect',
		},
	},

	files: ['**/*.{js,jsx,ts,tsx}'],

	languageOptions: {
		ecmaVersion: 2023,
		sourceType: 'module',
		globals: {
			...globals.node,
		},
		parserOptions: {
			project: ['./tsconfig.node.json', './tsconfig.app.json'],
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
		eslintConfigPrettier,
	},
});
