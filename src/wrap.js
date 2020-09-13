import v from './core/vars';

import core, { fn } from './setup';
import { unique } from "./helper";

import "./attributes/index";
import "./collection/index";
import extend from "./core/extend";
import _each from "./core/_each";
import './css/index';
import './data/index';
import "./dimensions/index";
import "./effects/index";
import "./events/index";
import "./forms/index";
import "./manipulation/index";
import "./offset/index";
import "./traversal/index";
import attempt from "./utilities/attempt";
import parseHTML from "./utilities/parseHTML";
import camelCase from "./string/camelCase";

// Ensuring a cash collection is iterable
if( typeof Symbol === 'function' ) {
	fn[ Symbol.iterator ] = v.ArrayProp[ Symbol.iterator ];
}

/**
 * Dynamic Functions.
 */
fn.extend = ( plugins ) => extend( fn, plugins );
fn.splice = v.splice;

/**
 * Static Functions
 */
core.camelCase = camelCase;
core.attempt   = attempt;
core.parseHTML = parseHTML;
core.each      = _each;
core.extend    = extend;
core.unique    = unique;

export default core;
