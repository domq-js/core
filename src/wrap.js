const wpopv = require( './core.js' ).default;

require( './vars.js' ).default;
require( './attributes/index.js' ).default;
require( './traversing/index.js' ).default;
require( './string/index.js' ).default;

/**
 * Loops & Stuff
 */
wpopv.fn.each = function( callback ) {
	for( var i = 0; i < this.el.length; i++ ) {
		callback( this.el[ i ] );
	}
	return this;
};
require( './utilities/array.js' ).default;
require( './utilities/index.js' ).default;


export default wpopv;
