import { evFocus, evHover } from "../../core/vars/events";

export default function( name ) {
	return evHover[ name ] || evFocus[ name ] || name;
}
