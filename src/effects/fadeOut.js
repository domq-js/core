import { fn } from "../setup";

fn.fadeOut = function( speed, easing, callback ) {
	return this.fadeToggle( speed, easing, callback, false );
};
