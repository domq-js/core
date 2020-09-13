import isFunction from "../../typechecking/isFunction";
import isUndefined from "../../typechecking/isUndefined";
import isHidden from "./isHidden";

export default function( delay = 400, easing = 'linear', callback = null, opacity = false, force = false ) {
	let alreadyHidden = isHidden( this[ 0 ] ),
		show          = isUndefined( force ) ? alreadyHidden : force;

	if( alreadyHidden && !show ) {
		return;
	}

	if( !alreadyHidden && show ) {
		return;
	}

	if( isFunction( easing ) ) {
		callback = easing;
		easing   = 'linear';
	}
	if( isFunction( delay ) ) {
		callback = delay;
		delay    = 400;
	} else {
		delay = ( 'slow' === delay ) ? 600 : delay;
		delay = ( 'fast' === delay ) ? 200 : delay;
	}

	if( !opacity && show ) {
		this.css( 'opacity', 0 ).show();
	}

	this.css( {
		'transition': `all ${delay}ms ${easing || ''}`,
		'opacity': ( false === opacity ) ? ( show ) ? 1 : 0 : opacity,
	} );

	setTimeout( () => {
		let removeProp = { 'transition': '', 'opacity': '' };
		if( opacity ) {
			delete removeProp.opacity;
		}

		this.css( removeProp );

		if( !opacity ) {
			if( show ) {
				this.show();
			} else {
				this.hide();
			}
		}
		if( isFunction( callback ) ) {
			callback( this );
		}
	}, delay );
}
