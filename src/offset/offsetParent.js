import { fn } from "../setup";
import computeStyle from "../css/helpers/computeStyle";
import { docEle } from "@varunsridharan/js-vars";

fn.offsetParent = function() {
	return this.map( ( i, ele ) => {
		let offsetParent = ele.offsetParent;
		while( offsetParent && computeStyle( offsetParent, 'position' ) === 'static' ) {
			offsetParent = offsetParent.offsetParent;
		}
		return offsetParent || docEle;
	} );
};
