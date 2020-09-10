import regex from "../../regex";

export default function queryEncode( prop, value ) {
	return `&${encodeURIComponent( prop )}=${encodeURIComponent( value.replace( regex.queryEncodeCRLF, '\r\n' ) )
		.replace( regex.queryEncodeSpace, '+' )}`;
}
