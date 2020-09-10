import stringHandler from "../../string";
import utilities from "../../utilities";

export default function setData( ele, key, value ) {
	value                                         = utilities.attempt( JSON.stringify, value );
	ele.dataset[ stringHandler.camelCase( key ) ] = value;
}
