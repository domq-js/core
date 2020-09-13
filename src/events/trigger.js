import { fn } from "../setup";
import { isFunction, isString } from "../core/typechecking";
import parseEventName from "./helper/parseEventName";
import getEventNameBubbling from "./helper/getEventNameBubbling";
import regex from "../regex";
import vars from "../core/vars";

fn.trigger = function( event, data ) {
	if( isString( event ) ) {
		const [ nameOriginal, namespaces ] = parseEventName( event ),
			  name                         = getEventNameBubbling( nameOriginal );

		if( !name ) {
			return this;
		}

		const type = regex.eventsMouse.test( name ) ? 'MouseEvents' : 'HTMLEvents';
		event      = vars.doc.createEvent( type );
		event.initEvent( name, true, true );
		event.namespace = namespaces.join( vars.eventsNamespacesSeparator );
		event.___ot     = nameOriginal;

	}

	event.___td        = data;
	const isEventFocus = ( event.___ot in vars.eventsFocus );

	return this.each( ( i, ele ) => {
		if( isEventFocus && isFunction( ele[ event.___ot ] ) ) {
			ele[ `___i${event.type}` ] = true; // Ensuring the native event is ignored
			ele[ event.___ot ]();
			ele[ `___i${event.type}` ] = false; // Ensuring the custom event is not ignored
		}
		ele.dispatchEvent( event );
	} );
};
