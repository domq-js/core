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

const _name           = 'domq';
const input_bundled   = './src/export/bundled.js';
const input_standlone = './src/export/standlone.js';
const files           = [
	{ input: input_bundled, format: 'es', minify: false, type: 'bundled' },
	{ input: input_bundled, format: 'umd', minify: false, type: 'bundled' },
	{ input: input_bundled, format: 'umd', minify: true, type: 'bundled' },
	{ input: input_standlone, format: 'es', minify: false, type: 'standalone' },
	{ input: input_standlone, format: 'umd', minify: false, type: 'standalone' },
	{ input: input_standlone, format: 'umd', minify: true, type: 'standalone' },
];


const config = files.map( ( { input, format, minify, type } ) => {
	return {
		input: input,
		output: {
			file: `./dist/${_name}.${type}.${format}${minify ? '.min' : ''}.js`,
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
				filename: `stats/${type}.${format}${minify ? '.min' : ''}.html`,
			} )
		].filter( Boolean )
	};
} ).flat();

export default config;
