export default function( className, force = null ) {
	this.each( ( el ) => el.classList.toggle( className, force ) );
	return this;
}
