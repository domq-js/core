/**
 * Insert every element in the set of matched elements to the end of the target.
 * @param selector
 * @return {"default"}
 */
export default function( selector ) {
	selector = document.querySelectorAll( selector );
	this.each( ( el ) => {
		this.each( selector, ( parentEl ) => parentEl.appendChild( el ) );
	} );
	return this;
}
