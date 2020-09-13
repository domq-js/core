import isElement from "../typechecking/isElement";
import isDocument from "../typechecking/isDocument";
import { rclass, rtag } from "./regex";

export default function( sel, ctx ) {
	return !sel || ( !isDocument( ctx ) && !isElement( ctx ) ) ? [] : rclass.test( sel ) ? ctx.getElementsByClassName( sel.slice( 1 ) ) : rtag.test( sel ) ? ctx.getElementsByTagName( sel ) : ctx.querySelectorAll( sel );
}
