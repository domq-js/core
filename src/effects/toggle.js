import { fn } from "../setup";
import isUndefined from "../typechecking/isUndefined";
import isElement from "../typechecking/isElement";
import isHidden from "./helper/isHidden";
import v from "../core/vars";
import getDefaultDisplay from "./helper/getDefaultDisplay";
import computeStyle from "../css/helpers/computeStyle";
import cssDisplayProp from "../core/vars/cssDisplayProp";

fn.toggle = function( force ) {
	return this.each( ( i, ele ) => {
		if( !isElement( ele ) ) {
			return;
		}

		const show = isUndefined( force ) ? isHidden( ele ) : force;

		if( show ) {
			ele.style.display = ele[ cssDisplayProp ] || '';
			if( isHidden( ele ) ) {
				ele.style.display = getDefaultDisplay( ele.tagName );
			}
		} else {
			ele[ cssDisplayProp ] = computeStyle( ele, 'display' );
			ele.style.display     = 'none';
		}
	} );
};
