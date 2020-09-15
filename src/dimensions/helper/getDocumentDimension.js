import docEle from "../../core/vars/docEle";
import body from "../../core/vars/body";

export default function( doc, dimension ) {
	return Math.max( body[ `scroll${dimension}` ], docEle[ `scroll${dimension}` ], body[ `offset${dimension}` ], docEle[ `offset${dimension}` ], docEle[ `client${dimension}` ] );
}
