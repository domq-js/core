import { evNamespace } from "../../core/vars/events";

export default function( ele ) {
	return ele[ evNamespace ] = ( ele[ evNamespace ] || {} );
}
