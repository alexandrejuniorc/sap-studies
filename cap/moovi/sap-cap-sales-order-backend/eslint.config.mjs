import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import json from '@eslint/json';
import prettier from 'eslint-plugin-prettier';

export default [
  { languageOptions: { globals: globals.node } },
  js.configs['recommended'],
  ...tseslint.configs['recommended'],
  {
    ignores: ['./gen/*.{js,ts}'],
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    plugins: { prettier },
    rules: {
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
          tabWidth: 4,
          trailingComma: 'none',
          bracketSpacing: true,
          printWidth: 120,
          endOfLine: 'auto'
        }
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        { caughtErrors: 'all', caughtErrorsIgnorePattern: '^ignore', ignoreRestSiblings: true }
      ],
      'eol-last': 'error',
      indent: ['error', 4, { SwitchCase: 1 }],
      'max-len': ['error', { code: 120, ignoreStrings: true, ignoreTemplateLiterals: true }],
      'max-lines-per-function': ['error', 30],
      'object-curly-spacing': ['error', 'always'],
      quotes: ['error', 'single'],
      'quote-props': ['error', 'as-needed'],
      semi: ['error', 'always'],
      'sort-imports': [
        'error',
        {
          memberSyntaxSortOrder: ['single', 'all', 'multiple', 'none'],
          allowSeparatedGroups: true
        }
      ]
    }
  },
  {
    files: ['**/*.json'],
    plugins: { json },
    language: 'json/json',
    extends: ['json/recommended']
  }
];
