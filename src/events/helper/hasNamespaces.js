import v from "../../core/vars";

export default function( ns1, ns2 ) {
	return !ns2 || !v.some.call( ns2, ( ns ) => ns1.indexOf( ns ) < 0 );
}
