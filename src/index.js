const wpopv = require( './wrap.js' ).default;
export default ( ( global ) => {
	global.wpopv = global.$wpopv = wpopv;
} )( window );
