/**
 * Rollup Core
 */
import nodeResolve from '@rollup/plugin-node-resolve';

/**
 * ES6 To ES5
 */
import babel from '@rollup/plugin-babel';

/**
 * Minify
 */
import { terser } from "rollup-plugin-terser";
import compiler from '@ampproject/rollup-plugin-closure-compiler';

/**
 * Utility
 */
import license from 'rollup-plugin-license';
import filesize from 'rollup-plugin-filesize';
import visualizer from 'rollup-plugin-visualizer';
import json from '@rollup/plugin-json';
import replace from "@rollup/plugin-replace";

/**
 * Package.JSON
 */
import pkg from "./package.json";

const _name = 'wpopv';
const input = './src/index.js';
const files = [
	{ input: input, format: 'es' },
	{ input: input, format: 'umd' },
	{ input: input, format: 'umd', minify: true },
];


const config = files.map( ( { input, format, minify } ) => {
	return {
		input: input,
		output: {
			file: `./dist/${_name}.${format}${minify ? '.min' : ''}.js`,
			format: format,
			name: _name,
			sourcemap: true,
		},
		plugins: [
			replace( { '__SHORTNAME__': _name } ),
			nodeResolve(),
			json(),
			babel( { babelHelpers: 'bundled' } ),
			minify && compiler(),
			minify && terser( {
				output: {
					beautify: false,
					quote_style: 1,
				},
				mangle: true
			} ),
			license( {
				banner: `${pkg.name} v${pkg.version} | <%= moment().format('DD-MM-YYYY') %> - MIT License`
			} ),
			filesize(),
			visualizer( {
				sourcemap: true,
				filename: `stats/${format}${minify ? '.min' : ''}.html`,
			} )
		].filter( Boolean )
	};
} ).flat();

export default config;
