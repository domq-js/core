import { camelCase } from "../../string";
import regex from "../../regex";
import { attempt } from "../../utilities";

export default function( ele, key ) {
	const value = ele.dataset[ key ] || ele.dataset[ camelCase( key ) ];
	if( regex.JSONString.test( value ) ) {
		return value;
	}
	return attempt( JSON.parse, value );
}
