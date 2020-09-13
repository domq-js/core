import v from "../../core/vars";

export default function( eventName ) {
	const parts = eventName.split( v.eventsNamespacesSeparator );
	return [ parts[ 0 ], parts.slice( 1 ).sort() ];
}
