import { evNamespacesSep } from "../../core/vars/events";

export default function( eventName ) {
	const parts = eventName.split( evNamespacesSep );
	return [ parts[ 0 ], parts.slice( 1 ).sort() ];
}
