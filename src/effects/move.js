import core, { fn } from "../setup";
import { isFunction } from "@varunsridharan/js-is";

fn.move = function( x, y, percent, speed, easing, callback ) {
	return this.each( ( i, ele ) => {
		const el = core( ele );
		let prop = { 'transform': `translate(${x}, ${y})` };
		el.animate( prop, speed, easing, () => {
			el.css( prop );
			if( isFunction( callback ) ) {
				callback( el );
			}
		} );
	} );
};
