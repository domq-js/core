import core, { fn } from "../setup";

fn.wrapAll = function( selector ) {
	let structure = core( selector ),
		wrapper   = structure[ 0 ];
	while( wrapper.children.length ) {
		wrapper = wrapper.firstElementChild;
	}
	this.first().before( structure );
	return this.appendTo( wrapper );
};
