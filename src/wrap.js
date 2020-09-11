import vars from './core/vars';
import core from './setup';
import stringHandler from "./string/index";
import utilities from "./utilities/index";
import { unique, each, extend } from "./helper";
import attr from "./attributes/index";
import css from './css/index';
import data from './data/index';
import dimensions from "./dimensions/index";
import effects from "./effects/index";
import events from "./events/index";
import forms from "./forms/index";
import offset from "./offset/index";
import collection from "./collection/index";
import traversal from "./traversal/index";

const fn = core.fn;

// Ensuring a cash collection is iterable
if( typeof Symbol === 'function' ) {
	fn[ Symbol.iterator ] = vars.ArrayPrototype[ Symbol.iterator ];
}

/**
 * Dynamic Functions.
 */
fn.length = 0;
fn.each         = function( callback ) {
	return each( this, callback );
};
fn.splice       = vars.splice;
fn.extend       = function( plugins ) {
	return extend( fn, plugins );
};
fn.attr         = attr.attr;
fn.removeAttr   = attr.removeAttr;
fn.prop         = attr.prop;
fn.removeProp   = attr.removeProp;
fn.addClass     = attr.addClass;
fn.hasClass     = attr.hasClass;
fn.removeClass  = attr.removeClass;
fn.toggleClass  = attr.toggleClass;
fn.css          = css;
fn.data         = data;
fn.innerWidth   = dimensions.innerWidth;
fn.innerHeight  = dimensions.innerHeight;
fn.outerWidth   = dimensions.outerWidth;
fn.outerHeight  = dimensions.outerHeight;
fn.height       = dimensions.height;
fn.width        = dimensions.width;
fn.hide         = effects.hide;
fn.show         = effects.show;
fn.toggle       = effects.toggle;
fn.off          = events.off;
fn.on           = events.on;
fn.one          = events.one;
fn.ready        = events.ready;
fn.trigger      = events.trigger;
fn.serialize    = forms.serialize;
fn.val          = forms.val;
fn.offset       = offset.offset;
fn.offsetParent = offset.offsetParent;
fn.position     = offset.position;
fn.add          = collection.add;
fn.each         = collection.each;
fn.eq           = collection.eq;
fn.filter       = collection.filter;
fn.first        = collection.first;
fn.last         = collection.last;
fn.get          = collection.get;
fn.index        = collection.index;
fn.map          = collection.map;
fn.slice        = collection.slice;
fn.children     = traversal.children;
fn.closest      = traversal.closest;
fn.contents     = traversal.contents;
fn.find         = traversal.find;
fn.has          = traversal.has;
fn.is           = traversal.is;
fn.next         = traversal.next;
fn.nextAll      = traversal.nextAll;
fn.nextUntil    = traversal.nextUntil;
fn.not          = traversal.not;
fn.parent       = traversal.parent;
fn.parents      = traversal.parents;
fn.parentsUntil = traversal.parentsUntil;
fn.prev         = traversal.prev;
fn.prevAll      = traversal.prevAll;
fn.prevUntil    = traversal.prevUntil;
fn.siblings     = traversal.siblings;

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
