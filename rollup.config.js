import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { uglify } from 'rollup-plugin-uglify';

export default [
	{
		input: './src/wrap.js',
		output: {
			file: './dist/wpopv.js',
			format: 'umd',
			name: 'wpopv',
		},
		plugins: [
			babel( {
				exclude: 'node_modules/**'
			} ),
			resolve(),
			commonjs(),
		]
	},
	{
		input: './src/wrap.js',
		output: {
			file: './dist/wpopv.min.js',
			format: 'umd',
			name: 'wpopv',
		},
		plugins: [
			babel( {
				exclude: 'node_modules/**'
			} ),
			resolve(),
			commonjs(),
			uglify(),
		]
	}
];
