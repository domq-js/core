export default function( o ) {
	return ( typeof o === 'object' && isFinite( o.length ) );
}
