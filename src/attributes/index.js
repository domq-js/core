import { isString, isElement, isNull, isUndefined } from "../core/typechecking";
import vars from "../core/vars";
import { _each, getSplitValues } from "../helper";
import { fn } from "../setup";

/**
 * Element Attributes
 */

fn.attr       = function( attr, value ) {
	if( !attr ) {
		return;
	}

	if( isString( attr ) ) {
		if( arguments.length < 2 ) {
			if( !this[ 0 ] || !isElement( this[ 0 ] ) ) {
				return;
			}
			const value = this[ 0 ].getAttribute( attr );
			return isNull( value ) ? undefined : value;
		}
		if( isUndefined( value ) ) {
			return this;
		}
		if( isNull( value ) ) {
			return this.removeAttr( attr );
		}
		return this.each( ( i, ele ) => {
			if( !isElement( ele ) ) {
				return;
			}
			ele.setAttribute( attr, value );
		} );
	}
	for( const key in attr ) {
		this.attr( key, attr[ key ] );
	}
	return this;
};
fn.removeAttr = function( attr ) {
	const attrs = getSplitValues( attr );
	return this.each( ( i, ele ) => {
		if( !isElement( ele ) ) {
			return;
		}
		_each( attrs, ( i, a ) => ele.removeAttribute( a ) );
	} );
};

/**
 * Element Prop Attributes.
 */

fn.prop       = function( prop, value ) {
	if( !prop ) {
		return;
	}

	if( isString( prop ) ) {
		prop = vars.propMap[ prop ] || prop;
		if( arguments.length < 2 ) {
			return this[ 0 ] && this[ 0 ][ prop ];
		}
		return this.each( ( i, ele ) => {
			ele[ prop ] = value;
		} );
	}
	for( const key in prop ) {
		this.prop( key, prop[ key ] );
	}
	return this;
};
fn.removeProp = function( prop ) {
	return this.each( ( i, ele ) => {
		let key    = vars.propMap[ prop ] || prop;
		ele[ key ] = null;
		delete ele[ key ];
	} );
};

/**
 * Element Class.
 */

fn.addClass    = function( cls ) {
	return this.toggleClass( cls, true );
};
fn.hasClass    = function( cls ) {
	return !!cls && vars.some.call( this, ( ele ) => isElement( ele ) && ele.classList.contains( cls ) );
};
fn.removeClass = function( cls ) {
	if( arguments.length ) {
		return this.toggleClass( cls, false );
	}
	return this.attr( 'class', '' );
};
fn.toggleClass = function( cls, force ) {
	const classes = getSplitValues( cls ), isForce = !isUndefined( force );
	return this.each( ( i, ele ) => {
		if( !isElement( ele ) ) {
			return;
		}
		_each( classes, ( i, c ) => {
			if( isForce ) {
				force ? ele.classList.add( c ) : ele.classList.remove( c );
			} else {
				ele.classList.toggle( c );
			}
		} );
	} );
};

fn.html = function( html ) {
	if( !arguments.length ) {
		return this[ 0 ] && this[ 0 ].innerHTML;
	}
	if( isUndefined( html ) ) {
		return this;
	}
	return this.each( function( i, ele ) {
		if( !isElement( ele ) ) {
			return;
		}
		ele.innerHTML = html;
	} );
}
