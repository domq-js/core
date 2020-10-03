import { fn } from "../setup";
import cssMaps from "../core/vars/cssMaps";
import { access, handleObjectDataLoop } from "../helper";
import { isNull, isString } from "@varunsridharan/js-is";
import { propHook } from "../hooks/helper";

fn.prop = function( prop, value ) {
	if( !prop ) {
		return;
	}

	if( isString( prop ) ) {
		prop = cssMaps[ prop ] || prop;
		if( arguments.length < 2 ) {
			if( !this[ 0 ] ) {
				return false;
			}
			let elem  = this[ 0 ],
				hook  = propHook( prop, 'get' ),
				value = ( hook ) ? hook( elem, prop ) : null;
			return ( isNull( value ) ) ? elem && elem[ prop ] : value;
		}
		let hook = propHook( prop, 'set' );
		return this.each( ( i, ele ) => {
			if( hook ) {
				hook( ele, prop, value );
			} else {
				ele[ prop ] = access( value, i, ele );
			}
		} );
	}
	handleObjectDataLoop.call( this, prop, 'prop' );
	return this;
};
