import core, { fn } from "../setup";

fn.wrapInner    = function( selector ) {
	return this.each( ( i, ele ) => {
		const $ele     = core( ele ),
			  contents = $ele.contents();
		contents.length ? contents.wrapAll( selector ) : $ele.append( selector );
	} );
};
