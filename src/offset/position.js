import core, { fn } from "../setup";
import computeStyle from "../css/helpers/computeStyle";
import computeStyleInt from "../css/helpers/computeStyleInt";
import { isElement } from "@varunsridharan/js-is";

fn.position     = function() {
	const ele = this[ 0 ];
	if( !ele ) {
		return;
	}

	const isFixed = ( computeStyle( ele, 'position' ) === 'fixed' ),
		  offset  = isFixed ? ele.getBoundingClientRect() : this.offset();

	if( !isFixed ) {
		const doc        = ele.ownerDocument;
		let offsetParent = ele.offsetParent || doc.documentElement;
		while( ( offsetParent === doc.body || offsetParent === doc.documentElement ) && computeStyle( offsetParent, 'position' ) === 'static' ) {
			offsetParent = offsetParent.parentNode;
		}

		if( offsetParent !== ele && isElement( offsetParent ) ) {
			const parentOffset = core( offsetParent ).offset();
			offset.top -= parentOffset.top + computeStyleInt( offsetParent, 'borderTopWidth' );
			offset.left -= parentOffset.left + computeStyleInt( offsetParent, 'borderLeftWidth' );
		}
	}

	return {
		top: offset.top - computeStyleInt( ele, 'marginTop' ),
		left: offset.left - computeStyleInt( ele, 'marginLeft' )
	};

};
