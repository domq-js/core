import core from "../setup";
import { _each, getCompareFunction, unique } from "../helper";
import vars from "../core/vars";
import { isUndefined } from "../core/typechecking";


export function add( selector, context ) {
	return core( unique( this.get().concat( core( selector, context ).get() ) ) );
}

export function each( callback ) {
	return _each( this, callback );
}

export function eq( index ) {
	return core( this.get( index ) );
}

export function filter( comparator ) {
	const compare = getCompareFunction( comparator );
	return core( vars.filter.call( this, ( ele, i ) => compare.call( ele, i, ele ) ) );
}

export function first() {
	return this.eq( 0 );
}

export function last() {
	return this.eq( -1 );
}

export function get( index ) {
	if( isUndefined( index ) ) {
		return vars.slice.call( this );
	}
	index = Number( index );
	return this[ index < 0 ? index + this.length : index ];
}

export function index( selector ) {
	const child      = selector ? core( selector )[ 0 ] : this[ 0 ],
		  collection = selector ? this : core( child ).parent().children();
	return vars.indexOf.call( collection, child );
}

export function map( callback ) {
	return core( vars.concat.apply( [], vars.map.call( this, ( ele, i ) => callback.call( ele, i, ele ) ) ) );
}

export function slice( start, end ) {
	return core( vars.slice.call( this, start, end ) );
}
