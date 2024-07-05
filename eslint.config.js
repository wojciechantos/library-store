// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginCypress from 'eslint-plugin-cypress/flat';
import eslintConfigPrettier from 'eslint-config-prettier';

export default tseslint.config(
	eslint.configs.recommended,
	...tseslint.configs.strict,
	...tseslint.configs.stylistic,
	pluginCypress.configs.globals,
	pluginCypress.configs.recommended,
	eslintConfigPrettier,
	{
		plugins: {
			cypress: pluginCypress,
		},
	},
	{
		rules: {
			'@typescript-eslint/no-non-null-assertion': 'off',
		},
	},
	{
		ignores: ['dist'],
	}
);
