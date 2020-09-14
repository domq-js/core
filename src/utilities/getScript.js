import celem from "../core/vars/celem";
import core from "../setup";

export default function( url, success ) {
	let script   = celem( 'script' );
	script.async = true;
	script.src   = url;

	if( success ) {
		script.onload = () => success();
	}
	core( 'script' ).before( script );
}
