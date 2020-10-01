import core, { fn } from "../setup";
import _each from "../core/_each";
import extend from "../core/extend";
import animationArgs from "../core/vars/animationArgs";
import { isFunction, isNumber, isPlainObject, isString, isUndefined } from "@varunsridharan/js-is";

fn.animate = function( keyframes, speed, easing, callback ) {
	let options = {};

	if( isPlainObject( keyframes ) ) {
		_each( animationArgs, ( i, key ) => {
			if( !isUndefined( keyframes[ key ] ) ) {
				options[ key ] = keyframes[ key ];
				delete keyframes[ key ];
			}
		} );
	}

	if( isFunction( speed ) ) {
		callback = speed;
	}

	if( isPlainObject( speed ) ) {
		options = extend( speed, options );
	}

	if( isPlainObject( easing ) ) {
		options = extend( easing, options );
	}

	if( isFunction( easing ) ) {
		callback = easing;
	}

	options.duration = ( !isNumber( speed ) ) ? core.animation[ speed ] || core.animation.default : speed;
	options.easing   = ( !isString( easing ) ) ? 'linear' : easing;

	if( !isUndefined( options.loop ) ) {
		options.iterations = options.loop;
		delete options.loop;
	}

	if( !isUndefined( options.iterations ) && options.iterations === -1 ) {
		options.iterations = Infinity;
	}

	return this.each( ( i, el ) => {
		let animate = el.animate( keyframes, options );
		if( isFunction( callback ) ) {
			animate.onfinish = () => callback( el );
		}
	} );
};
