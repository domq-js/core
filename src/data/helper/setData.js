import { attempt } from "../../utilities";
import { camelCase } from "../../string";

export default ( ele, key, value ) => ele.dataset[ camelCase( key ) ] = attempt( JSON.stringify, value );
