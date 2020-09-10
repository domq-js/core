import pluck from "../../core/pluck";

export default function getValue( ele, filter ) {
	if( ele.multiple && ele.options ) {
		return pluck( filter.call( ele.options, option => option.selected && !option.disabled && !option.parentNode.disabled ), 'value' );
	}
	return ele.value || '';

}
