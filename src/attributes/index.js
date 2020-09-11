import { isString, isElement, isNull, isUndefined } from "../core/typechecking";
import vars from "../core/vars";
import { each, getSplitValues } from "../helper";

/**
 * Element Attributes
 */
export function attr( attr, value ) {
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
}

export function removeAttr( attr ) {
	const attrs = getSplitValues( attr );
	return this.each( ( i, ele ) => {
		if( !isElement( ele ) ) {
			return;
		}
		each( attrs, ( i, a ) => ele.removeAttribute( a ) );
	} );
}

/**
 * Element Prop Attributes.
 */
export function prop( prop, value ) {
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
}

export function removeProp( prop ) {
	return this.each( ( i, ele ) => {
		let key    = vars.propMap[ prop ] || prop;
		ele[ key ] = null;
		delete ele[ key ];
	} );
}

/**
 * Element Class.
 */
export function addClass( cls ) {
	return this.toggleClass( cls, true );
}

export function hasClass( cls ) {
	return !!cls && vars.some.call( this, ( ele ) => isElement( ele ) && ele.classList.contains( cls ) );
}

export function removeClass( cls ) {
	if( arguments.length ) {
		return this.toggleClass( cls, false );
	}
	return this.attr( 'class', '' );
}

export function toggleClass( cls, force ) {
	const classes = getSplitValues( cls ), isForce = !isUndefined( force );
	return this.each( ( i, ele ) => {
		if( !isElement( ele ) ) {
			return;
		}
		each( classes, ( i, c ) => {
			if( isForce ) {
				force ? ele.classList.add( c ) : ele.classList.remove( c );
			} else {
				ele.classList.toggle( c );
			}
		} );
	} );
}
