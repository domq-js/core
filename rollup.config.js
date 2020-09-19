import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { uglify } from 'rollup-plugin-uglify';
import filesize from 'rollup-plugin-filesize';
import visualizer from 'rollup-plugin-visualizer';
import json from "@rollup/plugin-json";

export default {
	input: './src/wrap.js',
	output: [
		{
			file: './dist/wpopv.umd.js',
			format: 'umd',
			name: 'wpopv',
		},
		{
			file: './dist/wpopv.umd.min.js',
			format: 'umd',
			name: 'wpopv',
			plugins: [
				uglify( { mangle: true } ),
			]
		},
		{
			file: './dist/wpopv.ems.js',
			format: 'es',
		}
	],
	plugins: [
		json(),
		babel( {
			exclude: 'node_modules/**'
		} ),
		resolve(),
		commonjs(),
		filesize(),
		visualizer()
	]
};
