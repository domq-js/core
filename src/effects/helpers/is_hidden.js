import computeStyle from "../../css/helpers/compute_style";

export default function isHidden( ele ) {
	return computeStyle( ele, 'display' ) === 'none';
}
