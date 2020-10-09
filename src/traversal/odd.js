import core, { fn } from "../setup";
//import grep from "../utilities/grep";
import { _filter } from "@varunsridharan/js-vars";

fn.odd = function() {
	//return core( grep( this, ( _elem, i ) => i % 2 ) );
	return core( _filter.call( this, ( el, i ) =>  i % 2 ) );
};
