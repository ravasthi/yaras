const path = require('path');

const eslintConfig = {
  parser: 'babel-eslint',
  extends: [
    'airbnb',
    'plugin:jest/recommended',
    'plugin:jest/style',
    'prettier',
  ],
  plugins: ['babel', 'import', 'jest', 'react', 'sort-imports-es6-autofix'],
  rules: {
    'class-methods-use-this': ['error'],
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'ignore',
      },
    ],
    'function-paren-newline': ['off'],
    'generator-star-spacing': ['error', 'before'],
    'import/extensions': ['off'],
    'import/first': ['off', null],
    'import/order': ['off'],
    indent: [
      'error',
      2,
      // Workaround for https://github.com/babel/babel-eslint/issues/799
      // https://github.com/babel/babel-eslint/issues/799#issuecomment-568195009
      { ignoredNodes: ['TemplateLiteral'] },
    ],
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['hrefLeft', 'hrefRight', 'to'],
        aspects: ['noHref', 'invalidHref', 'preferButton'],
      },
    ],
    'jsx-a11y/label-has-for': [
      'error',
      {
        components: [],
        required: {
          some: ['nesting', 'id'],
        },
        allowChildren: false,
      },
    ],
    'jsx-a11y/label-has-associated-control': [
      'error',
      {
        assert: 'either',
      },
    ],
    'max-len': [
      'error',
      {
        code: 100,
        ignoreUrls: true,
      },
    ],
    'no-param-reassign': ['error', { props: false }],
    'no-plusplus': ['off'],
    'no-restricted-syntax': [
      'error',
      'ForInStatement',
      'LabeledStatement',
      'WithStatement',
    ],
    'no-underscore-dangle': [
      'error',
      {
        allowAfterThis: true,
      },
    ],
    'react/forbid-prop-types': ['off'],
    'react/require-default-props': ['off'],
    'react/require-extension': ['off'],
    'react/jsx-filename-extension': ['off'],
    'react/jsx-indent': ['error', 2],
    'react/jsx-indent-props': ['error', 2],
    'sort-imports-es6-autofix/sort-imports-es6': [
      'error',
      {
        ignoreCase: true,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
      },
    ],
  },
  settings: {
    'import/resolver': {
      node: {
        paths: [path.resolve(__dirname, './src')],
      },
    },
  },
  env: {
    browser: true,
    mocha: true,
    jquery: true,
    'jest/globals': true,
  },
  globals: {
    jest: true,
  },
};

module.exports = eslintConfig;
