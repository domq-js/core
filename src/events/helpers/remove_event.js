import getEventsCache from "./get_events_cache";
import hasNamespaces from "./has_namespaces";

export default function removeEvent( ele, name, namespaces, selector, callback ) {
	const cache = getEventsCache( ele );
	if( !name ) {

		for( name in cache ) {
			removeEvent( ele, name, namespaces, selector, callback );
		}

	} else if( cache[ name ] ) {
		cache[ name ] = cache[ name ].filter( ( [ ns, sel, cb ] ) => {
			if( ( callback && cb.guid !== callback.guid ) || !hasNamespaces( ns, namespaces ) || ( selector && selector !== sel ) ) {
				return true;
			}
			ele.removeEventListener( name, cb );
		} );
	}
};
