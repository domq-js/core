import "./polyfill";
import core, { fn } from './setup';
import extend from "./core/extend";
import _each from "./core/_each";
import "./config.js";
import "./hooks.js";
import "./animation/index";
import "./attributes/index";
import "./collection/index";
import './css/index';
import './data/index';
import "./dimensions/index";
import "./effects/index";
import "./events/index";
import "./forms/index";
import "./manipulation/index";
import "./offset/index";
import "./traversal/index";
import "./string/index";
import "./typechecking/index";
import "./utilities/index";
import { setupExtraEventsFunctions } from "./helper";
import isFunction from "./typechecking/isFunction";
import { _Arrayprop, _splice } from "@varunsridharan/js-vars";

// Ensuring a cash collection is iterable
if( isFunction( Symbol ) ) {
	fn[ Symbol.iterator ] = _Arrayprop[ Symbol.iterator ];
}

/**
 * Dynamic Functions.
 */
fn.version = '__VERSION__';
fn.uid    = '__SHORTNAME__' + Math.random();
fn.extend = plugins => extend( fn, plugins );
fn.splice = _splice;

/**
 * Static Functions
 */
core.each = _each;
core.extend = extend;

setupExtraEventsFunctions();
export default core;
