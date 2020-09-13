import isCSSVariable from "./isCSSVariable";
import isNumeric from "../../typechecking/isNumeric";
import cssNumericProp from "../../core/vars/cssNumericProp";

export default function( prop, value, isVariable = isCSSVariable( prop ) ) {
	return !isVariable && !cssNumericProp[ prop ] && isNumeric( value ) ? `${value}px` : value;
}
