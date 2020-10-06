import { fn } from "../setup";
import elemAnimation from "../animation/elemAnimation";

fn.move = function( x, y, percent, speed, easing, callback ) {
	let prop = { 'transform': `translate(${x}, ${y})` };
	return elemAnimation( this, ( el ) => el.css( prop ), prop, speed, easing, callback );
};
