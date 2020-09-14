import { fn } from "../setup";

fn.pulse = function( speed, easing, callback ) {
	return this.animate( {
		opacity: [ 0.5, 1 ],
		direction: 'alternate',
		transform: [ 'scale(0.5)', 'scale(1)' ],
	}, speed, easing, callback );
};
