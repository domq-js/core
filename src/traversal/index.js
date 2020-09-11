import { getCompareFunction, filtered, unique, pluck, _find } from "../helper";
import { isString, isElement } from "../core/typechecking";
import v from "../core/vars";
import core from "../global-var";

export function children( comparator ) {
	return filtered( core( unique( pluck( this, ele => ele.children ) ) ), comparator );
}

export function closest( comparator ) {
	const filtered = this.filter( comparator );
	if( filtered.length ) {
		return filtered;
	}
	const $parent = this.parent();
	if( !$parent.length ) {
		return filtered;
	}
	return $parent.closest( comparator );
}

export function contents() {
	return core( unique( pluck( this, ele => ele.tagName === 'IFRAME' ? [ ele.contentDocument ] : ( ele.tagName === 'TEMPLATE' ? ele.content.childNodes : ele.childNodes ) ) ) );
}

export function find( selector ) {
	return core( unique( pluck( this, ele => _find( selector, ele ) ) ) );
}

export function has( selector ) {
	const comparator = isString( selector ) ? ( i, ele ) => find( selector, ele ).length : ( i, ele ) => ele.contains( selector );
	return this.filter( comparator );
}

export function is( comparator ) {
	const compare = getCompareFunction( comparator );
	return v.some.call( this, ( ele, i ) => compare.call( ele, i, ele ) );
}

export function next( comparator, _all, _until ) {
	return filtered( core( unique( pluck( this, 'nextElementSibling', _all, _until ) ) ), comparator );
}

export function nextAll( comparator ) {
	return this.next( comparator, true );
}

export function nextUntil( until, comparator ) {
	return this.next( comparator, true, until );
}

export function not( comparator ) {
	const compare = getCompareFunction( comparator );
	return this.filter( ( i, ele ) => ( !isString( comparator ) || isElement( ele ) ) && !compare.call( ele, i, ele ) );
}

export function parent( comparator ) {
	return filtered( core( unique( pluck( this, 'parentNode' ) ) ), comparator );
}

export function parents( comparator, _until ) {
	return filtered( core( unique( pluck( this, 'parentElement', true, _until ) ) ), comparator );
}

export function parentsUntil( until, comparator ) {
	return this.parents( comparator, until );
}

export function prev( comparator, _all, _until ) {
	return filtered( core( unique( pluck( this, 'previousElementSibling', _all, _until ) ) ), comparator );
}

export function prevAll( comparator ) {
	return this.prev( comparator, true );
}

export function prevUntil( until, comparator ) {
	return this.prev( comparator, true, until );
}

export function siblings( comparator ) {
	return filtered( core( unique( pluck( this, ele => core( ele ).parent().children().not( ele ) ) ) ), comparator );
}
