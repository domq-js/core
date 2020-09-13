import v from "../../core/vars";

export default function( name ) {
	return v.eventsHover[ name ] || v.eventsFocus[ name ] || name;
}
