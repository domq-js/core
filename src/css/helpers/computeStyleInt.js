import computeStyle from "./computeStyle";

export default function( ele, prop ) {
	return parseInt( computeStyle( ele, prop ), 10 ) || 0;
}
