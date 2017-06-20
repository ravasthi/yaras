var path = require('path');

var eslintConfig = {
  parser: 'babel-eslint',
  extends: 'airbnb',
  plugins: [
    'babel',
    'import',
    'react',
    'sort-imports-es6'
  ],
  rules: {
    'class-methods-use-this': ['error'],
    'comma-dangle': ['error', {
      'arrays': 'always-multiline',
      'objects': 'always-multiline',
      'imports': 'always-multiline',
      'exports': 'always-multiline',
      'functions': 'ignore'
    }],
    'generator-star-spacing': ['error', 'before'],
    'import/extensions': ['off'],
    'import/first': ['error', null],
    'indent': ['error', 2],
    'max-len': ['error', {
      'code': 100,
      'ignoreUrls': true
    }],
    'no-param-reassign': ['error', { 'props': false }],
    'no-plusplus': ['off'],
    'no-restricted-syntax': [
      'error',
      'ForInStatement',
      'LabeledStatement',
      'WithStatement'
    ],
    'no-underscore-dangle': ['error', {
      'allowAfterThis': true
    }],
    'react/forbid-prop-types': ['off'],
    'react/require-default-props': ['off'],
    'react/require-extension': ['off'],
    'react/jsx-filename-extension': ['off'],
    'react/jsx-indent': ['error', 2],
    'react/jsx-indent-props': ['error', 2],
    'sort-imports-es6/sort-imports-es6': ['error', {
      'ignoreCase': true,
      'ignoreMemberSort': false,
      'memberSyntaxSortOrder': ['none', 'all', 'multiple', 'single']
    }]
  },
  settings: {
    'import/resolver': {
      node: {
        paths: [
          path.resolve(__dirname, './src')
        ]
      }
    }
  },
  env: {
    browser: true,
    mocha: true,
    jquery: true
  },
  globals: {
    chai: true,
    sinon: true
  }
};

module.exports = eslintConfig;
