import regex from "../regex";
import { isString } from "./typechecking";

export default function getSplitValues( str ) {
	return isString( str ) ? str.match( regex.splitValues ) || [] : [];
}
