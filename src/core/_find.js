import isElement from "../typechecking/isElement";
import isDocument from "../typechecking/isDocument";
import regex from "../regex";

export default function( selector, context ) {
	return !selector || ( !isDocument( context ) && !isElement( context ) ) ? [] : regex.class.test( selector ) ? context.getElementsByClassName( selector.slice( 1 ) ) : regex.tag.test( selector ) ? context.getElementsByTagName( selector ) : context.querySelectorAll( selector );
}
