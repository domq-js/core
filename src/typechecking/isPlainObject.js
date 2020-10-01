import isTypeof from "./isTypeof";
import isNull from "./isNull";
import { _obj } from "@varunsridharan/js-vars";

export default function( x ) {
	if( !isTypeof( x, 'object' ) || isNull( x ) ) {
		return false;
	}
	const proto = _obj.getPrototypeOf( x );
	return isNull( proto ) || proto === _obj.prototype;
}
