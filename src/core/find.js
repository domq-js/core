import vars from "./vars";
import { isDocument } from "./typechecking";
import regex from "../regex";

export default function( selector, context ) {
	return !selector || ( !isDocument( context ) && !vars.isElement( context ) ) ? [] : regex.class.test( selector ) ? context.getElementsByClassName( selector.slice( 1 ) ) : regex.tag.test( selector ) ? context.getElementsByTagName( selector ) : context.querySelectorAll( selector );

}
