import { fn } from "../setup";
import WidthHeightHandler from "./helper/WidthHeightHandler";

fn.width = function( value ) {
	return WidthHeightHandler( this, 'width', value );
};
