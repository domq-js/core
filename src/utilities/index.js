import core from '../core';
import arrayLike from "./array/arrayLike";
import flatten from "./array/flatten";
import isPlainObject from "./array/isPlainObject";
import each from "./loops/each";
import _each from "./loops/_each";

/**
 * Resuable Methods
 * @type {function(...[*]=)}
 */
core.fn.each = each;
core.fn._each = _each;

/**
 * Static Methods.
 * @type {function(...[*]=)}
 */
core.arrayLike = arrayLike;
core.flatten       = flatten;
core.isPlainObject = isPlainObject;

/**
 * Validates if Given Object is a WPOPV
 * @param instance
 * @return {string|(function(*=, *=): "default")}
 */
core.is_wpopv = function( instance ) {
	return ( typeof instance !== 'undefined' && typeof instance !== 'string' && instance.wpopv );
};

/**
 * Validates if Given Object is a jQuery Instance.
 * @param instance
 * @return {*}
 */
core.is_jquery = function( instance ) {
	return ( typeof instance !== 'undefined' && typeof instance !== 'string' && instance.jQuery );
};


/**
 * It can parse Given HTML.
 * @param str
 * @return {HTMLCollection}
 */
core.parseHTML = function( str ) {
	var tmp            = document.implementation.createHTMLDocument();
	tmp.body.innerHTML = str;
	return tmp.body.children;
};
