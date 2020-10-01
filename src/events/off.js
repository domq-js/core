import { fn } from "../setup";
import removeEvent from "./helper/removeEvent";
import _each from "../core/_each";
import { getSplitValues, handleObjectDataLoop } from "../helper";
import parseEventName from "./helper/parseEventName";
import getEventNameBubbling from "./helper/getEventNameBubbling";
import { isDocument, isElement, isFunction, isString, isUndefined, isWindow } from "@varunsridharan/js-is";

fn.off = function( eventFullName, selector, callback ) {
	if( isUndefined( eventFullName ) ) {
		this.each( ( i, ele ) => {
			if( !isElement( ele ) && !isDocument( ele ) && !isWindow( ele ) ) {
				return;
			}
			removeEvent( ele );
		} );
	} else if( !isString( eventFullName ) ) {
		handleObjectDataLoop.call( this, eventFullName, 'off' );
	} else {
		if( isFunction( selector ) ) {
			callback = selector;
			selector = '';
		}
		_each( getSplitValues( eventFullName ), ( i, eventFullName ) => {
			const [ nameOriginal, namespaces ] = parseEventName( eventFullName ),
				  name                         = getEventNameBubbling( nameOriginal );

			this.each( ( i, ele ) => {
				if( !isElement( ele ) && !isDocument( ele ) && !isWindow( ele ) ) {
					return;
				}
				removeEvent( ele, name, namespaces, selector, callback );
			} );
		} );
	}
	return this;
};
