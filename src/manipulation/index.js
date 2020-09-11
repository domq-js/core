import insertSelectors from "./helper";
import { filtered } from "../helper";
import { isUndefined, isElement } from "../core/typechecking";
import core from "../wrap";

export function after() {
	return insertSelectors( arguments, this, false, false, false, true, true );
}

export function append() {
	return insertSelectors( arguments, this, false, false, true );
}

export function appendTo( selector ) {
	return insertSelectors( arguments, this, true, false, true );
}

export function before() {
	return insertSelectors( arguments, this, false, true );
}

export function clone() {
	return this.map( ( i, ele ) => ele.cloneNode( true ) );
}

export function detach( comparator ) {
	filtered( this, comparator ).each( ( i, ele ) => {
		if( ele.parentNode ) {
			ele.parentNode.removeChild( ele );
		}
	} );
	return this;
}

export function empty() {
	return this.each( ( i, ele ) => {
		while( ele.firstChild ) {
			ele.removeChild( ele.firstChild );
		}
	} );
}

export function html( html ) {
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
}

export function insertAfter( selector ) {
	return insertSelectors( arguments, this, true, false, false, false, false, true );
}

export function insertBefore( selector ) {
	return insertSelectors( arguments, this, true, true );
}

export function prepend() {
	return insertSelectors( arguments, this, false, true, true, true, true );
}

export function prependTo( selector ) {
	return insertSelectors( arguments, this, true, true, true, false, false, true );
}

export function remove( comparator ) {
	filtered( this, comparator ).detach().off();
	return this;
}

export function replaceAll( selector ) {
	core( selector ).replaceWith( this );
	return this;
}

export function replaceWith( selector ) {
	return this.before( selector ).remove();
}

export function text( text ) {
	if( isUndefined( text ) ) {
		return this[ 0 ] ? this[ 0 ].textContent : '';
	}

	return this.each( ( i, ele ) => {
		if( !isElement( ele ) ) {
			return;
		}
		ele.textContent = text;
	} );

}

export function unwrap() {
	this.parent().each( ( i, ele ) => {
		if( ele.tagName === 'BODY' ) {
			return;
		}
		const $ele = core( ele );
		$ele.replaceWith( $ele.children() );
	} );
	return this;
}

export function wrap( selector ) {
	return this.each( ( i, ele ) => {
		const wrapper = core( selector )[ 0 ];
		core( ele ).wrapAll( !i ? wrapper : wrapper.cloneNode( true ) );
	} );
}

export function wrapAll( selector ) {
	let structure = core( selector ),
		wrapper   = structure[ 0 ];
	while( wrapper.children.length ) {
		wrapper = wrapper.firstElementChild;
	}
	this.first().before( structure );
	return this.appendTo( wrapper );
}

export function wrapInner( selector ) {
	return this.each( ( i, ele ) => {
		const $ele     = core( ele ),
			  contents = $ele.contents();
		contents.length ? contents.wrapAll( selector ) : $ele.append( selector );
	} );
}
