import vars from "../core/vars";
import core from "../wrap";
import typechecking from "../core/typechecking";
import regex from "../regex";

const utilities  = {},
	  containers = {
		  '*': vars.div,
		  tr: vars.tbody,
		  td: vars.tr,
		  th: vars.tr,
		  thead: vars.table,
		  tbody: vars.table,
		  tfoot: vars.table
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
	if( !typechecking.isString( html ) ) {
		return [];
	}

	if( regex.singleTag.test( html ) ) {
		return [ vars.createElement( RegExp.$1 ) ];
	}
	const fragment      = regex.fragment.test( html ) && RegExp.$1,
		  container     = containers[ fragment ] || containers[ '*' ];
	container.innerHTML = html;
	return core( container.childNodes ).detach().get();
};

export default utilities;
