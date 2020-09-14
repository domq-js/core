import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import { uglify } from 'rollup-plugin-uglify';
import filesize from 'rollup-plugin-filesize';
import visualizer from 'rollup-plugin-visualizer';


export default {
	input: './src/wrap.js',
	output: [
		{
			file: './dist/wpopv.js',
			format: 'umd',
			name: 'wpopv',
		},
		{
			file: './dist/wpopv.min.js',
			format: 'umd',
			name: 'wpopv',
			plugins: [
				uglify( {
					mangle: true,
					output: {
						braces: false,
					}
				} ),
			]
		}
	],
	plugins: [
		babel( {
			exclude: 'node_modules/**'
		} ),
		resolve(),
		filesize(),
		visualizer()
	]
};
