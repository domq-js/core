import core, { fn } from "../setup";
import { pluck, unique } from "../helper";

fn.contents     = function() {
	return core( unique( pluck( this, ele => ele.tagName === 'IFRAME' ? [ ele.contentDocument ] : ( ele.tagName === 'TEMPLATE' ? ele.content.childNodes : ele.childNodes ) ) ) );
};
