const path = require('path');

module.exports = {
  entry: {
    login: './production/static/production/js/login.js',
    index: './production/static/production/js/index.js',
    production: './production/static/production/js/production.js',
    request: './production/static/production/js/request.js',
    quality: './production/static/production/js/quality.js',
    dictionary: './production/static/production/js/dictionary.js',
    admin: './production/static/production/js/admin.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'production/static/production/js/dist'),
    clean: true,
  },
  mode: "production",
};