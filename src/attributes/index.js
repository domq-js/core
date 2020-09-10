import typechecking from "../core/typechecking";
import vars from "../core/vars";
import getSplitValues from "../core/get_split_values";
import each from "../core/each";

const attr = {};

/**
 * Element Attributes
 */
attr.attr = function( attr, value ) {
	if( !attr ) {
		return;
	}

	if( typechecking.isString( attr ) ) {
		if( arguments.length < 2 ) {
			if( !this[ 0 ] || !typechecking.isElement( this[ 0 ] ) ) {
				return;
			}
			const value = this[ 0 ].getAttribute( attr );
			return typechecking.isNull( value ) ? undefined : value;
		}
		if( typechecking.isUndefined( value ) ) {
			return this;
		}
		if( typechecking.isNull( value ) ) {
			return this.removeAttr( attr );
		}
		return this.each( ( i, ele ) => {
			if( !typechecking.isElement( ele ) ) {
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
attr.removeAttr = function( attr ) {
	const attrs = getSplitValues( attr );
	return this.each( ( i, ele ) => {
		if( !typechecking.isElement( ele ) ) {
			return;
		}
		each( attrs, ( i, a ) => ele.removeAttribute( a ) );
	} );
};

/**
 * Element Prop Attributes.
 */
attr.prop = function( prop, value ) {
	if( !prop ) {
		return;
	}

	if( typechecking.isString( prop ) ) {
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
attr.removeProp = function( prop ) {
	return this.each( ( i, ele ) => {
		let key = vars.propMap[ prop ] || prop;
		ele[key] = null;
		delete ele[key];
	} );
};

/**
 * Element Class.
 */
attr.addClass = function( cls ) {
	return this.toggleClass( cls, true );
};
attr.hasClass    = function( cls ) {
	return !!cls && vars.some.call( this, ( ele ) => typechecking.isElement( ele ) && ele.classList.contains( cls ) );
};
attr.removeClass = function( cls ) {
	if( arguments.length ) {
		return this.toggleClass( cls, false );
	}
	return this.attr( 'class', '' );
};
attr.toggleClass = function( cls, force ) {
	const classes = getSplitValues( cls ), isForce = !typechecking.isUndefined( force );
	return this.each( ( i, ele ) => {
		if( !typechecking.isElement( ele ) ) {
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
};

export default attr;
