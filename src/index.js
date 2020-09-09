const wpopv = require( './wrap.js' ).default;
export default ( function( global ) {
	global.wpopv = global.$wpopv = wpopv;
} )( window );
