import regex from "../../regex";
import camelCase from "../../string/camelCase";
import attempt from "../../utilities/attempt";

export default function( ele, key ) {
	const value = ele.dataset[ key ] || ele.dataset[ camelCase( key ) ];
	if( regex.JSONString.test( value ) ) {
		return value;
	}
	return attempt( JSON.parse, value );
}
