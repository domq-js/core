import vars from "../core/vars";
import { computeStyleInt, computeStyle } from "../css/helper";
import typechecking from "../core/typechecking";
import core from "../wrap";

const offset = {};

offset.offset = function() {
	const ele = this[ 0 ];

	if( !ele ) {
		return;
	}

	const rect = ele.getBoundingClientRect();
	return {
		top: rect.top + vars.win.pageYOffset,
		left: rect.left + vars.win.pageXOffset
	};
};

offset.offsetParent = function() {
	return this.map( ( i, ele ) => {
		let offsetParent = ele.offsetParent;
		while( offsetParent && computeStyle( offsetParent, 'position' ) === 'static' ) {
			offsetParent = offsetParent.offsetParent;
		}
		return offsetParent || vars.docEle;
	} );
};

offset.position = function() {
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

		if( offsetParent !== ele && typechecking.isElement( offsetParent ) ) {
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

export default offset;
