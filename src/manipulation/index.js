import insertSelectors from "./helper";
import { filtered } from "../helper";
import { isUndefined, isElement } from "../core/typechecking";
import core from "../wrap";

export default {
	after: function() {
		return insertSelectors( arguments, this, false, false, false, true, true );
	},
	append: function() {
		return insertSelectors( arguments, this, false, false, true );
	},
	appendTo: function( selector ) {
		return insertSelectors( arguments, this, true, false, true );
	},
	before: function() {
		return insertSelectors( arguments, this, false, true );
	},
	clone: function() {
		return this.map( ( i, ele ) => ele.cloneNode( true ) );
	},
	detach: function( comparator ) {
		filtered( this, comparator ).each( ( i, ele ) => {
			if( ele.parentNode ) {
				ele.parentNode.removeChild( ele );
			}
		} );
		return this;
	},
	empty: function() {
		return this.each( ( i, ele ) => {
			while( ele.firstChild ) {
				ele.removeChild( ele.firstChild );
			}
		} );
	},
	html: function( html ) {
		if( !arguments.length ) {
			return this[ 0 ] && this[ 0 ].innerHTML;
		}

		if( isUndefined( html ) ) {
			return this;
		}

		return this.each( ( i, ele ) => {
			if( !isElement( ele ) ) {
				return;
			}
			ele.innerHTML = html;
		} );
	},
	insertAfter: function( selector ) {
		return insertSelectors( arguments, this, true, false, false, false, false, true );
	},
	insertBefore: function( selector ) {
		return insertSelectors( arguments, this, true, true );
	},
	prepend: function() {
		return insertSelectors( arguments, this, false, true, true, true, true );
	},
	prependTo: function( selector ) {
		return insertSelectors( arguments, this, true, true, true, false, false, true );
	},
	remove: function( comparator ) {
		filtered( this, comparator ).detach().off();
		return this;
	},
	replaceAll: function( selector ) {
		core( selector ).replaceWith( this );
		return this;
	},
	replaceWith: function( selector ) {
		return this.before( selector ).remove();
	},
	text: function( text ) {
		if( isUndefined( text ) ) {
			return this[ 0 ] ? this[ 0 ].textContent : '';
		}

		return this.each( ( i, ele ) => {
			if( !isElement( ele ) ) {
				return;
			}
			ele.textContent = text;
		} );

	},
	unwrap: function() {
		this.parent().each( ( i, ele ) => {
			if( ele.tagName === 'BODY' ) {
				return;
			}
			const $ele = core( ele );
			$ele.replaceWith( $ele.children() );
		} );
		return this;
	},
	wrap: function( selector ) {
		return this.each( ( i, ele ) => {
			const wrapper = core( selector )[ 0 ];
			core( ele ).wrapAll( !i ? wrapper : wrapper.cloneNode( true ) );
		} );
	},
	wrapAll: function( selector ) {
		let structure = core( selector ),
			wrapper   = structure[ 0 ];
		while( wrapper.children.length ) {
			wrapper = wrapper.firstElementChild;
		}
		this.first().before( structure );
		return this.appendTo( wrapper );
	},
	wrapInner: function( selector ) {
		return this.each( ( i, ele ) => {
			const $ele     = core( ele ),
				  contents = $ele.contents();
			contents.length ? contents.wrapAll( selector ) : $ele.append( selector );
		} );
	}
};
