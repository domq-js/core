import { fn } from "../setup";
import { _some } from "@varunsridharan/js-vars";
import { isElement } from "@varunsridharan/js-is";

fn.hasClass = function( cls ) {
	return !!cls && _some.call( this, ( ele ) => isElement( ele ) && ele.classList.contains( cls ) );
};
