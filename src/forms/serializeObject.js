import { fn } from "../setup";
import serializeHandler from "./helper/serializeHandler";

fn.serializeObject = function() {
	return serializeHandler.call( this, 'o' );
};
