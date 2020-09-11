import {computeStyleInt} from "../css/helper";

export function getDocumentDimension( doc, dimension ) {
	const docEle = doc.documentElement;
	return Math.max(
		doc.body[ `scroll${dimension}` ],
		docEle[ `scroll${dimension}` ],
		doc.body[ `offset${dimension}` ],
		docEle[ `offset${dimension}` ],
		docEle[ `client${dimension}` ]
	);
}

export function getExtraSpace ( ele, xAxis){
	return computeStyleInt ( ele, `border${ xAxis ? 'Left' : 'Top' }Width` ) + computeStyleInt ( ele, `padding${ xAxis ? 'Left' : 'Top' }` ) + computeStyleInt ( ele, `padding${ xAxis ? 'Right' : 'Bottom' }` ) + computeStyleInt ( ele, `border${ xAxis ? 'Right' : 'Bottom' }Width` );
}
