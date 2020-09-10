export default function getDocumentDimension( doc, dimension ) {
	const docEle = doc.documentElement;
	return Math.max(
		doc.body[ `scroll${dimension}` ],
		docEle[ `scroll${dimension}` ],
		doc.body[ `offset${dimension}` ],
		docEle[ `offset${dimension}` ],
		docEle[ `client${dimension}` ]
	);
}
