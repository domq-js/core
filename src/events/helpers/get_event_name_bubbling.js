import vars from "../../core/vars";

export default function getEventNameBubbling( name ) {
	return vars.eventsHover[ name ] || vars.eventsFocus[ name ] || name;
}
