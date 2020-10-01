import core from "../../setup";
import { isElement, isUndefined } from "@varunsridharan/js-is";

export default function( from, to, isMove = false ) {
	return this.each( ( i, el ) => {
		if( !isElement( el ) ) {
			return;
		}
		let instance  = core( el );
		let $existing = instance.attr( from );
		if( !isUndefined( $existing ) ) {
			instance.attr( to, $existing );
			if( isMove ) {
				instance.removeAttr( from );
			}
		}
	} );
}
