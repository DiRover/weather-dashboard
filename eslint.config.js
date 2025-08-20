import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import eslintReact from 'eslint-plugin-react';
import eslintReactHooks from 'eslint-plugin-react-hooks';
import eslintReactRefresh from 'eslint-plugin-react-refresh';
import prettierPlugin from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPerfectionist from 'eslint-plugin-perfectionist';
import tanstackPlugin from '@tanstack/eslint-plugin-query';

export default tseslint.config(
    {
        plugins: {
            '@typescript-eslint': tseslint.plugin,
            '@tanstack/query': tanstackPlugin,
            react: eslintReact,
            'react-hooks': eslintReactHooks,
            'react-refresh': eslintReactRefresh,
            prettier: prettierPlugin,
            perfectionist: eslintPerfectionist,
        },
    },
    {
        ignores: ['dist', 'node_modules', 'eslint.config.js', 'vite.config.ts'],
    },
    js.configs.recommended,
    eslintReact.configs.flat.recommended,
    eslintReact.configs.flat['jsx-runtime'],
    ...tseslint.configs.strictTypeChecked,
    ...tseslint.configs.stylisticTypeChecked,
    {
        languageOptions: {
            ecmaVersion: 'latest',
            globals: globals.browser,
            parserOptions: {
                project: ['tsconfig.app.json', 'tsconfig.node.json'],
            },
        },
    },
    {
        files: ['**/*.{ts,tsx}'],
        rules: {
            ...prettierPlugin.configs.recommended.rules,
            ...tanstackPlugin.configs.recommended.rules,
            ...eslintConfigPrettier.rules,
            'perfectionist/sort-imports': [
                2,
                {
                    type: 'natural',
                    order: 'asc',
                },
            ],

            'react-refresh/only-export-components': [
                2,
                {allowConstantExport: true},
            ],

            '@typescript-eslint/consistent-type-imports': [2],
            '@typescript-eslint/no-floating-promises': [1],
            '@typescript-eslint/no-misused-promises': [1],
            '@typescript-eslint/restrict-template-expressions': [1],
            '@typescript-eslint/unbound-method': [1],
            '@typescript-eslint/no-unused-vars': [
                2,
                {argsIgnorePattern: '^_', ignoreRestSiblings: true},
            ],
            '@typescript-eslint/only-throw-error': [1],

            '@tanstack/query/exhaustive-deps': [2],
            '@tanstack/query/stable-query-client': [2],

            'react/display-name': [0],
            'react/prop-types': [0],

            'react-hooks/rules-of-hooks': [2],
            'react-hooks/exhaustive-deps': [2],
            'react-hooks/react-compiler': [2],

            'no-restricted-imports': [
                'error',
                {
                    paths: [
                        {
                            name: 'react',
                            importNames: ['default'],
                            message: "Dont use 'import React from 'react''.",
                        },
                        {
                            name: 'react-router',
                            importNames: ['data'],
                            message:
                                "Dont use 'data' with createBrowserRouter.",
                        },
                    ],
                },
            ],

            'no-console': [2],
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
    },
);
