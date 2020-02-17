const path = require('path');

const styleguideConfig = {
  require: [path.join(__dirname, 'src/app.css')],
  sections: [
    {
      name: 'Colors',
      content: 'docs/style-guide/colors.md',
    },
    {
      name: 'UI components',
      content: 'docs/style-guide/components.md',
      components: 'src/components/*.{js,jsx,ts,tsx}',
    },
  ],
  skipComponentsWithoutExample: true,
  theme: {
    color: {
      link: '#669fb8',
      linkHover: '#275f78',
    },
    fontFamily: {
      // eslint-disable-next-line max-len
      base:
        '"Avenir Next", Avenir, "DejaVu Sans", "Bitstream Vera Sans", Tahoma, Verdana, sans-serif',
    },
  },
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
        {
          test: /.css$/,
          exclude: /node_modules/,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
  },
};

module.exports = styleguideConfig;
