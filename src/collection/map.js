import core, { fn } from "../setup";
import _concat from "../core/vars/_concat";
import _map from "../core/vars/_map";

fn.map = function( callback ) {
	return core( _concat.apply( [], _map.call( this, ( ele, i ) => callback.call( ele, i, ele ) ) ) );
};
