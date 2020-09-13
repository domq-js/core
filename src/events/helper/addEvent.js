import getEventsCache from "./getEventsCache";

export default function( ele, name, namespaces, selector, callback ) {
	const eventCache   = getEventsCache( ele );
	eventCache[ name ] = ( eventCache[ name ] || [] );
	eventCache[ name ].push( [ namespaces, selector, callback ] );
	ele.addEventListener( name, callback );
}
