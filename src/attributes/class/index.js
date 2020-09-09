const wpopv = require( '../../core.js' ).default;

wpopv.fn.addClass     = require( './add.js' ).default;
wpopv.fn.hasClass     = require( './has.js' ).default;
wpopv.fn.toggleClass  = require( './toggle.js' ).default;
wpopv.fn.removeClass  = require( './remove.js' ).default;
wpopv.fn.replaceClass = require( './replace.js' ).default;

export default wpopv;
