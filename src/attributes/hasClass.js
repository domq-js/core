import { fn } from "../setup";
import vars from "../core/vars";
import { isElement } from "../core/typechecking";

fn.hasClass    = function( cls ) {
	return !!cls && vars.some.call( this, ( ele ) => isElement( ele ) && ele.classList.contains( cls ) );
};
