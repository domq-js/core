import core from "../wrap";
import { isDocument, isElement } from "@varunsridharan/js-is";
import { rclass, rid, rtag } from "../core/regex";

core.is = function( ele, selector ) {
	try {
		const matches = ele && ( ele.matches || ele.webkitMatchesSelector || ele.msMatchesSelector );
		return !!matches && !!selector && matches.call( ele, selector );
	} catch( e ) {
	}
};

core.find = function( sel, ctx ) {
	if( !sel || ( !isDocument( ctx ) && !isElement( ctx ) ) ) {
		return [];
	}

	if( rid.test( sel ) ) {
		return ctx.getElementById( sel.slice( 1 ) );
	}

	if( rclass.test( sel ) ) {
		return ctx.getElementsByClassName( sel.slice( 1 ) );
	}

	if( rtag.test( sel ) ) {
		return ctx.getElementsByTagName( sel );
	}
	return ctx.querySelectorAll( sel );
};

export default core;
