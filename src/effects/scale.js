import { fn } from "../setup";
import elemAnimation from "../animation/elemAnimation";

fn.scale = function( percent, speed, easing, callback ) {
	let prop = { 'transform': `scale(${percent / 100})` };
	return elemAnimation( this, ( el ) => el.css( prop ), prop, speed, easing, callback );
};
