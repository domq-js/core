import { fn } from "../setup";
import isNull from "../typechecking/isNull";
import isUndefined from "../typechecking/isUndefined";
import isString from "../typechecking/isString";
import isElement from "../typechecking/isElement";
import { handleObjectDataLoop } from "../helper";

fn.attr = function( attr, value ) {
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
	handleObjectDataLoop.call( this, attr, 'attr' );
	return this;
};
