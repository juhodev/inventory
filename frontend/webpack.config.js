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
					'postcss-loader',
				],
			},
			{
				test: /\.css$/,
				use: ['css-loader'],
			},
		],
	},
	devServer: {
		contentBase: path.join(__dirname, './dist'),
		compress: true,
		historyApiFallback: true,
		host: '0.0.0.0',
		port: 8888,
	},

	devtool: 'cheap-module-source-map',
};
