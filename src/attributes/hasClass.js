import { fn } from "../setup";
import isElement from "../typechecking/isElement";
import { _some } from "@varunsridharan/js-vars";

fn.hasClass = function( cls ) {
	return !!cls && _some.call( this, ( ele ) => isElement( ele ) && ele.classList.contains( cls ) );
};
