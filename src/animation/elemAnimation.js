import { isFunction, isNumber, isPlainObject, isString, isUndefined } from "@varunsridharan/js-is";
import _each from "../core/_each";
import animationArgs from "../core/vars/animationArgs";
import extend from "../core/extend";
import core from "../setup";

export default function( instance, internalCallback, keyframes, speed, easing, callback ) {
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

	return instance.each( ( i, el ) => {
		let _el     = core( el );
		let animate = new Promise( resolve => {
			let instance      = el.animate( keyframes, options );
			instance.onfinish = () => {
				if( isFunction( internalCallback ) ) {
					internalCallback( _el );
				}
				resolve();
			};

		} );

		animate.then( () => {
			if( isFunction( callback ) ) {
				callback( _el );
			}
		} );
	} );
}
