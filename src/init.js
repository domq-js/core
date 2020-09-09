let init = function( selector, parent = false ) {
	parent = parent || document;
	if( 'object' === typeof selector ) {
		this.el = ( selector[ 0 ] && selector[ 0 ] instanceof Element ) ? selector : [ selector ];
	} else if( 'string' === typeof selector ) {
		this.el = parent.querySelectorAll( selector );
	}

	// Convert ElementList to Array.
	this.el = [].slice.call( this.el );
	return this;
};


export default init;
