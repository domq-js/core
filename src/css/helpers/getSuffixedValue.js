import isCSSVariable from "./isCSSVariable";
import cssNumericProp from "../../core/vars/cssNumericProp";
import { isNumeric } from "@varunsridharan/js-is";

export default function( prop, value, isVariable = isCSSVariable( prop ) ) {
	return !isVariable && !cssNumericProp[ prop ] && isNumeric( value ) ? `${value}px` : value;
}
