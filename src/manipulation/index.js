import insertSelectors from "./helper";
import { filtered } from "../helper";
import { isUndefined, isElement } from "../core/typechecking";
import core, { fn } from "../setup";

fn.after        = function() {
	return insertSelectors( arguments, this, false, false, false, true, true );
};
fn.append       = function() {
	return insertSelectors( arguments, this, false, false, true );
};
fn.appendTo     = function( selector ) {
	return insertSelectors( arguments, this, true, false, true );
};
fn.before       = function() {
	return insertSelectors( arguments, this, false, true );
};
fn.clone        = function() {
	return this.map( ( i, ele ) => ele.cloneNode( true ) );
};
fn.detach       = function( comparator ) {
	filtered( this, comparator ).each( ( i, ele ) => {
		if( ele.parentNode ) {
			ele.parentNode.removeChild( ele );
		}
	} );
	return this;
};
fn.empty        = function() {
	return this.each( ( i, ele ) => {
		while( ele.firstChild ) {
			ele.removeChild( ele.firstChild );
		}
	} );
};
fn.html         = function( html ) {
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
};
fn.insertAfter  = function( selector ) {
	return insertSelectors( arguments, this, true, false, false, false, false, true );
};
fn.insertBefore = function( selector ) {
	return insertSelectors( arguments, this, true, true );
};
fn.prepend      = function() {
	return insertSelectors( arguments, this, false, true, true, true, true );
};
fn.prependTo    = function( selector ) {
	return insertSelectors( arguments, this, true, true, true, false, false, true );
};
fn.remove       = function( comparator ) {
	filtered( this, comparator ).detach().off();
	return this;
};
fn.replaceAll   = function( selector ) {
	core( selector ).replaceWith( this );
	return this;
};
fn.replaceWith  = function( selector ) {
	return this.before( selector ).remove();
};
fn.text         = function( text ) {
	if( isUndefined( text ) ) {
		return this[ 0 ] ? this[ 0 ].textContent : '';
	}

	return this.each( ( i, ele ) => {
		if( !isElement( ele ) ) {
			return;
		}
		ele.textContent = text;
	} );

};
fn.unwrap       = function() {
	this.parent().each( ( i, ele ) => {
		if( ele.tagName === 'BODY' ) {
			return;
		}
		const $ele = core( ele );
		$ele.replaceWith( $ele.children() );
	} );
	return this;
};
fn.wrap         = function( selector ) {
	return this.each( ( i, ele ) => {
		const wrapper = core( selector )[ 0 ];
		core( ele ).wrapAll( !i ? wrapper : wrapper.cloneNode( true ) );
	} );
};
fn.wrapAll      = function( selector ) {
	let structure = core( selector ),
		wrapper   = structure[ 0 ];
	while( wrapper.children.length ) {
		wrapper = wrapper.firstElementChild;
	}
	this.first().before( structure );
	return this.appendTo( wrapper );
};
fn.wrapInner    = function( selector ) {
	return this.each( ( i, ele ) => {
		const $ele     = core( ele ),
			  contents = $ele.contents();
		contents.length ? contents.wrapAll( selector ) : $ele.append( selector );
	} );
};
