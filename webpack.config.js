const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");


/*
 * SplitChunksPlugin is enabled by default and replaced
 * deprecated CommonsChunkPlugin. It automatically identifies modules which
 * should be splitted of chunk by heuristics using module duplication count and
 * module category (i. e. node_modules). And splits the chunks…
 *
 * It is safe to remove "splitChunks" from the generated configuration
 * and was added as an educational example.
 *
 * https://webpack.js.org/plugins/split-chunks-plugin/
 *
 */

//const HtmlWebpackPlugin = require('html-webpack-plugin');

/*
 * We've enabled HtmlWebpackPlugin for you! This generates a html
 * page for you when you compile webpack, which will make you start
 * developing and prototyping faster.
 *
 * https://github.com/jantimon/html-webpack-plugin
 *
 */
console.log(process.env.NODE_ENV);
const getPlugins =()=>{
	return  process.env.NODE_ENV=="production"?
	[]:[]
	//[new webpack.ProgressPlugin(), new HtmlWebpackPlugin()]
};

console.log(getPlugins());
module.exports = {
	mode: 'development',

	entry: {
		index: './src/index.ts'
	},

	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist'),
		libraryTarget:"umd",
		library:"shinfileinput"
	},

	plugins: getPlugins(),

	module: {
		rules: [
			{
				test: /.(ts|tsx)?$/,
				use:[
					{
					loader: 'babel-loader',
				  },
				  {
					loader: 'ts-loader'
				  }
				],
				include: [path.resolve(__dirname, 'src')],
				exclude: [/node_modules/]
			}
		]
	},

	optimization: {
		splitChunks: {
			cacheGroups: {
				vendors: {
					priority: -10,
					test: /[\\/]node_modules[\\/]/
				}
			},

			chunks: 'async',
			minChunks: 1,
			minSize: 30000,
			name: true
		},
		minimize:true,
		minimizer: [new TerserPlugin({ sourceMap: true })],
	},
	devServer: {
		open: true
	},

	resolve: {
		extensions: ['.tsx', '.ts', '.js']
	}
};
