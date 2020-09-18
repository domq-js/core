import { fn } from "../setup";

fn.fadeIn = function( speed, easing, callback ) {
	return this.fadeToggle( speed, easing, callback, true );
};
