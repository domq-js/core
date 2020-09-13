import v from "../core/vars";
import isString from "../typechecking/isString";
import regex from "../regex";
import core from "../setup";
import celem from "../core/vars/celem";

const containers = {
	'*': v.div,
	tr: v.tbody,
	td: v.tr,
	th: v.tr,
	thead: v.table,
	tbody: v.table,
	tfoot: v.table
};


//@TODO: Create elements inside a document fragment, in order to prevent inline event handlers from firing
//@TODO: Ensure the created elements have the fragment as their parent instead of null, this also ensures we can deal with detatched nodes more reliably
export default function( html ) {
	if( !isString( html ) ) {
		return [];
	}

	if( regex.singleTag.test( html ) ) {
		return [ celem( RegExp.$1 ) ];
	}
	const fragment      = regex.fragment.test( html ) && RegExp.$1,
		  container     = containers[ fragment ] || containers[ '*' ];
	container.innerHTML = html;
	return core( container.childNodes ).detach().get();
}
