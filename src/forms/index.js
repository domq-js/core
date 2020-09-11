import { each } from "../helper";
import { queryEncode, getValue } from "./helper";
import { isUndefined, isNull } from "../core/typechecking";
import regex from "../regex";
import { isArray, map } from "../core/vars";

export function serialize() {
	let query = '';
	this.each( ( i, ele ) => {
		each( ele.elements || [ ele ], ( i, ele ) => {
			if( ele.disabled || !ele.name || ele.tagName === 'FIELDSET' || regex.skippable.test( ele.type ) || ( regex.checkable.test( ele.type ) && !ele.checked ) ) {
				return;
			}

			const value = getValue( ele );
			if( !isUndefined( value ) ) {
				const values = isArray( value ) ? value : [ value ];
				each( values, ( i, value ) => {
					query += queryEncode( ele.name, value );
				} );
			}
		} );
	} );
	return query.slice( 1 );
}

export function val( value ) {
	if( !arguments.length ) {
		return this[ 0 ] && getValue( this[ 0 ] );
	}
	return this.each( ( i, ele ) => {
		const isSelect = ele.multiple && ele.options;
		if( isSelect || regex.checkable.test( ele.type ) ) {
			const eleValue = isArray( value ) ? map.call( value, String ) : ( isNull( value ) ? [] : [ String( value ) ] );
			if( isSelect ) {
				each( ele.options, ( i, option ) => {
					option.selected = eleValue.indexOf( option.value ) >= 0;
				}, true );
			} else {
				ele.checked = eleValue.indexOf( ele.value ) >= 0;
			}
		} else {
			ele.value = isUndefined( value ) || isNull( value ) ? '' : value;
		}
	} );
}
