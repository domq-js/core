import isCSSVariable from "./isCSSVariable";
import v from "../../core/vars";
import { isNumeric } from "../../core/typechecking";

export default ( prop, value, isVariable = isCSSVariable( prop ) ) => !isVariable && !v.numericProps[ prop ] && isNumeric( value ) ? `${value}px` : value;
