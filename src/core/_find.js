import isElement from "../typechecking/isElement";
import isDocument from "../typechecking/isDocument";
import { rclass, rtag } from "./regex";

export default function( selector, context ) {
	return !selector || ( !isDocument( context ) && !isElement( context ) ) ? [] : rclass.test( selector ) ? context.getElementsByClassName( selector.slice( 1 ) ) : rtag.test( selector ) ? context.getElementsByTagName( selector ) : context.querySelectorAll( selector );
}
