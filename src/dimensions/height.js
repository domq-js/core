import { fn } from "../setup";
import WidthHeightHandler from "./helper/WidthHeightHandler";

fn.height = function( value ) {
	return WidthHeightHandler.call( this, 'height', value );
};
