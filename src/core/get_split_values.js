import vars from "./vars";
import regex from "../regex";

export default function getSplitValues( str ) {
	return vars.isString( str ) ? str.match( regex.splitValues ) || [] : [];
}
