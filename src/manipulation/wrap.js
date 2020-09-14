import core, { fn } from "../setup";

fn.wrap = function( selector ) {
	return this.each( ( i, ele ) => {
		const wrapper = core( selector )[ 0 ];
		core( ele ).wrapAll( !i ? wrapper : wrapper.cloneNode( true ) );
	} );
};
