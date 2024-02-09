const NormalModuleReplacementPlugin = require('webpack/lib/NormalModuleReplacementPlugin');
// Work around for https://github.com/angular/angular-cli/issues/7200

var path = require('path');
var webpack = require('webpack');
var APP_NAME = 'uafine';

module.exports = {
  mode: 'production',
  entry: {
    server: './serverless.ts',
  },
  target: 'node',
  resolve: {extensions: ['.ts', '.js']},
  externals: [/(node_modules|main\..*\.js)/, {formidable: 'commonjs formidable',},],
  output: {
    libraryTarget: 'commonjs2',
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {test: /\.ts$/, loader: 'ts-loader'},
      {
        test: /\.(ts|js)$/,
        loader: 'regexp-replace-loader',
        query: {match: {pattern: '\\[(Mouse|Keyboard)Event\\]', flags: 'g'}, replaceWith: '[]',}
      },
      {
        test: /\.(woff|ttf|eot|svg)(\?v=[a-z0-9]\.[a-z0-9]\.[a-z0-9])?$/,
        loader: 'url-loader?limit=100000'
      },
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: "javascript/auto"
      }
    ]
  },
  optimization: {
    minimize: false
  },
  plugins: [
    new webpack.ContextReplacementPlugin(
      // fixes WARNING Critical dependency: the request of a dependency is an expression
      /(.+)?angular(\\|\/)core(.+)?/,
      path.join(__dirname, 'src'), // location of your src
      {} // a map of your routes
    ),
    new webpack.ContextReplacementPlugin(
      // fixes WARNING Critical dependency: the request of a dependency is an expression
      /(.+)?express(\\|\/)(.+)?/,
      path.join(__dirname, 'src'),
      {}
    ),
    new NormalModuleReplacementPlugin(
            /quill/,
           path.join(__dirname, './src/app/shared/servermocks/quillmodule.mock.ts'),
      {}

          )
  ]
};


