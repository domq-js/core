import v from './core/vars';
import core, { fn } from './setup';
import { camelCase } from "./string/index";
import { attempt, parseHTML } from "./utilities/index";
import { unique, _each, extend } from "./helper";
import './css/index';
import './data/index';
import "./attributes/index";
import "./dimensions/index";
import "./effects/index";
import "./events/index";
import "./forms/index";
import "./offset/index";
import "./collection/index";
import "./traversal/index";
import "./manipulation/index";

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
