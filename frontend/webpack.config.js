const path = require('path');

module.exports = {
	entry: './src/index.tsx',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist'),
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.json'],
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: 'awesome-typescript-loader',
			},
			{
				test: /\.scss$/,
				use: [
					'style-loader',
					'css-loader',
					'sass-loader',
					'postcss-loader'
				],
			},
		],
	},
	devServer: {
		contentBase: path.join(__dirname, './dist'),
		compress: true,
		historyApiFallback: true,
		port: 8888,
	},

	devtool: 'cheap-module-source-map',
};
