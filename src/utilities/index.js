const core = require( '../core' ).default;

/**
 * Validates if Given Object is a WPOPV
 * @param instance
 * @return {string|(function(*=, *=): "default")}
 */
core.is_wpopv = function( instance ) {
	return ( typeof instance !== 'undefined' && typeof instance !== 'string' && instance.wpopv );
};

/**
 * Validates if Given Object is a jQuery Instance.
 * @param instance
 * @return {*}
 */
core.is_jquery = function( instance ) {
	return ( typeof instance !== 'undefined' && typeof instance !== 'string' && instance.jQuery );
};
