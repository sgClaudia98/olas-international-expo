import react from 'eslint-plugin-react';
import reactNative from 'eslint-plugin-react-native';
import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';

export default [
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    ignores: ['node_modules/**', 'android/**', 'ios/**', '.expo/**', 'dist/**', 'build/**'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        },
        ecmaVersion: 2021,
        sourceType: 'module'
      },
      globals: {
        console: 'readonly',
        process: 'readonly',
        Buffer: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        exports: 'writable',
        module: 'writable',
        require: 'readonly',
        global: 'readonly',
        React: 'readonly'
      }
    },
    plugins: {
      react,
      'react-native': reactNative,
      '@typescript-eslint': typescript
    },
    rules: {
      // React Native specific rules
      'react-native/no-raw-text': ['error', {
        skip: ['Text', 'ThemedText', 'Button', 'DataTable.Title', 'DataTable.Cell']
      }],
      'react-native/no-unused-styles': 'warn',
      'react-native/no-inline-styles': 'off',
      'react-native/no-color-literals': 'off',
      'react-native/no-single-element-style-arrays': 'warn',
      
      // React rules
      'react/jsx-no-literals': ['warn', {
        noStrings: false,
        allowedStrings: ['N/A', '/', '$', ':', '-', '+', '(', ')', ' ', '.', ','],
        ignoreProps: true,
        noAttributeStrings: false
      }],
      'react/prop-types': 'off',
      'react/display-name': 'off',
      'react/react-in-jsx-scope': 'off',
      
      // General rules
      'no-irregular-whitespace': ['error', {
        skipStrings: false,
        skipComments: false,
        skipRegExps: false,
        skipTemplates: false,
        skipJSXText: false
      }]
    },
    settings: {
      react: {
        version: 'detect'
      }
    }
  }
];