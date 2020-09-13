import { fn } from "../setup";

fn.fadeIn = function( delay, easing, callback ) {
	return this.fadeToggle( delay, easing, callback, true );
};
