import { fn } from "../setup";
import serializeHandler from "./helper/serializeHandler";

fn.serialize = function() {
	return serializeHandler.call( this, 's' );
};
