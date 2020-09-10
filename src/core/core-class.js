import typechecking from './typechecking';
import vars from './vars';
import utilities from '../utilities';
import find from './find';
import regex from "../regex";

class PickledVanilla {
	constructor( selector, context ) {
		if( !selector ) {
			return;
		}

		if( typechecking.isWpopv( selector ) ) {
			return selector;
		}

		let eles = selector;

		if( typechecking.isString( selector ) ) {
			const ctx = ( typechecking.isWpopv( context ) ? context[ 0 ] : context ) || vars.doc;

			eles = regex.id.test( selector ) ? ctx.getElementById( selector.slice( 1 ) ) : regex.html.test( selector ) ? utilities.parseHTML( selector ) : find( selector, ctx );
			if( !eles ) {
				return;
			}
		} else if( typechecking.isFunction( selector ) ) {
			//FIXME: `fn.ready` is not included in `core`, but it's actually a core functionality
			return this.ready( selector );
		}

		if( eles.nodeType || eles === vars.win ) {
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
