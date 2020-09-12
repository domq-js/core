import { getCompareFunction, filtered, unique, pluck, _find } from "../helper";
import { isString, isElement } from "../core/typechecking";
import v from "../core/vars";
import core, { fn } from "../setup";

fn.children     = function( comparator ) {
	return filtered( core( unique( pluck( this, ele => ele.children ) ) ), comparator );
};
fn.closest      = function( comparator ) {
	const filtered = this.filter( comparator );
	if( filtered.length ) {
		return filtered;
	}
	const $parent = this.parent();
	if( !$parent.length ) {
		return filtered;
	}
	return $parent.closest( comparator );
};
fn.contents     = function() {
	return core( unique( pluck( this, ele => ele.tagName === 'IFRAME' ? [ ele.contentDocument ] : ( ele.tagName === 'TEMPLATE' ? ele.content.childNodes : ele.childNodes ) ) ) );
};
fn.find         = function( selector ) {
	return core( unique( pluck( this, ele => _find( selector, ele ) ) ) );
};
fn.has          = function( selector ) {
	const comparator = isString( selector ) ? ( i, ele ) => find( selector, ele ).length : ( i, ele ) => ele.contains( selector );
	return this.filter( comparator );
};
fn.is           = function( comparator ) {
	const compare = getCompareFunction( comparator );
	return v.some.call( this, ( ele, i ) => compare.call( ele, i, ele ) );
};
fn.next         = function( comparator, _all, _until ) {
	return filtered( core( unique( pluck( this, 'nextElementSibling', _all, _until ) ) ), comparator );
};
fn.nextAll      = function( comparator ) {
	return this.next( comparator, true );
};
fn.nextUntil    = function( until, comparator ) {
	return this.next( comparator, true, until );
};
fn.not          = function( comparator ) {
	const compare = getCompareFunction( comparator );
	return this.filter( ( i, ele ) => ( !isString( comparator ) || isElement( ele ) ) && !compare.call( ele, i, ele ) );
};
fn.parent       = function( comparator ) {
	return filtered( core( unique( pluck( this, 'parentNode' ) ) ), comparator );
};
fn.parents      = function( comparator, _until ) {
	return filtered( core( unique( pluck( this, 'parentElement', true, _until ) ) ), comparator );
};
fn.parentsUntil = function( until, comparator ) {
	return this.parents( comparator, until );
};
fn.prev         = function( comparator, _all, _until ) {
	return filtered( core( unique( pluck( this, 'previousElementSibling', _all, _until ) ) ), comparator );
};
fn.prevAll      = function( comparator ) {
	return this.prev( comparator, true );
};
fn.prevUntil    = function( until, comparator ) {
	return this.prev( comparator, true, until );
};
fn.siblings     = function( comparator ) {
	return filtered( core( unique( pluck( this, ele => core( ele ).parent().children().not( ele ) ) ) ), comparator );
};
