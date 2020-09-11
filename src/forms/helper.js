import pluck from "../core/pluck";
import regex from "../regex";

export function getValue( ele, filter ) {
	if( ele.multiple && ele.options ) {
		return pluck( filter.call( ele.options, option => option.selected && !option.disabled && !option.parentNode.disabled ), 'value' );
	}
	return ele.value || '';
}

export function queryEncode( prop, value ) {
	return `&${encodeURIComponent( prop )}=${encodeURIComponent( value.replace( regex.queryEncodeCRLF, '\r\n' ) )
		.replace( regex.queryEncodeSpace, '+' )}`;
}
