import { isElement, isUndefined } from "../core/typechecking";
import { computeStyle } from "../css/helper";
import { getDefaultDisplay, isHidden } from './helper';
import vars from "../core/vars";

const effects = {};

effects.hide   = function() {
	return this.toggle( false );
};
effects.show   = function() {
	return this.toggle( true );
};
effects.toggle = function( force ) {
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
};

export default effects;
