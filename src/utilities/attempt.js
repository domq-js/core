export default function( fn, arg ) {
	try {
		return fn( arg );
	} catch( _a ) {
		return arg;
	}
}
