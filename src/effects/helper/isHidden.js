import computeStyle from "../../css/helpers/computeStyle";

export default function isHidden( ele ) {
	return computeStyle( ele, 'display' ) === 'none';
}
