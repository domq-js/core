import getEventsCache from "./get_events_cache";

export default function addEvent ( ele, name, namespaces, selector, callback ){
	const eventCache = getEventsCache ( ele );
	eventCache[name] = ( eventCache[name] || [] );
	eventCache[name].push ([ namespaces, selector, callback ]);
	ele.addEventListener ( name, callback );
}
