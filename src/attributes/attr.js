import { fn } from "../setup";
import { handleObjectDataLoop } from "../helper";
import { isElement, isNull, isString, isUndefined } from "@varunsridharan/js-is";

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
