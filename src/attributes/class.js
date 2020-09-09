export default {
	/**
	 * Add a class to elements.
	 *
	 * @param {string} className - The class-name we want to add to element(s).
	 * @return {Object} - Returns the _lemon object to allow chaining methods.
	 */
	addClass: function( ...className ) {
		this.each( function( el ) {
			el.classList.add( ...className );
		} );
		return this;
	},

	/**
	 * Figure out if the element has a class or not.
	 *
	 * @param {string} className - The class-name we're looking for.
	 * @return {boolean} - Whether the element has the class we need or not.
	 */
	hasClass: function( className ) {
		let found = false;
		this.each( function( el ) {
			if( el.classList.contains( className ) ) {
				found = true;
			}
		} );
		return found;
	},

	/**
	 * Toggles a class from elements.
	 *
	 * @param {string} className - Toggles A Class From ELement add/Remove
	 * @param {string} force -
	 * @return {Object} - Returns the _lemon object to allow chaining methods.
	 */
	toggleClass: function( className, force = null ) {
		this.each( function( el ) {
			el.classList.toggle( className, force );
		} );
		return this;
	},

	/**
	 * Remove a class from elements.
	 *
	 * @param {string} className - The class-name we want to add to element(s).
	 * @return {Object} - Returns the _lemon object to allow chaining methods.
	 */
	removeClass: function( ...className ) {
		this.each( function( el ) {
			el.classList.remove( ...className );
		} );
		return this;
	},

	/**
	 * Replace a class from elements.
	 *
	 * @param {string} from - The class-name we want to change from
	 * @param {string} to - The class-name we want to change to
	 * @return {Object} - Returns the _lemon object to allow chaining methods.
	 */
	replaceClass: function( from, to ) {
		this.each( function( el ) {
			el.classList.replace( from, to );
		} );
		return this;
	},
};

