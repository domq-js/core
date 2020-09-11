import { isElement, isUndefined } from "../core/typechecking";
import { computeStyle } from "../css/helper";
import { getDefaultDisplay, isHidden } from './helper';
import vars from "../core/vars";

export function hide() {
	return this.toggle( false );
}

export function show() {
	return this.toggle( true );
}

export function toggle( force ) {
	return this.each( ( i, ele ) => {
		if( !isElement( ele ) ) {
			return;
		}

		const show = isUndefined( force ) ? isHidden( ele ) : force;

		if( show ) {
			ele.style.display = ele[ vars.displayProperty ] || '';
			if( isHidden( ele ) ) {
				ele.style.display = getDefaultDisplay( ele.tagName );
			}
		} else {
			ele[ vars.displayProperty ] = computeStyle( ele, 'display' );
			ele.style.display           = 'none';
		}
	} );
}

export function fadeOut() {
	this.css( {
		transition: 'all 1s ease',
		opacity: 0,
		display: 'none',
	} );
}

export function fadeIn() {
	this.css( {
		transition: 'all 1s ease',
		opacity: 1,

	} );
}
