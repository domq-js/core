import core from "../wrap";
import { isDocument, isElement } from "@varunsridharan/js-is";
import dizzle from "dizzle/src/index";

core.dizzle = dizzle;

core.is = function( ele, selector ) {
	return dizzle.is( selector, ele );
};

core.find = function( sel, ctx ) {
	if( !sel || ( !isDocument( ctx ) && !isElement( ctx ) ) ) {
		return [];
	}

	return dizzle( sel, ctx );
};

export default core;
