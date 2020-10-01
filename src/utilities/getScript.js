import core from "../setup";
import { celem } from "@varunsridharan/js-vars";

export default function( url, success ) {
	let script   = celem( 'script' );
	script.async = true;
	script.src   = url;

	if( success ) {
		script.onload = () => success();
	}
	core( 'script' ).before( script );
}
