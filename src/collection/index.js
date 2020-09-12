import core, { fn } from "../setup";
import { _each, getCompareFunction, unique } from "../helper";
import vars from "../core/vars";
import { isUndefined } from "../core/typechecking";

fn.add    = function( selector, context ) {
	return core( unique( this.get().concat( core( selector, context ).get() ) ) );
};
fn.each   = function( callback ) {
	return _each( this, callback );
};
fn.eq     = function( index ) {
	return core( this.get( index ) );
};
fn.filter = function( comparator ) {
	const compare = getCompareFunction( comparator );
	return core( vars.filter.call( this, ( ele, i ) => compare.call( ele, i, ele ) ) );
};
fn.first  = function() {
	return this.eq( 0 );
};
fn.last   = function() {
	return this.eq( -1 );
};
fn.get    = function( index ) {
	if( isUndefined( index ) ) {
		return vars.slice.call( this );
	}
	index = Number( index );
	return this[ index < 0 ? index + this.length : index ];
};
fn.index  = function( selector ) {
	const child      = selector ? core( selector )[ 0 ] : this[ 0 ],
		  collection = selector ? this : core( child ).parent().children();
	return vars.indexOf.call( collection, child );
};
fn.map    = function( callback ) {
	return core( vars.concat.apply( [], vars.map.call( this, ( ele, i ) => callback.call( ele, i, ele ) ) ) );
};
fn.slice  = function( start, end ) {
	return core( vars.slice.call( this, start, end ) );
};
