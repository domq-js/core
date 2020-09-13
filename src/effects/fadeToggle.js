import core, { fn } from "../setup";
import fadeHandler from "./helper/fadeHandler";

fn.fadeToggle = function( delay, easing, callback, force ) {
	return this.each( ( i, ele ) => {
		fadeHandler.call( core( ele ), delay, easing, callback, false, force );
	} );
};
