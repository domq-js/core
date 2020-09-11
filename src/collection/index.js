import core from "../global-var";
import { each, getCompareFunction, unique } from "../helper";
import vars from "../core/vars";
import { isUndefined } from "../core/typechecking";

const collection = {};

collection.add    = function( selector, context ) {
	return core( unique( this.get().concat( core()( selector, context ).get() ) ) );
};
collection.each   = function( callback ) {
	return each( this, callback );
};
collection.eq     = function( index ) {
	return core( this.get( index ) );
};
collection.filter = function( comparator ) {
	const compare = getCompareFunction( comparator );
	return core( vars.filter.call( this, ( ele, i ) => compare.call( ele, i, ele ) ) );

};
collection.first  = function() {
	return this.eq( 0 );
};
collection.last   = function() {
	return this.eq( -1 );
};
collection.get    = function( index ) {
	if( isUndefined( index ) ) {
		return vars.slice.call( this );
	}
	index = Number( index );
	return this[ index < 0 ? index + this.length : index ];
};
collection.index  = function( selector ) {
	const child      = selector ? core( selector )[ 0 ] : this[ 0 ],
		  collection = selector ? this : core( child ).parent().children();
	return vars.indexOf.call( collection, child );
};
collection.map    = function( callback ) {
	return core( vars.concat.apply( [], vars.map.call( this, ( ele, i ) => callback.call( ele, i, ele ) ) ) );
};
collection.slice  = function( start, end ) {
	return core( vars.slice.call( this, start, end ) );
};
export default collection;