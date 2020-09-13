import _some from "../../core/vars/_some";

export default function( ns1, ns2 ) {
	return !ns2 || !_some.call( ns2, ( ns ) => ns1.indexOf( ns ) < 0 );
}
