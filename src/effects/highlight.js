import core, { fn } from "../setup";

fn.highlight = function( color = '#ffff9c', prop = 'backgroundColor', speed, easing, callback ) {
	return this.each( ( i, ele ) => {
		const el = core( ele );
		el.animate( {
			direction: 'alternate',
			iterations: 2,
			[ prop ]: [ el.css( prop ), color ]
		}, speed, easing, callback );
	} );
};
