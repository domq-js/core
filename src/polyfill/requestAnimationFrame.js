import cssVendors from "../core/vars/cssVendors";
import win from "../core/vars/win";
import _each from "../core/_each";

export default function() {
	let arf = 'requestAnimationFrame',
		caf = 'cancelAnimationFrame';

	if( !win[ arf ] && !win[ caf ] ) {
		_each( cssVendors, ( i, v ) => {
			win[ arf ] = win[ arf ] || win[ `${v}RequestAnimationFrame` ];
			win[ caf ] = win[ caf ] || win[ `${v}CancelAnimationFrame` ] || win[ `${v}CancelRequestAnimationFrame` ];
		} );
	}

	if( /iP(ad|hone|od).*OS 6/.test( win.navigator.userAgent ) || !win[ arf ] || !win[ caf ] ) {
		var lastTime = 0;
		win[ arf ]   = function( callback, e ) {
			var now      = win.performance.now(),
				nextTime = Math.max( lastTime + 16, now );
			return setTimeout( function() {
				callback( lastTime = nextTime );
			}, nextTime - now );
		};
		win[ caf ]   = clearTimeout;
	}

}
