import computeStyleInt from "../../css/helpers/computeStyleInt";

export default function( ele, xAxis ) {
	return computeStyleInt( ele, `border${xAxis ? 'Left' : 'Top'}Width` ) + computeStyleInt( ele, `padding${xAxis ? 'Left' : 'Top'}` ) + computeStyleInt( ele, `padding${xAxis ? 'Right' : 'Bottom'}` ) + computeStyleInt( ele, `border${xAxis ? 'Right' : 'Bottom'}Width` );
}
