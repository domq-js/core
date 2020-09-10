import stringHandler from "../../string";
import utilities from "../../utilities";
import regex from "../../regex";

export default function getData( ele, key ) {
	const value = ele.dataset[ key ] || ele.dataset[ stringHandler.camelCase( key ) ];
	if( regex.JSONString.test( value ) ) {
		return value;
	}
	return utilities.attempt( JSON.parse, value );
}
