import core, { fn } from "../setup";
import { isFunction } from "@varunsridharan/js-is";

fn.slideIn = function( direction = 'bottom', speed, easing, callback ) {
	let transform, props = { opacity: 1 };
	switch( direction ) {
		case 'left':
		case 'right':
			transform = [ `translateX(${'left' === direction ? '-100%' : '100%'})`, `translateX(0)` ];
			break;
		case 'bottom':
		case 'top':
		default:
			transform = [ `translateY(${'bottom' === direction ? '100%' : '-100%'})`, `translateY(0)` ];
			break;
	}
	props.transform = transform;
	return this.each( ( i, ele ) => {
		const el = core( ele );
		el.animate( props, speed, easing, () => {
			//el.css( props );
			el.show();
			if( isFunction( callback ) ) {
				callback( el );
			}
		} );
	} );
};
