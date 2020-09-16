import core, { fn } from "../setup";
import grep from "../utilities/grep";

fn.even = function() {
	return core( grep( this, ( _elem, i ) => ( i + 1 ) % 2 ) );
};
