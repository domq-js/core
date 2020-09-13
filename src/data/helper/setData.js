import attempt from "../../utilities/attempt";
import camelCase from "../../string/camelCase";

export default function( ele, key, value ) {
	ele.dataset[ camelCase( key ) ] = attempt( JSON.stringify, value );
}
