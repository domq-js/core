import vars from "../../core/vars";

export default function parseEventName( eventName ) {
	const parts = eventName.split( vars.eventsNamespacesSeparator );
	return [ parts[ 0 ], parts.slice( 1 ).sort() ];
	// [name, namespace[]]
}
