import { fn } from "../setup";
import { isElement, isUndefined } from "../core/typechecking";
import isHidden from "./helper/isHidden";
import v from "../core/vars";
import getDefaultDisplay from "./helper/getDefaultDisplay";
import computeStyle from "../css/helpers/computeStyle";

fn.toggle = function( force ) {
	return this.each( ( i, ele ) => {
		if( !isElement( ele ) ) {
			return;
		}

		const show = isUndefined( force ) ? isHidden( ele ) : force;

		if( show ) {
			ele.style.display = ele[ v.displayProperty ] || '';
			if( isHidden( ele ) ) {
				ele.style.display = getDefaultDisplay( ele.tagName );
			}
		} else {
			ele[ v.displayProperty ] = computeStyle( ele, 'display' );
			ele.style.display        = 'none';
		}
	} );
};
