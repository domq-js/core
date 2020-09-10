import core from "../wrap";
import vars from "../core/vars";

export default function( callback ) {
	return core( vars.concat.apply( [], vars.map.call( this, ( ele, i ) => callback.call( ele, i, ele ) ) ) );
}
