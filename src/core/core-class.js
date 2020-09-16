import isWpopv from '../typechecking/isWpopv';
import isFunction from "../typechecking/isFunction";
import isString from "../typechecking/isString";
import doc from "./vars/doc";
import parseHTML from "../utilities/parseHTML";
import _find from "./_find";
import win from "./vars/win";
import { rhtml, rid } from "./regex";

class PickledVanilla {
	constructor( selector, context ) {
		if( !selector ) {
			return;
		}

		if( isWpopv( selector ) ) {
			return selector;
		}

		let eles = selector;

		if( isString( selector ) ) {
			const ctx = ( isWpopv( context ) ? context[ 0 ] : context ) || doc;
			eles      = rid.test( selector ) ? ctx.getElementById( selector.slice( 1 ) ) : rhtml.test( selector ) ? parseHTML( selector ) : _find( selector, ctx );
			if( !eles ) {
				return;
			}
		} else if( isFunction( selector ) ) {
			return this.ready( selector );
		}

		if( eles.nodeType || eles === win ) {
			eles = [ eles ];
		}

		this.length = eles.length;

		for( let i = 0, l = this.length; i < l; i++ ) {
			this[ i ] = eles[ i ];
		}
	}

	init( selector, context ) {
		return new PickledVanilla( selector, context );
	}
}

export default PickledVanilla;
