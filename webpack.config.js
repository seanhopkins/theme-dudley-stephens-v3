const path = require('path');

module.exports = (env) => {
  // fallback to development data
  let webpackData = {
    mode: 'development',
    entry: {
      'checkout-custom': './src/checkout-custom/index.js',
    },
    watch: true,
    output: {
      path: path.resolve(__dirname, 'assets'),
      filename: '[name].js',
    },
  };

  if (env.production) {
    webpackData = {
      ...webpackData,
      mode: 'production',
      watch: false,
      output: {
        filename: '[name].min.js',
      },
    };
  }

  return webpackData;
};
