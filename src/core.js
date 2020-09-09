import init from './init';

let wpopv = function( selector, parent = false ) {
	// The wpopv object is actually just the init constructor 'enhanced'
	// Need init if wpopv is called (just allow error to be thrown if not included)
	return new wpopv.fn.init( selector, parent );
};

wpopv.fn                = wpopv.prototype = {
	wpopv: '@VERSION',
	constructor: wpopv,
};
wpopv.fn.init           = init;
wpopv.fn.init.prototype = wpopv.fn;

export default wpopv;
