export default function( ...className ) {
	this.each( ( el ) => el.classList.remove( ...className ) );
	return this;
}
