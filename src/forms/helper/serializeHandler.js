import _each from "../../core/_each";
import _slice from "../../core/vars/_slice";

export default function( type ) {
	let return_val = ( 'object' === type ) ? {} : [];

	this.each( ( i, form ) => {
		_each( form.elements, ( i, field ) => {
			if( !field.name || field.disabled || [ 'file', 'reset', 'submit', 'button' ].indexOf( field.type ) > -1 ) {
				return;
			}

			if( field.type === 'select-multiple' ) {
				let options = [];
				_slice.call( field.options ).forEach( function( option ) {
					if( !option.selected ) {
						return;
					}

					if( 's' === type ) {
						return_val.push( encodeURIComponent( field.name ) + '=' + encodeURIComponent( option.value ) );
					} else if( 'a' === type ) {
						return_val.push( { name: field.name, value: option.value } );
					} else {
						options.push( option.value );
					}

				} );
				if( 'o' === type && options.length ) {
					return_val[ field.name ] = options;
				}
				return;
			}

			if( [ 'checkbox', 'radio' ].indexOf( field.type ) > -1 && !field.checked ) {
				return;
			}

			if( 's' === type ) {
				return_val.push( encodeURIComponent( field.name ) + '=' + encodeURIComponent( field.value ) );
			} else if( 'a' === type ) {
				return_val.push( { name: field.name, value: field.value } );
			} else {
				return_val[ field.name ] = field.value;
			}
		} );
	} );
	return ( 'string' === type ) ? return_val.join( '&' ) : return_val;
}
