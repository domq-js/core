import core, { fn } from "../setup";
import vars from "../core/vars";

fn.map    = function( callback ) {
	return core( vars.concat.apply( [], vars.map.call( this, ( ele, i ) => callback.call( ele, i, ele ) ) ) );
};
