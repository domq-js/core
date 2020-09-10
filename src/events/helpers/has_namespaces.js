import vars from "../../core/vars";

export default function hasNamespaces( ns1, ns2 ) {
	return !ns2 || !vars.some.call( ns2, ( ns ) => ns1.indexOf( ns ) < 0 );
}
