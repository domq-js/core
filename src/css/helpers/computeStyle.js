import { win } from "@varunsridharan/js-vars";
import { isElement } from "@varunsridharan/js-is";

export default function( ele, prop, isVariable ) {
	if( !isElement( ele ) ) {
		return;
	}
	const style = win.getComputedStyle( ele, null );
	return isVariable ? style.getPropertyValue( prop ) || undefined : style[ prop ] || ele.style[ prop ];
}
