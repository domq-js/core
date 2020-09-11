import { isWpopv, isString, isFunction } from './typechecking';
import { doc, win } from './vars';
import utilities from '../utilities/index';
import { find } from '../helper';
import regex from "../regex";

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

			eles = regex.id.test( selector ) ? ctx.getElementById( selector.slice( 1 ) ) : regex.html.test( selector ) ? utilities.parseHTML( selector ) : find( selector, ctx );
			if( !eles ) {
				return;
			}
		} else if( isFunction( selector ) ) {
			//FIXME: `fn.ready` is not included in `core`, but it's actually a core functionality
			return this.ready( selector );
		}

		if( eles.nodeType || eles === win ) {
			eles = [ eles ];
		}

		this.length = eles.length;
		this.wpopv  = '1.0';

		for( let i = 0, l = this.length; i < l; i++ ) {
			this[ i ] = eles[ i ];
		}
	}

	init( selector, context ) {
		return new PickledVanilla( selector, context );
	}
}


export default PickledVanilla;
