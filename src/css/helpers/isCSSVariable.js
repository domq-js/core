import regex from "../../regex";

export default function( prop ) {
	return regex.cssVariable.test( prop );
}
