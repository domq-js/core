import core, { fn } from "../setup";

fn.unwrap       = function() {
	this.parent().each( ( i, ele ) => {
		if( ele.tagName === 'BODY' ) {
			return;
		}
		const $ele = core( ele );
		$ele.replaceWith( $ele.children() );
	} );
	return this;
};
