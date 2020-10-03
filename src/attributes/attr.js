import { fn } from "../setup";
import { handleObjectDataLoop } from "../helper";
import { isElement, isNull, isString, isUndefined } from "@varunsridharan/js-is";
import { attrHook } from "../hooks/helper";

fn.attr = function( name, value ) {
	if( !name ) {
		return;
	}

	if( isString( name ) ) {
		let ln = name.toLowerCase();
		if( arguments.length < 2 ) {
			if( !this[ 0 ] || !isElement( this[ 0 ] ) ) {
				return;
			}

			let hook  = attrHook( ln, 'get' ),
				value = ( hook ) ? hook( this[ 0 ], name ) : null;
			value     = ( isNull( value ) ) ? this[ 0 ].getAttribute( name ) : value;
			return isNull( value ) ? undefined : value;
		}

		if( isUndefined( value ) ) {
			return this;
		}

		if( isNull( value ) ) {
			return this.removeAttr( name );
		}

		let hook = attrHook( ln, 'set' );
		return this.each( ( i, ele ) => {
			if( !isElement( ele ) ) {
				return;
			}
			( hook ) ? hook( this[ 0 ], name, value ) : ele.setAttribute( name, value );
		} );
	}
	handleObjectDataLoop.call( this, name, 'attr' );
	return this;
};
