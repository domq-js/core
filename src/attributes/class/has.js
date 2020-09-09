export default function( className ) {
	for( var i = 0; i < this.el.length; i++ ) {
		return this.el[ i ].classList.contains( className );
	}
	return false;
}
