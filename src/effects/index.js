import typechecking from "../core/typechecking";
import isHidden from "./helpers/is_hidden";
import computeStyle from "../css/helpers/compute_style";
import getDefaultDisplay from "./helpers/get_default_display";
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
		if( !typechecking.isElement( ele ) ) {
			return;
		}

		const show = typechecking.isUndefined( force ) ? isHidden( ele ) : force;

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
