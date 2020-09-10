import vars from "../../core/vars";
import typechecking from "../../core/typechecking";
import isCSSVariable from "./is_css_variable";

export default function getSuffixedValue( prop, value, isVariable = isCSSVariable( prop ) ) {
	return !isVariable && !vars.numericProps[ prop ] && typechecking.isNumeric( value ) ? `${value}px` : value;
}
