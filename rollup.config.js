import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import { uglify } from 'rollup-plugin-uglify';
import filesize from 'rollup-plugin-filesize';
import visualizer from 'rollup-plugin-visualizer';
import json from "@rollup/plugin-json";
import replace from "@rollup/plugin-replace";
import pkg from "./package.json";

const shortname    = 'wpopv';
const version      = pkg.version,
	  replaceVals  = {
		  '__VERSION__': version,
		  '__SHORTNAME__': shortname,
	  };
const distLocation = './dist/',
	  outputName   = 'wpopv';


export default {
	input: './src/wrap.js',
	output: [
		{
			file: `${distLocation}${outputName}.umd.js`,
			format: 'umd',
			name: shortname
		},
		{
			file: `${distLocation}${outputName}.umd.min.js`,
			format: 'umd',
			name: shortname,
			plugins: [
				uglify( { mangle: true } ),
			]
		}
	],
	plugins: [
		resolve(),
		replace( replaceVals ),
		json(),
		babel(),
		filesize(),
		visualizer()
	]
};
