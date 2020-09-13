import isTypeof from "./isTypeof";
import isNull from "./isNull";

export default function( x ) {
	if( !isTypeof( x, 'object' ) || isNull( x ) ) {
		return false;
	}
	const proto = Object.getPrototypeOf( x );
	return isNull( proto ) || proto === Object.prototype;
}
