import regex from "../regex";
import typechecking from "./typechecking";

export default function getSplitValues( str ) {
	return typechecking.isString( str ) ? str.match( regex.splitValues ) || [] : [];
}
