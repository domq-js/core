import "./polyfill";
import core, { fn } from './setup';
import extend from "./core/extend";
import _each from "./core/_each";
import "./config.js";
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
import _ArrayPrototype from "./core/vars/_ArrayPrototype";
import _splice from "./core/vars/_splice";
import { setupExtraEventsFunctions } from "./helper";

// Ensuring a cash collection is iterable
if( typeof Symbol === 'function' ) {
	fn[ Symbol.iterator ] = _ArrayPrototype[ Symbol.iterator ];
}

/**
 * Dynamic Functions.
 */
fn.extend = ( plugins ) => extend( fn, plugins );
fn.splice = _splice;

/**
 * Static Functions
 */
core.each = _each;
core.extend = extend;

setupExtraEventsFunctions();
export default core;
