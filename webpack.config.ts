// @ts-ignore
const path = require("path")
const webpack = require("webpack")

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");

const prod = process.env.NODE_ENV === 'production';

module.exports = {
	mode: prod ? 'production' : 'development',

	entry: {
		index : ['./src/index.tsx'],
		react : ["react", "react-dom"],
	},

	resolve: {
		extensions: ['.js', '.jsx', '.ts', '.tsx'],
	},

	module: {
		rules: [
			{
				test: /\.tsx?$/,
				exclude : /node_modules/,
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
		path: path.join(__dirname, 'build'),
		filename: '[name].bundle.js',
	},

	plugins: [
		new webpack.ProvidePlugin({
			React: 'react',
		}),
		new HtmlWebpackPlugin({
			template: './public/index.html',
		}),
		new webpack.HotModuleReplacementPlugin(),
		new CompressionPlugin(),
	],
	devServer: {
		contentBase: path.join(__dirname, "build"),
		historyApiFallback: true,
		inline: true,
		port: 3001,
		hot: true,
		publicPath: '/',
	},
	optimization : {
		runtimeChunk: {
			//추가 부분
			name: "runtime"
		},
		splitChunks : {
			chunks : 'all',
		}
	}
};
