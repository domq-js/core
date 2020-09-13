import { fn } from "../setup";
import v from "../core/vars";

fn.offset       = function() {
	const ele = this[ 0 ];

	if( !ele ) {
		return;
	}

	const rect = ele.getBoundingClientRect();
	return {
		top: rect.top + v.win.pageYOffset,
		left: rect.left + v.win.pageXOffset
	};
};
