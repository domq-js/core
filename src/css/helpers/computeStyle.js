import { isElement } from "../../core/typechecking";
import v from "../../core/vars";

export default function( ele, prop, isVariable ) {
	if( !isElement( ele ) ) {
		return;
	}
	const style = v.win.getComputedStyle( ele, null );
	return isVariable ? style.getPropertyValue( prop ) || undefined : style[ prop ] || ele.style[ prop ];
}
