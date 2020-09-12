import { isFunction, isUndefined, isNumber, isString, isNull } from "../core/typechecking";
import v from "../core/vars";
import core, { fn } from "../setup";
import regex from "../regex";

/**
 * TinyAnimate.easings
 * Adapted from jQuery Easing
 */
const M                  = Math;
const easings            = {};
easings.linear           = ( t, b, c, d ) => c * t / d + b;
easings.easeInQuad       = ( t, b, c, d ) => c * ( t /= d ) * t + b;
easings.easeOutQuad      = ( t, b, c, d ) => -c * ( t /= d ) * ( t - 2 ) + b;
easings.easeInOutQuad    = ( t, b, c, d ) => ( ( t /= d / 2 ) < 1 ) ? c / 2 * t * t + b : -c / 2 * ( ( --t ) * ( t - 2 ) - 1 ) + b;
easings.easeInCubic      = ( t, b, c, d ) => c * ( t /= d ) * t * t + b;
easings.easeOutCubic     = ( t, b, c, d ) => c * ( ( t = t / d - 1 ) * t * t + 1 ) + b;
easings.easeInOutCubic   = ( t, b, c, d ) => ( ( t /= d / 2 ) < 1 ) ? c / 2 * t * t * t + b : c / 2 * ( ( t -= 2 ) * t * t + 2 ) + b;
easings.easeInQuart      = ( t, b, c, d ) => c * ( t /= d ) * t * t * t + b;
easings.easeOutQuart     = ( t, b, c, d ) => -c * ( ( t = t / d - 1 ) * t * t * t - 1 ) + b;
easings.easeInOutQuart   = ( t, b, c, d ) => ( ( t /= d / 2 ) < 1 ) ? c / 2 * t * t * t * t + b : -c / 2 * ( ( t -= 2 ) * t * t * t - 2 ) + b;
easings.easeInQuint      = ( t, b, c, d ) => c * ( t /= d ) * t * t * t * t + b;
easings.easeOutQuint     = ( t, b, c, d ) => c * ( ( t = t / d - 1 ) * t * t * t * t + 1 ) + b;
easings.easeInOutQuint   = ( t, b, c, d ) => ( ( t /= d / 2 ) < 1 ) ? c / 2 * t * t * t * t * t + b : c / 2 * ( ( t -= 2 ) * t * t * t * t + 2 ) + b;
easings.easeInSine       = ( t, b, c, d ) => -c * M.cos( t / d * ( M.PI / 2 ) ) + c + b;
easings.easeOutSine      = ( t, b, c, d ) => c * M.sin( t / d * ( M.PI / 2 ) ) + b;
easings.easeInOutSine    = ( t, b, c, d ) => -c / 2 * ( M.cos( M.PI * t / d ) - 1 ) + b;
easings.easeInExpo       = ( t, b, c, d ) => ( t == 0 ) ? b : c * M.pow( 2, 10 * ( t / d - 1 ) ) + b;
easings.easeOutExpo      = ( t, b, c, d ) => ( t == d ) ? b + c : c * ( -M.pow( 2, -10 * t / d ) + 1 ) + b;
easings.easeInOutExpo    = ( t, b, c, d ) => {
	if( t == 0 ) {
		return b;
	}
	if( t == d ) {
		return b + c;
	}
	return ( ( t /= d / 2 ) < 1 ) ? c / 2 * M.pow( 2, 10 * ( t - 1 ) ) + b : c / 2 * ( -M.pow( 2, -10 * --t ) + 2 ) + b;
};
easings.easeInCirc       = ( t, b, c, d ) => -c * ( M.sqrt( 1 - ( t /= d ) * t ) - 1 ) + b;
easings.easeOutCirc      = ( t, b, c, d ) => c * M.sqrt( 1 - ( t = t / d - 1 ) * t ) + b;
easings.easeInOutCirc    = ( t, b, c, d ) => ( ( t /= d / 2 ) < 1 ) ? -c / 2 * ( M.sqrt( 1 - t * t ) - 1 ) + b : c / 2 * ( M.sqrt( 1 - ( t -= 2 ) * t ) + 1 ) + b;
easings.easeInElastic    = ( t, b, c, d ) => {
	var p = 0;
	var a = c;
	if( t == 0 ) {
		return b;
	}
	if( ( t /= d ) == 1 ) {
		return b + c;
	}
	if( !p ) p = d * .3;
	if( a < M.abs( c ) ) {
		a     = c;
		var s = p / 4;
	} else {
		var s = p / ( 2 * M.PI ) * M.asin( c / a );
	}
	return -( a * M.pow( 2, 10 * ( t -= 1 ) ) * M.sin( ( t * d - s ) * ( 2 * M.PI ) / p ) ) + b;
};
easings.easeOutElastic   = ( t, b, c, d ) => {
	var p = 0;
	var a = c;
	if( t == 0 ) {
		return b;
	}
	if( ( t /= d ) == 1 ) {
		return b + c;
	}
	if( !p ) p = d * .3;
	if( a < M.abs( c ) ) {
		a     = c;
		var s = p / 4;
	} else {
		var s = p / ( 2 * M.PI ) * M.asin( c / a );
	}
	return a * M.pow( 2, -10 * t ) * M.sin( ( t * d - s ) * ( 2 * M.PI ) / p ) + c + b;
};
easings.easeInOutElastic = ( t, b, c, d ) => {
	var p = 0;
	var a = c;
	if( t == 0 ) {
		return b;
	}
	if( ( t /= d / 2 ) == 2 ) {
		return b + c;
	}
	if( !p ) p = d * ( .3 * 1.5 );
	if( a < M.abs( c ) ) {
		a     = c;
		var s = p / 4;
	} else {
		var s = p / ( 2 * M.PI ) * M.asin( c / a );
	}
	if( t < 1 ) {
		return -.5 * ( a * M.pow( 2, 10 * ( t -= 1 ) ) * M.sin( ( t * d - s ) * ( 2 * M.PI ) / p ) ) + b;
	}
	return a * M.pow( 2, -10 * ( t -= 1 ) ) * M.sin( ( t * d - s ) * ( 2 * M.PI ) / p ) * .5 + c + b;
};
easings.easeInBack       = ( t, b, c, d, s ) => {
	if( isUndefined( s ) ) {
		s = 1.70158;
	}
	return c * ( t /= d ) * t * ( ( s + 1 ) * t - s ) + b;
};
easings.easeOutBack      = ( t, b, c, d, s ) => {
	if( isUndefined( s ) ) {
		s = 1.70158;
	}
	return c * ( ( t = t / d - 1 ) * t * ( ( s + 1 ) * t + s ) + 1 ) + b;
};
easings.easeInOutBack    = ( t, b, c, d, s ) => {
	if( isUndefined( s ) ) {
		s = 1.70158;
	}
	return ( ( t /= d / 2 ) < 1 ) ? c / 2 * ( t * t * ( ( ( s *= ( 1.525 ) ) + 1 ) * t - s ) ) + b : c / 2 * ( ( t -= 2 ) * t * ( ( ( s *= ( 1.525 ) ) + 1 ) * t + s ) + 2 ) + b;
};
easings.easeInBounce     = ( t, b, c, d ) => {
	return c - easings.easeOutBounce( d - t, 0, c, d ) + b;
};
easings.easeOutBounce    = ( t, b, c, d ) => {
	if( ( t /= d ) < ( 1 / 2.75 ) ) {
		return c * ( 7.5625 * t * t ) + b;
	} else if( t < ( 2 / 2.75 ) ) {
		return c * ( 7.5625 * ( t -= ( 1.5 / 2.75 ) ) * t + .75 ) + b;
	} else if( t < ( 2.5 / 2.75 ) ) {
		return c * ( 7.5625 * ( t -= ( 2.25 / 2.75 ) ) * t + .9375 ) + b;
	} else {
		return c * ( 7.5625 * ( t -= ( 2.625 / 2.75 ) ) * t + .984375 ) + b;
	}
};
easings.easeInOutBounce  = ( t, b, c, d ) => ( t < d / 2 ) ? easings.easeInBounce( t * 2, 0, c, d ) * .5 + b : easings.easeOutBounce( t * 2 - d, 0, c, d ) * .5 + c * .5 + b;

