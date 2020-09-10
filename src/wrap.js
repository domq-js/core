import vars from './core/vars';
import coreClass from './core/core-class';
import stringHandler from "./string";
import utilities from "./utilities";
import each from "./core/each";
import extend from "./core/extend";
import unique from "./core/unique";

const fn   = coreClass.prototype,
	  core = fn.init;
core.fn    = core.prototype = fn;
core.guid  = 1;

// Ensuring a cash collection is iterable
if( typeof Symbol === 'function' ) {
	fn[ Symbol.iterator ] = vars.ArrayPrototype[ Symbol.iterator ];
}

/**
 * Dynamic Functions.
 */
fn.length = 0;
fn.splice = vars.splice;
fn.extend = function( plugins ) {
	return extend( fn, plugins );
};

/**
 * Static Functions
 */
core.camelCase = stringHandler.camelCase;
core.attempt   = utilities.attempt;
core.parseHTML = utilities.parseHTML;
core.each      = each;
core.extend    = extend;
core.unique    = unique;
export default core;
