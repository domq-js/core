import { fn } from "../setup";
import getValue from "./helper/getValue";
import isNull from "../typechecking/isNull";
import isUndefined from "../typechecking/isUndefined";
import _each from "../core/_each";
import { rcheckable } from "../core/regex";
import { isArray } from "@varunsridharan/js-is";
import { _map } from "@varunsridharan/js-vars";

fn.val = function( value ) {
	if( !arguments.length ) {
		return this[ 0 ] && getValue( this[ 0 ] );
	}
	return this.each( ( i, ele ) => {
		const isSelect = ele.multiple && ele.options;
		if( isSelect || rcheckable.test( ele.type ) ) {
			const eleValue = isArray( value ) ? _map.call( value, String ) : ( isNull( value ) ? [] : [ String( value ) ] );
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
