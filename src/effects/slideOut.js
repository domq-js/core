import core, { fn } from "../setup";
import { isFunction } from "@varunsridharan/js-is";

fn.slideOut = function( direction = 'bottom', speed, easing, callback ) {
	let transform, props = { opacity: 0 };
	switch( direction ) {
		case 'left':
		case 'right':
			transform = `translateX(${'left' === direction ? '-100%' : '100%'})`;
			break;
		case 'top':
		default:
			transform = `translateY(${'top' === direction ? '-100%' : '100%'})`;
			break;
	}
	props.transform = transform;
	return this.each( ( i, ele ) => {
		const el = core( ele );
		el.animate( props, speed, easing, () => {
			//el.css( props );
			el.hide();
			if( isFunction( callback ) ) {
				callback( el );
			}
		} );
	} );
};
