/**
 * Insert every element in the set of matched elements to the end of the target.
 * @param content
 * @return {"default"}
 */
export default function( content ) {
	this.each( ( el ) => {
		this.each( window.wpopv.parseHTML( content ), ( _el ) => el.appendChild( _el ) );
	} );
	return this;
}
