const path = require('path');

const styleguideConfig = {
  webpackConfig: {
    resolve: {
      alias: {
        lib: path.resolve(__dirname, 'src/lib'),
      },
    },
    module: {
      rules: [
        {
          test: /.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
      ],
    },
  },
};

module.exports = styleguideConfig;
