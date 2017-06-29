var path = require('path');

var _ROOT = path.resolve(__dirname);

module.exports = {
  paths: {
    COMPONENTS: path.resolve(_ROOT, './dev'),
    PUBLIC_JS: path.resolve(_ROOT, './public/js'),
    ROOT: _ROOT,
    SOURCE_JS: path.resolve(_ROOT, './dev')
  }
};
