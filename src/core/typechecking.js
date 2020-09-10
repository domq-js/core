import CoreClass from './core-class';

export default {
	isWpopv: function( instance ) {
		return instance instanceof CoreClass;
	},
	isWindow: function( x ) {
		return !!x && x === x.window;
	},
	isDocument: function( x ) {
		return !!x && x.nodeType === 9;
	},
	isElement: function( x ) {
		return !!x && x.nodeType === 1;
	},
	isFunction: function( x ) {
		return typeof x === 'function';
	},
	isString: function( x ) {
		return typeof x === 'string';
	},
	isUndefined: function( x ) {
		return x === undefined;
	},
	isNull: function( x ) {
		return x === null;
	},
	isNumeric: function( x ) {
		return !isNaN( parseFloat( x ) ) && isFinite( x );
	},
};
