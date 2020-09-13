import core, { fn } from "../setup";
import fadeHandler from "./helper/fadeHandler";

fn.fadeTo = function( delay, opacity, easing, callback ) {
	return this.each( ( i, ele ) => {
		fadeHandler.call( core( ele ), delay, easing, callback, opacity );
	} );
};
