import { fn } from "../setup";
import elemAnimation from "./elemAnimation";

fn.animate = function( keyframes, speed, easing, callback ) {
	return elemAnimation( this, null, keyframes, speed, easing, callback );
};
