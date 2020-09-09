module.exports = {
	files: {
		// Single Compile Options
		'./src/index.js': {
			dist: './dist/',
			webpack: 'webpack_prod',
			rename: 'wponion-pickledvanilla.js',
			watch: [ './src/*.js', './src/*/*.js', './src/*/*/*.js', './src/*/*/*/*.js' ]
		},
	},
	config: {
		webpack_prod: {
			mode: 'development',//'production',
			target: 'web',
			externals: { jquery: 'jQuery' },
			output: {
				filename: '[name].js',
				pathinfo: false
			},
			module: {
				rules: [
					{
						test: /\.js$/,
						loader: 'babel-loader',
						options: { presets: [ '@babel/env' ] }
					}
				]
			},
			devtool: 'none',
		},
	}
};
