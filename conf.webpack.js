var path = require('path');
var appConfig = require('./conf.app.js');

var conf = {
  entry: {
    app: './app.js'
  },
  externals: {
    'prop-types': 'PropTypes',
    'react': 'React',
    'react-dom': 'ReactDOM'
  },
  output: {
    //filename: 'lib.[name].js', // name the file under a namespace
    filename: '[name].js',
    library: ['lib', '[name]'], // expose exported item to window
    libraryTarget: 'umd',
    path: appConfig.paths.PUBLIC_JS,
    publicPath: '/public/js',
    umdNamedDefine: true
  },
  module: {
    loaders: [
      // pre-process `.styl` files with Stylus
      {
        test: /\.styl$/,
        loader: 'style-loader!css-loader!stylus-loader'
      },
      // transpile React components
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        include: [
          path.resolve(appConfig.paths.ROOT, './app.js'),
          appConfig.paths.SOURCE_JS
        ],
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
  resolve: {
    alias: {}
  }
};

// Add paths to webpack as alias'. This will allow us to `import` or `require` a
// path via a constant rather than having to use `../../etc/`.
for(var path in appConfig.paths){
  conf.resolve.alias[path] = appConfig.paths[path];
}

module.exports = conf;