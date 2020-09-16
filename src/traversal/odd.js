import core, { fn } from "../setup";
import grep from "../utilities/grep";

fn.odd = function() {
	return core( grep( this, ( _elem, i ) => i % 2 ) );
};
