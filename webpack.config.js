const path = require('path');

module.exports = {
  mode: 'development',
  entry: './index.js',
  node: {
    fs: "empty"
  },
  output: {
    path: path.resolve(__dirname, 'extension'),
    filename: 'content_script.js'
  }
};