import { body, docEle } from "@varunsridharan/js-vars";

export default function( doc, dimension ) {
	return Math.max( body[ `scroll${dimension}` ], docEle[ `scroll${dimension}` ], body[ `offset${dimension}` ], docEle[ `offset${dimension}` ], docEle[ `client${dimension}` ] );
}
