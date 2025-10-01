import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'out/**',
      'build/**',
      'next-env.d.ts',
    ],
    rules: {
      // Allow 'any' type where necessary
      '@typescript-eslint/no-explicit-any': 'off',

      // Allow {} type (object)
      '@typescript-eslint/ban-types': [
        'warn',
        {
          types: {
            '{}': false,
            Object: false,
            Function: false,
          },
        },
      ],

      // Optionally, relax some stricter rules from Next.js
      '@typescript-eslint/explicit-module-boundary-types': 'off',
    },
  },
];

export default eslintConfig;
