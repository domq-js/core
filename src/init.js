export default function( selector, parent = false ) {
	parent = parent || document;

	if( 'object' === typeof selector ) {
		this.el = ( selector[ 0 ] && selector[ 0 ] instanceof Element ) ? selector : [ selector ];
	} else if( typeof selector === 'string' ) {
		if( typeof parent === 'string' ) {
			let instance = window.wpopv( parent );
			return instance.find( selector );
		} else if( window.wpopv.is_wpopv( parent ) ) {
			return parent.find( selector );
		} else {
			this.el = parent.querySelectorAll( selector );
		}
	}

	this.el = [].slice.call( this.el );
	return this;
};
