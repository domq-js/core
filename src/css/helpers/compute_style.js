import typechecking from "../../core/typechecking";
import vars from "../../core/vars";

export default function computeStyle( ele, prop, isVariable ) {
	if( !typechecking.isElement( ele ) ) {
		return;
	}
	const style = vars.win.getComputedStyle( ele, null );
	return isVariable ? style.getPropertyValue( prop ) || undefined : style[ prop ] || ele.style[ prop ];
}
