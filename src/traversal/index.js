import filtered from "../core/filtered";
import unique from "../core/unique";
import pluck from "../core/pluck";
import find from "../core/find";
import typechecking from "../core/typechecking";
import getCompareFunction from "../core/get_compare_function";
import vars from "../core/vars";
import core from "../wrap";

const traversal = {};

traversal.children     = function( comparator ) {
	return filtered( core( unique( pluck( this, ele => ele.children ) ) ), comparator );
};
traversal.closest      = function( comparator ) {
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
traversal.contents     = function() {
	return core( unique( pluck( this, ele => ele.tagName === 'IFRAME' ? [ ele.contentDocument ] : ( ele.tagName === 'TEMPLATE' ? ele.content.childNodes : ele.childNodes ) ) ) );
};
traversal.find         = function( selector ) {
	return core( unique( pluck( this, ele => find( selector, ele ) ) ) );
};
traversal.has          = function( selector ) {
	const comparator = typechecking.isString( selector ) ? ( i, ele ) => find( selector, ele ).length : ( i, ele ) => ele.contains( selector );
	return this.filter( comparator );
};
traversal.is           = function( comparator ) {
	const compare = getCompareFunction( comparator );
	return vars.some.call( this, ( ele, i ) => compare.call( ele, i, ele ) );
};
traversal.next         = function( comparator, _all, _until ) {
	return filtered( core( unique( pluck( this, 'nextElementSibling', _all, _until ) ) ), comparator );
};
traversal.nextAll      = function( comparator ) {
	return this.next( comparator, true );
};
traversal.nextUntil    = function( until, comparator ) {
	return this.next( comparator, true, until );
};
traversal.not          = function( comparator ) {
	const compare = getCompareFunction( comparator );
	return this.filter( ( i, ele ) => ( !typechecking.isString( comparator ) || typechecking.isElement( ele ) ) && !compare.call( ele, i, ele ) );
};
traversal.parent       = function( comparator ) {
	return filtered( core( unique( pluck( this, 'parentNode' ) ) ), comparator );
};
traversal.parents      = function( comparator, _until ) {
	return filtered( core( unique( pluck( this, 'parentElement', true, _until ) ) ), comparator );
};
traversal.parentsUntil = function( until, comparator ) {
	return this.parents( comparator, until );
};
traversal.prev         = function( comparator, _all, _until ) {
	return filtered( core( unique( pluck( this, 'previousElementSibling', _all, _until ) ) ), comparator );
};
traversal.prevAll      = function( comparator ) {
	return this.prev( comparator, true );
};
traversal.prevUntil    = function( until, comparator ) {
	return this.prev( comparator, true, until );
};
traversal.siblings     = function( comparator ) {
	return filtered( core( unique( pluck( this, ele => core( ele ).parent().children().not( ele ) ) ) ), comparator );
};
export default traversal;
