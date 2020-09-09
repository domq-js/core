export default function( ar ) {
	for( var r = [], i = 0, l = ar.length; i < l; ++i ) {
		window.wpopv.arrayLike( ar[ i ] ) ? ( r = r.concat( ar[ i ] ) ) : ( r[ r.length ] = ar[ i ] );
	}
	return r;
}
