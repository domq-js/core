import { rcamelCase } from "../core/regex";

export default function( str ) {
	return str.replace( rcamelCase, ( match, letter ) => letter.toUpperCase() );
}
