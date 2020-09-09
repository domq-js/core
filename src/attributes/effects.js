export default {
	/**
	 * Hide the element(s).
	 *
	 * @return {Object} - returns the _lemon object to allow chaining methods.
	 */
	hide: function() {
		this.each( function( el ) {
			el.style.display = 'none';
		} );
		return this;
	},

	/**
	 * Show the element(s)
	 *
	 * @param {string} display - The css-display mode. Defaults to "block".
	 * @return {Object} - returns the _lemon object to allow chaining methods.
	 */
	show: function( display ) {
		display = display || 'block';
		this.each( function( el ) {
			el.style.display = display;
		} );
		return this;
	},
};
