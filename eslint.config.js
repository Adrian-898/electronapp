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

	files: ['**/*.{ts,tsx}'],

	languageOptions: {
		ecmaVersion: 2020,
		sourceType: 'module',
		globals: {
			...globals.node,
		},
		parserOptions: {
			emitDecoratorMetadata: true,
			project: ['./tsconfig.node.json', './tsconfig.app.json'],
			ecmaFeatures: {
				jsx: true,
			},
			tsconfigRootDir: import.meta.dirname,
		},
	},
	plugins: {
		pluginJs,
		pluginReact,
		tseslint,
	},
	rules: {
		'no-unused-vars': 'warn',
	},
	extends: [
		pluginJs.configs.recommended,
		...tseslint.configs.recommendedTypeChecked,
		pluginReact.configs.flat.recommended,
		pluginReact.rules['jsx-uses-react'],
		eslintConfigPrettier,
	],
});
