const wpopv = require( './core.js' ).default;
require( './attributes/index.js' ).default;

wpopv.fn.init           = require( './init.js' ).default;
wpopv.fn.init.prototype = wpopv.fn;

/**
 * Loops & Stuff
 */
wpopv.fn.each = require( './utilities/each' ).default;
export default wpopv;
