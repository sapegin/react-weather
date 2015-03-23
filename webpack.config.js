'use strict';

var path = require('path');
var webpack = require('webpack');
var BowerWebpackPlugin = require('bower-webpack-plugin');
var bowerPath = path.join(__dirname, 'bower_components');
var nodePath = path.join(__dirname, 'node_modules');

var isDevelopment = process.env.NODE_ENV !== 'production';

var plugins = [
	new BowerWebpackPlugin(),
	new webpack.ProvidePlugin({
		React: 'react'
	}),
	new webpack.DefinePlugin({
		DEBUG: isDevelopment
	})
];

if (!isDevelopment) {
	plugins.push(new webpack.optimize.UglifyJsPlugin({
		compress: {
			warnings: false
		},
		output: {
			comments: false
		}
	}));
}

module.exports = {
	debug: isDevelopment,
	cache: isDevelopment,
	devtool: isDevelopment ? 'eval' : false,
	watch: false,
	entry: './app/app.js',
	stats: {
		colors: true,
		reasons: isDevelopment
	},
	resolve: {
		root: [bowerPath]
	},
	resolveLoader: {
		root: [nodePath]
	},
	plugins: plugins,
	output: {
		path: path.join(__dirname, 'build/'),
		filename: 'bundle.js'
	},
	module: {
		noParse: [
			/\.min\.js/,
			bowerPath
		],
		preLoaders: [
			{
				test: /\.js$/,
				exclude: [bowerPath, nodePath],
				loader: 'eslint-loader'
			}
		],
		loaders: [
			{
				test: /\.js$/,
				exclude: bowerPath,
				loader: 'babel-loader'
			}
		]
	}
};
