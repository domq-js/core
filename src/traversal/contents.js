import core, { fn } from "../setup";
import unique from "../utilities/unique";
import pluck from "../utilities/pluck";

fn.contents = function() {
	return core( unique( pluck( this, ele => ele.tagName === 'IFRAME' ? [ ele.contentDocument ] : ( ele.tagName === 'TEMPLATE' ? ele.content.childNodes : ele.childNodes ) ) ) );
};
