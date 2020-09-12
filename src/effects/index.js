import { isElement, isUndefined } from "../core/typechecking";
import { computeStyle } from "../css/helper";
import { getDefaultDisplay, isHidden } from './helper';
import { fn } from "../setup";
import v from "../core/vars";

fn.hide    = function() {
	return this.toggle( false );
};
fn.show    = function() {
	return this.toggle( true );
};
fn.toggle  = function( force ) {
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
