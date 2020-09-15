import { fn } from "../setup";
import win from "../core/vars/win";

fn.offset = function() {
	const ele = this[ 0 ];

	if( !ele ) {
		return;
	}

	const rect = ele.getBoundingClientRect();
	return {
		top: rect.top + win.pageYOffset,
		left: rect.left + win.pageXOffset
	};
};
