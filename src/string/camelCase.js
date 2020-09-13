import regex from "../regex";

export default function( str ) {
	return str.replace( regex.camelCase, ( match, letter ) => letter.toUpperCase() );
}
