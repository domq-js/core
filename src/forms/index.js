import { _each } from "../helper";
import { getValue } from "./helper";
import { isUndefined, isNull } from "../core/typechecking";
import regex from "../regex";
import vars from "../core/vars";
import { fn } from "../setup";

const serializeHandler = function( instance, type ) {
	let return_val = ( 'object' === type ) ? {} : [];

	instance.each( ( i, form ) => {
		_each( form.elements, ( i, field ) => {
			if( !field.name || field.disabled || [ 'file', 'reset', 'submit', 'button' ].indexOf( field.type ) > -1 ) {
				return;
			}

			if( field.type === 'select-multiple' ) {
				let options = [];
				Array.prototype.slice.call( field.options ).forEach( function( option ) {
					if( !option.selected ) {
						return;
					}

					if( 'string' === type ) {
						return_val.push( encodeURIComponent( field.name ) + '=' + encodeURIComponent( option.value ) );
					} else if( 'array' === type ) {
						return_val.push( { name: field.name, value: option.value } );
					} else {
						options.push( option.value );
					}

				} );
				if( 'object' === type && options.length ) {
					return_val[ field.name ] = options;
				}
				return;
			}

			if( [ 'checkbox', 'radio' ].indexOf( field.type ) > -1 && !field.checked ) {
				return;
			}

			if( 'string' === type ) {
				return_val.push( encodeURIComponent( field.name ) + '=' + encodeURIComponent( field.value ) );
			} else if( 'array' === type ) {
				return_val.push( { name: field.name, value: field.value } );
			} else {
				return_val[ field.name ] = field.value;
			}
		} );
	} );
	return ( 'string' === type ) ? return_val.join( '&' ) : return_val;
};

fn.val             = function( value ) {
	if( !arguments.length ) {
		return this[ 0 ] && getValue( this[ 0 ] );
	}
	return this.each( ( i, ele ) => {
		const isSelect = ele.multiple && ele.options;
		if( isSelect || regex.checkable.test( ele.type ) ) {
			const eleValue = vars.isArray( value ) ? vars.map.call( value, String ) : ( isNull( value ) ? [] : [ String( value ) ] );
			if( isSelect ) {
				_each( ele.options, ( i, option ) => {
					option.selected = eleValue.indexOf( option.value ) >= 0;
				}, true );
			} else {
				ele.checked = eleValue.indexOf( ele.value ) >= 0;
			}
		} else {
			ele.value = isUndefined( value ) || isNull( value ) ? '' : value;
		}
	} );
};
fn.serialize       = function() {
	return serializeHandler( this, 'string' );
};
fn.serializeArray  = function() {
	return serializeHandler( this, 'array' );
};
fn.serializeObject = function() {
	return serializeHandler( this, 'object' );
};
