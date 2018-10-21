//tslint:disable

const withTypescript = require('@zeit/next-typescript');
const withSass = require('@zeit/next-sass');
const path = require('path');

module.exports = withTypescript(
  withSass({
    webpack(config, options) {
      // Further custom configuration here
      config.resolve.alias = {
        models: path.resolve(__dirname, './src/models'),
        components: path.resolve(__dirname, './src/components'),
        services: path.resolve(__dirname, './src/services')
      };
      return config;
    }
  })
);
