import camelCase from "../../string/camelCase";
import attempt from "../../utilities/attempt";
import { rJSONString } from "../../core/regex";

export default function( ele, key ) {
	const value = ele.dataset[ key ] || ele.dataset[ camelCase( key ) ];
	return ( rJSONString.test( value ) ) ? value : attempt( JSON.parse, value );
}
