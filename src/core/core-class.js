import isdomQ from '../typechecking/isdomQ';
import parseHTML from "../utilities/parseHTML";
import _find from "./_find";
import { rhtml } from "./regex";
import { doc, win } from "@varunsridharan/js-vars";
import { isFunction, isString } from "@varunsridharan/js-is";

class domQ {
	constructor( selector, context ) {
		if( !selector ) {
			return;
		}

		if( isdomQ( selector ) ) {
			return selector;
		}

		let eles = selector;

		if( isString( selector ) ) {
			const ctx = ( isdomQ( context ) ? context[ 0 ] : context ) || doc;
			eles      = ( rhtml.test( selector ) ) ? parseHTML( selector ) : _find( selector, ctx );
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
		return new domQ( selector, context );
	}
}

export default domQ;
