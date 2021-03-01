// @ts-ignore
const path = require("path")
const webpack = require("webpack")

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

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
		filename: '[name].[chunkhash].js',
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
		new CleanWebpackPlugin(),
		new BundleAnalyzerPlugin({
			analyzerMode: "static",               // 분석결과를 파일로 저장
			reportFilename: "docs/size_dev.html", // 분설결과 파일을 저장할 경로와 파일명 지정
			defaultSizes: "parsed",
			openAnalyzer: false,                   // 웹팩 빌드 후 보고서파일을 자동으로 열지 여부
			generateStatsFile: true,              // 웹팩 stats.json 파일 자동생성
			statsFilename: "docs/stats_dev.json", // stats.json 파일명 rename
		})
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
			name: "runtime"
		},
		splitChunks : {
			chunks : 'all',
		}
	}
};
