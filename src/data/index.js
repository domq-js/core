import getData from "./helpers/get_data";
import setData from "./helpers/set_data";
import typechecking from "../core/typechecking";

export default function data( name, value ) {
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

	if( typechecking.isString( name ) ) {
		if( arguments.length < 2 ) {
			return this[ 0 ] && getData( this[ 0 ], name );
		}
		if( typechecking.isUndefined( value ) ) {
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
}
