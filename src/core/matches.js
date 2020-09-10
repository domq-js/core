export default function matches( ele, selector ) {
	const matches = ele && ( ele[ 'matches' ] || ele[ 'webkitMatchesSelector' ] || ele[ 'msMatchesSelector' ] );
	return !!matches && !!selector && matches.call( ele, selector );
}
