const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const webpack = require('webpack');

module.exports = {
	mode: 'development',
	target: 'web',
	entry: './src/index.ts',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle-[hash].js',
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js'],
		fallback: {
			path: false,
			assert: require.resolve('assert/'),
			fs: false,
		},
	},
	devServer: {
		static: 'dist',
		compress: true,
		port: 3000,
		historyApiFallback: true,
		watch: true,
		hot: true,
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: 'ts-loader',
				exclude: /(node_modules)/,
			},
			{
				test: /\.(sa|sc|c)ss$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {},
					},
					'css-loader',
					'sass-loader',
				],
			},
			{
				test: /\.(svg|woff|woff2|ttf|eot|otf)([\\?]?.*)$/,
				use: [
					{
						loader: 'file-loader?name=assets/fonts/[name].[ext]',
					},
				],
			},
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
			},
		],
	},
	plugins: [
		new Dotenv(),
		new webpack.ProvidePlugin({
			process: 'process/browser',
		}),
		new webpack.ContextReplacementPlugin(/pug-filters/),
		new CleanWebpackPlugin(),
		new CopyWebpackPlugin({
			patterns: [
				{
					from: '**/*',
					context: path.resolve(__dirname, 'src', 'assets'),
					to: './assets',
				},
			],
		}),
		new HtmlWebpackPlugin({
			template: 'src/index.html',
			filename: 'index.html',
			minify: {
				collapseWhitespace: true,
				removeComments: true,
				removeRedundantAttributes: true,
				useShortDoctype: true,
			},
		}),
		new MiniCssExtractPlugin({
			filename: 'style-[hash].css',
		}),
	],
};
