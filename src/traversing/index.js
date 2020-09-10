import core from '../core';

/**
 * Find a selector inside elements.
 *
 * @param {string} selector - The css selector of the element.
 * @return {Object} - returns the _lemon object to allow chaining methods.
 */
core.fn.find = function( selector ) {
	let found = [];
	this.each( function( el ) {
		let elFound = el.querySelectorAll( selector );
		if( elFound ) {
			found = found.concat( core.flatten( elFound ) );
		}
	} );
	return core( found );
};

/**
 * Get the direct parents of elements.
 *
 * @return {Object} - Returns the _lemon object to allow chaining methods.
 */
core.fn.parent = function() {
	let found = [];
	this.each( function( el ) {
		found = found.concat( el.parentNode );
	} );
	return core( found );
};

/**
 * Get the parents based on a selector.
 *
 * @param {string} selector - The CSS selector.
 * @return {Object} - returns the wpopv object to allow chaining methods.
 */
core.fn.parents = function( selector ) {
	let found = [],
		self  = this;
	this.each( function( el ) {
		let elFound = self.parents( selector, el );
		if( elFound ) {
			found = found.concat( core.flatten( elFound ) );
		}
	} );
	return core( found );
};

/**
 * Check the current matched set of elements against a selector, element, or jQuery object and return true if at least one of these elements matches the given arguments
 * @param selector
 */
core.fn.is = function( selector ) {
	return this._each( function( el ) {
		return ( el.matches || el.matchesSelector || el.msMatchesSelector || el.mozMatchesSelector || el.webkitMatchesSelector || el.oMatchesSelector ).call( el, selector );
	} );
};
