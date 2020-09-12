import regex from "../regex";

export function camelCase( str ) {
	return str.replace( regex.camelCase, ( match, letter ) => letter.toUpperCase() );
}
