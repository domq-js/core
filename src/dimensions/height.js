import { fn } from "../setup";
import WidthHeightHandler from "./helper/WidthHeightHandler";

fn.height = function( value ) {
	return WidthHeightHandler( this, 'height', value );
};
