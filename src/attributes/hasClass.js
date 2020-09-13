import { fn } from "../setup";
import v from "../core/vars";
import isElement from "../typechecking/isElement";
fn.hasClass    = function( cls ) {
	return !!cls && v.some.call( this, ( ele ) => isElement( ele ) && ele.classList.contains( cls ) );
};
