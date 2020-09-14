import { fn } from "../setup";

fn.fadeOut = function( delay, easing, callback ) {
	return this.fadeToggle( delay, easing, callback, false );
};
