import { fn } from "../setup";
import { handleObjectDataLoop } from "../helper";
import { isElement, isNull, isString, isUndefined } from "@varunsridharan/js-is";
import attrHooks from "../hooks/attr";

fn.attr = function( name, value ) {
	if( !name ) {
		return;
	}

	if( isString( name ) ) {
		let hook = ( !isUndefined( attrHooks[ name.toLowerCase() ] ) ) ? attrHooks[ name.toLowerCase() ] : false;
		if( arguments.length < 2 ) {
			if( !this[ 0 ] || !isElement( this[ 0 ] ) ) {
				return;
			}

			let value = null;

			if( hook && !isUndefined( hook.get ) ) {
				value = hook.get( this[ 0 ], name );
			}

			if( isNull( value ) ) {
				value = this[ 0 ].getAttribute( name );
			}
			return isNull( value ) ? undefined : value;
		}

		if( isUndefined( value ) ) {
			return this;
		}

		if( isNull( value ) ) {
			return this.removeAttr( name );
		}

		return this.each( ( i, ele ) => {
			if( !isElement( ele ) ) {
				return;
			}

			( hook && !isUndefined( hook.set ) ) ? hook.set( this[ 0 ], name, value ) : ele.setAttribute( name, value );
		} );
	}
	handleObjectDataLoop.call( this, name, 'attr' );
	return this;
};
