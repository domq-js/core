import v from './core/vars';
import core, { fn } from './setup';
import extend from "./core/extend";
import _each from "./core/_each";

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
core.each = _each;
core.extend = extend;

export default core;
