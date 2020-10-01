import { _some } from "@varunsridharan/js-vars";

export default function( ns1, ns2 ) {
	return !ns2 || !_some.call( ns2, ( ns ) => ns1.indexOf( ns ) < 0 );
}
