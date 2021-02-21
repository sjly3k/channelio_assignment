// @ts-ignore
const path = require("path")
const webpack = require("webpack")

const HtmlWebpackPlugin = require('html-webpack-plugin');

const prod = process.env.NODE_ENV === 'production';

module.exports = {
	mode: prod ? 'production' : 'development',
	devtool: prod ? 'hidden-source-map' : 'eval',

	entry: './src/index.tsx',

	resolve: {
		extensions: ['.js', '.jsx', '.ts', '.tsx'],
	},

	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: ['babel-loader', 'ts-loader'],
			},
			{
				test: /\.css$/,
				oneOf: [
					{
						include: path.resolve(__dirname, "src"),
						use: [
							"style-loader",
							{ loader: "css-loader", options: { modules: true } }
						]
					},
					{
						use: [
							"style-loader",
							"css-loader"
						]
					}
				]
			}
		],
	},

	output: {
		path: path.join(__dirname, '/dist'),
		filename: 'bundle.js',
	},

	plugins: [
		new webpack.ProvidePlugin({
			React: 'react',
		}),
		new HtmlWebpackPlugin({
			template: './src/index.html',
		}),
		new webpack.HotModuleReplacementPlugin(),
	],
	devServer: {
		historyApiFallback: true,
		inline: true,
		port: 3001,
		hot: true,
		publicPath: '/',
	},

};
