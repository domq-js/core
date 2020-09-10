import computeStyle from "./compute_style";

export default function computeStyleInt( ele, prop ) {
	return parseInt( computeStyle( ele, prop ), 10 ) || 0;
}
