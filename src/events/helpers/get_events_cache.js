import vars from "../../core/vars";

export default function getEventsCache( ele ) {
	return ele[ vars.eventsNamespace ] = ( ele[ vars.eventsNamespace ] || {} );
}
