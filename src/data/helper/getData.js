import regex from "../../regex";
import camelCase from "../../string/camelCase";
import attempt from "../../utilities/attempt";

export default function( ele, key ) {
	const value = ele.dataset[ key ] || ele.dataset[ camelCase( key ) ];
	return ( regex.JSONString.test( value ) ) ? value : attempt( JSON.parse, value );
}
