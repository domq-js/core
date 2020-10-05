import core, { fn } from "../setup";
import { isFunction } from "@varunsridharan/js-is";

fn.scale = function( percent, speed, easing, callback ) {
	return this.each( ( i, ele ) => {
		const el = core( ele );
		let prop = { 'transform': `scale(${percent / 100})` };
		el.animate( prop, speed, easing, () => {
			el.css( prop );
			if( isFunction( callback ) ) {
				callback( el );
			}
		} );
	} );
};
