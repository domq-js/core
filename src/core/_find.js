import { isDocument, isElement } from "@varunsridharan/js-is";
import dizzle from "dizzle/src/index";

export default function( sel, ctx ) {
	if( !sel || ( !isDocument( ctx ) && !isElement( ctx ) ) ) {
		return [];
	}

	return dizzle( sel, ctx );
}
