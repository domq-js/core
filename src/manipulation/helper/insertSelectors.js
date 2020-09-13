import _each from "../../core/_each";
import core from "../../setup";
import insertElement from "./insertElement";

export default function( selectors, anchors, inverse, left, inside, reverseLoop1, reverseLoop2, reverseLoop3 ) {
	_each( selectors, ( si, selector ) => {
		_each( core( selector ), ( ti, target ) => {
			_each( core( anchors ), ( ai, anchor ) => {
				const anchorFinal = inverse ? target : anchor,
					  targetFinal = inverse ? anchor : target,
					  indexFinal  = inverse ? ti : ai;
				insertElement( anchorFinal, !indexFinal ? targetFinal : targetFinal.cloneNode( true ), left, inside, !indexFinal );
			}, reverseLoop3 );
		}, reverseLoop2 );
	}, reverseLoop1 );
	return anchors;
}
