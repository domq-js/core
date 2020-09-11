import {
	div,
	tbody,
	tr,
	celem,
	table,
} from "../core/vars";
import core from "../global-var";
import { isString } from "../core/typechecking";
import regex from "../regex";

const utilities  = {},
	  containers = {
		  '*': div,
		  tr: tbody,
		  td: tr,
		  th: tr,
		  thead: table,
		  tbody: table,
		  tfoot: table
	  };


utilities.attempt = function( fn, arg ) {
	try {
		return fn( arg );
	} catch( _a ) {
		return arg;
	}
};

//@TODO: Create elements inside a document fragment, in order to prevent inline event handlers from firing
//@TODO: Ensure the created elements have the fragment as their parent instead of null, this also ensures we can deal with detatched nodes more reliably
utilities.parseHTML = function( html ) {
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
};

export default utilities;
