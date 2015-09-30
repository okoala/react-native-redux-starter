var fs = require('fs')
var path = require('path')
var webpack = require('webpack')

var config = {

	debug: true,
	devtool: 'source-map',

	entry: {
		'index.ios': ['./src/app/index.js']
	},

	output: {
		path: path.resolve(__dirname, 'build'),
		filename: '[name].js'
	},

	module: {
		loaders: [{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel',
			query: {
				stage: 0,
				plugins: []
			}
		}]
	},

	plugins: []
}

// 如果是hot loader
if (process.env.HOT) {
  config.devtool = 'eval',
  config.entry['index.ios'].unshift('react-native-webpack-server/hot/entry'),
  config.entry['index.ios'].unshift('webpack/hot/only-dev-server'),
  config.entry['index.ios'].unshift('webpack-dev-server/client?http://localhost:8082')
  config.output.publicPath = 'http://localhost:8082/'
  config.plugins.unshift(new webpack.HotModuleReplacementPlugin())
  config.module.loaders[0].query.plugins.push('react-transform')
  config.module.loaders[0].query.extra = {
    'react-transform': [{
      target: 'react-transform-hmr',
      imports: ['react-native'],
      locals: ['module']
    }]
  }
}

if (process.env.NODE_NEV = 'production') {
  config.plugins.push(new webpack.optimize.OccurrenceOrderPlugin())
  config.plugins.push(new webpack.optimize.UglifyJsPlugin())
}

module.exports = config
