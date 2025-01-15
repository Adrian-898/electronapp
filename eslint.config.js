import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import eslintConfigPrettier from 'eslint-config-prettier';

export default tseslint.config({
	ignores: ['dist', 'dist-electron', 'dist-react'],

	settings: {
		react: {
			version: '18.3',
		},
	},

	files: ['**/*.{js,jsx,ts,tsx}'],

	languageOptions: {
		ecmaVersion: 'latest',
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
		},
	},

	plugins: {
		...pluginJs.configs.recommended,
		...tseslint.configs.recommendedTypeChecked,
		...pluginReact.configs.flat.recommended,
		eslintConfigPrettier,
	},
});
