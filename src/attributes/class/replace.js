export default function( from, to ) {
	this.each( ( el ) => el.classList.replace(from, to) );
	return this;
}