const animation      = function( from, to, duration, update, easing, done ) {
	if( !isNumber( from ) || !isNumber( to ) || !isNumber( duration ) || !isFunction( update ) ) {
		return 'OOO';
	}

	if( isString( easing ) && easings[ easing ] ) {
		easing = easings[ easing ];
	}

	if( !isFunction( easing ) ) {
		easing = window[ easing ] || null;
	}

	if( !isFunction( easing ) ) {
		easing = easings.linear;
	}

	if( !isFunction( done ) ) {
		done = function() {
		};
	}

	let canceled = false,
		change   = to - from,
		rAF      = v.win.requestAnimationFrame || ( ( callback ) => v.win.setTimeout( callback, 1000 / 60 ) ),
		loop     = function( timestamp ) {
			if( canceled ) {
				return;
			}
			var time = ( timestamp || +new Date() ) - start;
			if( time >= 0 ) {
				update( easing( time, from, change, duration ) );
			}
			if( time >= 0 && time >= duration ) {
				update( to );
				done();
			} else {
				rAF( loop );
			}
		};

	update( from );
	var start = v.win.performance && v.win.performance.now ? v.win.performance.now() : +new Date();
	rAF( loop );

	return { cancel: () => canceled = true, };
};
animation.animateCSS = function( element, property, from, to, duration, easing, done ) {
	let existing  = regex.cssProperty.exec( core( element ).css( property ) ),
		animateTo = regex.cssProperty.exec( to ),
		toNumber  = ( isUndefined( animateTo[ 1 ] ) ) ? to : animateTo[ 1 ],
		toUnit    = ( isUndefined( animateTo[ 2 ] ) ) ? existing[ 2 ] : animateTo[ 2 ];
	from          = ( isNull( from ) ) ? existing[ 1 ] : from;

	let update = function( value ) {
		return element.style[ property ] = value + toUnit;
	};

	from     = parseFloat( from ) || 0;
	toNumber = parseFloat( toNumber ) || 0;
	duration = parseInt( duration ) || 0;

	return animation( from, toNumber, duration, update, easing, done );
};
animation.cancel     = function( instance ) {
	if( !instance ) {
		return;
	}
	instance.cancel();
};

fn.animation = function( property, to, duration, easing, callback ) {
	return this.each( ( i, elem ) => {
		animation.animateCSS( elem, property, null, to, duration, easing, callback );
	} );
};
