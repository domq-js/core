import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { uglify } from 'rollup-plugin-uglify';
import filesize from 'rollup-plugin-filesize';
import visualizer from 'rollup-plugin-visualizer';

export default [
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
			uglify( {
				mangle: true,
				output:{
					braces:false,
				}
			} ),
			filesize()
		]
	},
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
			filesize(),
			visualizer()
		]
	},
];
