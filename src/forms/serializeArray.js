import { fn } from "../setup";
import serializeHandler from "./helper/serializeHandler";

fn.serializeArray  = function() {
	return serializeHandler( this, 'array' );
};
