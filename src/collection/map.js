import core, { fn } from "../setup";
import { _concat, _map } from "@varunsridharan/js-vars";

fn.map = function( callback ) {
	return core( _concat.apply( [], _map.call( this, ( ele, i ) => callback.call( ele, i, ele ) ) ) );
};
