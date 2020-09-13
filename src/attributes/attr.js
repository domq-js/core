import { fn } from "../setup";
import { isElement, isNull, isString, isUndefined } from "../core/typechecking";

fn.attr       = function( attr, value ) {
	if( !attr ) {
		return;
	}

	if( isString( attr ) ) {
		if( arguments.length < 2 ) {
			if( !this[ 0 ] || !isElement( this[ 0 ] ) ) {
				return;
			}
			const value = this[ 0 ].getAttribute( attr );
			return isNull( value ) ? undefined : value;
		}
		if( isUndefined( value ) ) {
			return this;
		}
		if( isNull( value ) ) {
			return this.removeAttr( attr );
		}
		return this.each( ( i, ele ) => {
			if( !isElement( ele ) ) {
				return;
			}
			ele.setAttribute( attr, value );
		} );
	}
	for( const key in attr ) {
		this.attr( key, attr[ key ] );
	}
	return this;
};
