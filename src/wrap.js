import v from './core/vars';
import core from './setup';
import stringHandler from "./string/index";
import { attempt, parseHTML } from "./utilities/index";
import { unique, _each, extend } from "./helper";
import { attr, removeAttr, prop, removeProp, addClass, hasClass, removeClass, toggleClass } from "./attributes/index";
import css from './css/index';
import data from './data/index';
import { innerWidth, innerHeight, outerWidth, outerHeight, width, height } from "./dimensions/index";
import { hide, show, toggle, fadeOut, fadeIn } from "./effects/index";
import { off, on, one, ready, trigger } from "./events/index";
import { serialize, serializeObject, serializeArray, val } from "./forms/index";
import { offset, offsetParent, position } from "./offset/index";
import { add, each, eq, filter, first, last, get, index, map, slice } from "./collection/index";
import {
	children,
	closest,
	contents,
	find,
	has,
	is,
	next,
	nextAll,
	nextUntil,
	not,
	parent,
	parents,
	parentsUntil,
	prev,
	prevAll,
	prevUntil,
	siblings
} from "./traversal/index";
import {
	after,
	append,
	appendTo,
	before,
	clone,
	detach,
	empty,
	html,
	insertAfter,
	insertBefore,
	prepend,
	prependTo,
	remove,
	replaceAll,
	replaceWith,
	text,
	unwrap,
	wrap,
	wrapAll,
	wrapInner
} from "./manipulation/index";

const fn = core.fn;

// Ensuring a cash collection is iterable
if( typeof Symbol === 'function' ) {
	fn[ Symbol.iterator ] = v.ArrayProp[ Symbol.iterator ];
}

/**
 * Dynamic Functions.
 */
fn.length = 0;
fn.splice          = v.splice;
fn.extend          = function( plugins ) {
	return extend( fn, plugins );
};
fn.attr            = attr;
fn.removeAttr      = removeAttr;
fn.prop            = prop;
fn.removeProp      = removeProp;
fn.addClass        = addClass;
fn.hasClass        = hasClass;
fn.removeClass     = removeClass;
fn.toggleClass     = toggleClass;
fn.css             = css;
fn.data            = data;
fn.innerWidth      = innerWidth;
fn.innerHeight     = innerHeight;
fn.outerWidth      = outerWidth;
fn.outerHeight     = outerHeight;
fn.height          = height;
fn.width           = width;
fn.hide            = hide;
fn.show            = show;
fn.toggle          = toggle;
fn.fadeOut         = fadeOut;
fn.fadeIn          = fadeIn;
fn.off             = off;
fn.on              = on;
fn.one             = one;
fn.ready           = ready;
fn.trigger         = trigger;
fn.serialize       = serialize;
fn.serializeArray  = serializeArray;
fn.serializeObject = serializeObject;
fn.val             = val;
fn.offset          = offset;
fn.offsetParent    = offsetParent;
fn.position        = position;
fn.add             = add;
fn.each            = each;
fn.eq              = eq;
fn.filter          = filter;
fn.first           = first;
fn.last            = last;
fn.get             = get;
fn.index           = index;
fn.map             = map;
fn.slice           = slice;
fn.children        = children;
fn.closest         = closest;
fn.contents        = contents;
fn.find            = find;
fn.has             = has;
fn.is              = is;
fn.next            = next;
fn.nextAll         = nextAll;
fn.nextUntil       = nextUntil;
fn.not             = not;
fn.parent          = parent;
fn.parents         = parents;
fn.parentsUntil    = parentsUntil;
fn.prev            = prev;
fn.prevAll         = prevAll;
fn.prevUntil       = prevUntil;
fn.siblings        = siblings;
fn.after           = after;
fn.append          = append;
fn.appendTo        = appendTo;
fn.before          = before;
fn.clone           = clone;
fn.detach          = detach;
fn.empty           = empty;
fn.html            = html;
fn.insertAfter     = insertAfter;
fn.insertBefore    = insertBefore;
fn.prepend         = prepend;
fn.prependTo       = prependTo;
fn.remove          = remove;
fn.replaceAll      = replaceAll;
fn.replaceWith     = replaceWith;
fn.text            = text;
fn.unwrap          = unwrap;
fn.wrap            = wrap;
fn.wrapAll         = wrapAll;
fn.wrapInner       = wrapInner;

/**
 * Static Functions
 */
core.camelCase = stringHandler.camelCase;
core.attempt   = attempt;
core.parseHTML = parseHTML;
core.each      = _each;
core.extend    = extend;
core.unique    = unique;
export default core;
