import  isElement from "../../typechecking/isElement";
import win from "../../core/vars/win";

export default function( ele, prop, isVariable ) {
	if( !isElement( ele ) ) {
		return;
	}
	const style = win.getComputedStyle( ele, null );
	return isVariable ? style.getPropertyValue( prop ) || undefined : style[ prop ] || ele.style[ prop ];
}
