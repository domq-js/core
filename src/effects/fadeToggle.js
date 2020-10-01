import core, { fn } from "../setup";
import isHidden from "./helper/isHidden";
import { isFunction, isUndefined } from "@varunsridharan/js-is";

fn.fadeToggle = function( speed, easing, callback, force ) {
	return this.each( ( i, el ) => {
		let isElemHidden = isHidden( el ),
			isShow       = ( isElemHidden );
		isShow           = isUndefined( force ) ? isShow : ( !force ) ? false : ( force ) ? true : isShow;

		if( ( isElemHidden && !isShow ) || ( !isElemHidden && isShow ) ) {
			return;
		}

		el = core( el );
		if( isShow ) {
			el.show();
		}

		el.animate( { 'opacity': ( isShow ) ? [ 0, 1 ] : 0 }, speed, easing, ( elm ) => {
			( isShow ) ? el.show() : el.hide();
			if( isFunction( callback ) ) {
				callback( elm );
			}
		} );
	} );
};
