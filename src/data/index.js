import isUndefined from "../typechecking/isUndefined";
import isString from "../typechecking/isString";
import { fn } from '../setup';
import getData from "./helper/getData";
import setData from "./helper/setData";

fn.data = function data( name, value ) {
	if( !name ) {
		if( !this[ 0 ] ) {
			return;
		}
		const datas = {};
		for( const key in this[ 0 ].dataset ) {
			datas[ key ] = getData( this[ 0 ], key );
		}
		return datas;
	}

	if( isString( name ) ) {
		if( arguments.length < 2 ) {
			return this[ 0 ] && getData( this[ 0 ], name );
		}
		if( isUndefined( value ) ) {
			return this;
		}
		return this.each( ( i, ele ) => {
			setData( ele, name, value )
		} );
	}

	for( const key in name ) {
		this.data( key, name[ key ] );
	}
	return this;
};
