const path = require('path');
const webpack = require('webpack');
const basePlugins = [
  new webpack.DefinePlugin({
    __DEV__: process.env.NODE_ENV !== 'production',
    __PRODUCTION__: process.env.NODE_ENV === 'production',
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
  }),
];

const devPlugins = [
  new webpack.NoErrorsPlugin(),
];

const prodPlugins = [
  new webpack.optimize.OccurenceOrderPlugin(),
];

const plugins = basePlugins
  .concat(process.env.NODE_ENV === 'production' ? prodPlugins : [])
  .concat(process.env.NODE_ENV === 'development' ? devPlugins : []);

module.exports = {
  entry: {
    lib: ['./lib/index.js'],
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/',
    sourceMapFilename: '[name].js.map',
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  module: {
    preLoaders: [
      { test: /\.(jsx?)$$/, loader: 'source-map-loader' },
      { test: /\.(jsx?)$$/, loader: 'eslint-loader' },
    ],
    loaders: [
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.(jsx?)$/, loaders: ['react-hot', 'babel'], exclude: /node_modules/ },
    ],
  },
  plugins,
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  externals: {
    react: 'react',
    'react-dom': 'react-dom',
  },
  devtool: 'source-map',
  node: {
    global: false,
  },
};
