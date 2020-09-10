import each from "../../core/each";
import core from "../../wrap";
import vars from "../../core/vars";

export default function insertSelectors( selectors, anchors, inverse, left, inside, reverseLoop1, reverseLoop2, reverseLoop3 ) {
	each( selectors, ( si, selector ) => {
		each( core( selector ), ( ti, target ) => {
			each( core( anchors ), ( ai, anchor ) => {
				const anchorFinal = inverse ? target : anchor,
					  targetFinal = inverse ? anchor : target,
					  indexFinal  = inverse ? ti : ai;
				vars.insertElement( anchorFinal, !indexFinal ? targetFinal : targetFinal.cloneNode( true ), left, inside, !indexFinal );
			}, reverseLoop3 );
		}, reverseLoop2 );
	}, reverseLoop1 );
	return anchors;
}
