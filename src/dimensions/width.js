import { fn } from "../setup";
import WidthHeightHandler from "./helper/WidthHeightHandler";

fn.width = function( value ) {
	return WidthHeightHandler.call( this, 'width', value );
};
