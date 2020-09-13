import isCSSVariable from "./isCSSVariable";
import v from "../../core/vars";
import isNumeric from "../../typechecking/isNumeric";

export default ( prop, value, isVariable = isCSSVariable( prop ) ) => !isVariable && !v.numericProps[ prop ] && isNumeric( value ) ? `${value}px` : value;
