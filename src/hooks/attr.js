import attrBools from "../core/vars/attrBools";
import _each from "../core/_each";

const attrHooks = {};

_each( attrBools, function( i, type ) {
	attrHooks[ type ] = Object.create( {
		get: ( elem ) => elem.getAttribute( type ) != null ? type.toLowerCase() : null,
		set: ( elem, name, value ) => {
			( value === false ) ? elem.removeAttribute( elem, name ) : elem.setAttribute( name, name );
			return name;
		},
	} );
} );

export default attrHooks;
