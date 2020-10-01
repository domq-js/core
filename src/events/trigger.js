import { fn } from "../setup";
import isString from "../typechecking/isString";
import isFunction from "../typechecking/isFunction";
import parseEventName from "./helper/parseEventName";
import getEventNameBubbling from "./helper/getEventNameBubbling";
import { evFocus, evNamespacesSep } from "../core/vars/events";
import { reventsMouse } from "../core/regex";
import { doc } from "@varunsridharan/js-vars";

fn.trigger = function( event, data ) {
	if( isString( event ) ) {
		const [ nameOriginal, namespaces ] = parseEventName( event ),
			  name                         = getEventNameBubbling( nameOriginal );

		if( !name ) {
			return this;
		}

		const type = reventsMouse.test( name ) ? 'MouseEvents' : 'HTMLEvents';
		event      = doc.createEvent( type );
		event.initEvent( name, true, true );
		event.namespace = namespaces.join( evNamespacesSep );
		event.___ot     = nameOriginal;

	}

	event.___td        = data;
	const isEventFocus = ( event.___ot in evFocus );

	return this.each( ( i, ele ) => {
		if( isEventFocus && isFunction( ele[ event.___ot ] ) ) {
			ele[ `___i${event.type}` ] = true;
			ele[ event.___ot ]();
			ele[ `___i${event.type}` ] = false;
		}
		ele.dispatchEvent( event );
	} );
};
