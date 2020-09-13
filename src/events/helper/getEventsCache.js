import v from "../../core/vars";

export default function( ele ) {
	return ele[ v.eventsNamespace ] = ( ele[ v.eventsNamespace ] || {} );
}
