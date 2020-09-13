import { fn } from "../setup";
import isUndefined from "../typechecking/isUndefined";
import isString from "../typechecking/isString";
import isFunction from "../typechecking/isFunction";
import isElement from "../typechecking/isElement";
import isWindow from "../typechecking/isWindow";
import isDocument from "../typechecking/isDocument";
import removeEvent from "./helper/removeEvent";
import _each from "../core/_each";
import { getSplitValues, handleObjectDataLoop } from "../helper";
import parseEventName from "./helper/parseEventName";
import getEventNameBubbling from "./helper/getEventNameBubbling";

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
