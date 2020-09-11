import core from "../global-var";
import { each as _each, getCompareFunction, unique } from "../helper";
import { filter as _var_filter, slice as _var_slice, indexOf, concat, map as _var_map } from "../core/vars";
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
	return core( _var_filter.call( this, ( ele, i ) => compare.call( ele, i, ele ) ) );

}

export function first() {
	return this.eq( 0 );
}

export function last() {
	return this.eq( -1 );
}

export function get( index ) {
	if( isUndefined( index ) ) {
		return slice.call( this );
	}
	index = Number( index );
	return this[ index < 0 ? index + this.length : index ];
}

export function index( selector ) {
	const child      = selector ? core( selector )[ 0 ] : this[ 0 ],
		  collection = selector ? this : core( child ).parent().children();
	return indexOf.call( collection, child );
}

export function map( callback ) {
	return core( concat.apply( [], _var_map.call( this, ( ele, i ) => callback.call( ele, i, ele ) ) ) );
}

export function slice( start, end ) {
	return core( _var_slice.call( this, start, end ) );
}
