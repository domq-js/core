import core from './core';

core.window               = window;
core.document             = window.document;
core.documentElement      = core.document.documentElement;
core.isIE                 = core.document.documentMode;
core.arr                  = [];
core.class2type           = {};
core.pnum                 = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;
core.rcheckableType       = ( /^(?:checkbox|radio)$/i );
core.rsingleTag           = ( /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i );
core.rnothtmlwhite        = ( /[^\x20\t\r\n\f]+/g );
core.getProto             = Object.getPrototypeOf;
core.hasOwn               = core.class2type.hasOwnProperty;
core.fnToString           = core.hasOwn.toString;
core.indexOf              = core.arr.indexOf;
core.pop                  = core.arr.pop;
core.push                 = core.arr.push;
core.slice                = core.arr.slice;
core.sort                 = core.arr.sort;
core.toString             = core.class2type.toString;
core.ObjectFunctionString = core.fnToString.call( Object );


/**
 * Support: IE 11+, Edge 18+
 * Provide fallback for browsers without Array#flat.
 * @param array
 * @return {arr}
 */
core.flat = function( array ) {
	return core.arr.flat ? core.arr.flat.call( array ) : core.arr.concat.apply( [], array );
};

/**
 * Validates if given object is a window object.
 * @param obj
 * @return {boolean|boolean}
 */
core.isWindow = function isWindow( obj ) {
	return obj != null && obj === obj.window;
};

core.rcssNum = function() {
	return new RegExp( '^(?:([+-])=|)(' + core.pnum + ')([a-z%]*)$', 'i' );
};
