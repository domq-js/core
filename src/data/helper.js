import { camelCase } from "../string/index";
import { attempt } from "../utilities/index";
import regex from "../regex";

export function getData( ele, key ) {
	const value = ele.dataset[ key ] || ele.dataset[ camelCase( key ) ];
	if( regex.JSONString.test( value ) ) {
		return value;
	}
	return attempt( JSON.parse, value );
}

export function setData( ele, key, value ) {
	value                                         = attempt( JSON.stringify, value );
	ele.dataset[ camelCase( key ) ] = value;
}
