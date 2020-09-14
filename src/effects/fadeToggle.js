import core, { fn } from "../setup";
import isHidden from "./helper/isHidden";
import isUndefined from "../typechecking/isUndefined";
import isFunction from "../typechecking/isFunction";

fn.fadeToggle = function( speed, easing, callback, force ) {
	return this.each( ( i, el ) => {
		let isElemHidden = isHidden( el ),
			isShow       = ( true === isElemHidden ) ? true : false;
		el               = core( el );
		isShow           = isUndefined( force ) ? isShow : ( false === force ) ? false : ( true === force ) ? true : isShow;

		if( ( isElemHidden && !isShow ) || ( !isElemHidden && isShow ) ) {
			return;
		}

		if( isShow ) {
			el.show();
		}

		el.animate( { 'opacity': ( isShow ) ? [ 0, 1 ] : 0 }, speed, easing, ( elm ) => {
			if( isShow ) {
				el.show();
			} else {
				el.hide();
			}
			if( isFunction( callback ) ) {
				callback( elm );
			}
		} );
	} );
};
