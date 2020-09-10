import regex from "../../regex";

export default function isCSSVariable( prop ) {
	return regex.cssVariable.test( prop );
}
