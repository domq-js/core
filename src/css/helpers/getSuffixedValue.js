import isCSSVariable from "./isCSSVariable";
import v from "../../core/vars";
import isNumeric from "../../typechecking/isNumeric";

export default function( prop, value, isVariable = isCSSVariable( prop ) ) {
	return !isVariable && !v.numericProps[ prop ] && isNumeric( value ) ? `${value}px` : value;
}
