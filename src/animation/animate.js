import { fn } from "../setup";
import isPlainObject from "../typechecking/isPlainObject";
import isUndefined from "../typechecking/isUndefined";
import isFunction from "../typechecking/isFunction";
import isNumber from "../typechecking/isNumber";
import isString from "../typechecking/isString";
import _each from "../core/_each";
import extend from "../core/extend";

fn.animate = function( keyframes, speed, easing, callback ) {
	let options     = {},
		defaultArgs = [ 'id', 'speed', 'direction', 'delay', 'easing', 'endDelay', 'fill', 'iterationStart', 'iterations' ];

	_each( defaultArgs, ( i, key ) => {
		if( !isUndefined( keyframes[ key ] ) ) {
			options[ key ] = keyframes[ key ];
			delete keyframes[ key ];
		}
	} );

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

	speed            = ( !isNumber( speed ) ) ? 400 : speed;
	speed            = ( 'slow' === speed ) ? 600 : speed;
	speed            = ( 'fast' === speed ) ? 200 : speed;
	easing           = ( !isString( easing ) ) ? 'linear' : easing;
	options.duration = speed;
	options.easing   = easing;

	if( !isUndefined( options.loop ) ) {
		options.iterations = options.loop;
		delete options.loop;
	}

	if( !isUndefined( options.iterations ) && options.iterations === -1 ) {
		options.iterations = Infinity;
	}

	if( this.length === 1 ) {
		let animate = this[ 0 ].animate( keyframes, options );
		if( isFunction( callback ) ) {
			animate.onfinish = () => callback( this[ 0 ] );
		}
		return animate;
	}

	return this.each( ( i, el ) => {
		let animate = el.animate( keyframes, options );
		if( isFunction( callback ) ) {
			animate.onfinish = () => callback( el );
		}
	} );
};
