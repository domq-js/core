import core, { fn } from "../setup";
import { isDocument, isElement, isFunction, isNull, isString, isUndefined, isWindow } from "../core/typechecking";
import _each from "../core/_each";
import { getSplitValues, matches } from "../helper";
import parseEventName from "./helper/parseEventName";
import getEventNameBubbling from "./helper/getEventNameBubbling";
import vars from "../core/vars";
import hasNamespaces from "./helper/hasNamespaces";
import removeEvent from "./helper/removeEvent";
import addEvent from "./helper/addEvent";

fn.on      = function( eventFullName, selector, data, callback, _one ) {
	if( !isString( eventFullName ) ) {
		for( const key in eventFullName ) {
			this.on( key, selector, data, eventFullName[ key ], _one );
		}
		return this;
	}

	if( !isString( selector ) ) {
		if( isUndefined( selector ) || isNull( selector ) ) {
			selector = '';
		} else if( isUndefined( data ) ) {
			data     = selector;
			selector = '';
		} else {
			callback = data;
			data     = selector;
			selector = '';
		}
	}

	if( !isFunction( callback ) ) {
		callback = data;
		data     = undefined;
	}

	if( !callback ) {
		return this;
	}

	_each( getSplitValues( eventFullName ), ( i, eventFullName ) => {
		const [ nameOriginal, namespaces ] = parseEventName( eventFullName ),
			  name                         = getEventNameBubbling( nameOriginal ),
			  isEventHover                 = ( nameOriginal in vars.eventsHover ),
			  isEventFocus                 = ( nameOriginal in vars.eventsFocus );

		if( !name ) {
			return;
		}

		this.each( ( i, ele ) => {
			if( !isElement( ele ) && !isDocument( ele ) && !isWindow( ele ) ) {
				return;
			}
			const finalCallback = function( event ) {
				if( event.target[ `___i${event.type}` ] ) {
					// Ignoring native event in favor of the upcoming custom one
					return event.stopImmediatePropagation();
				}

				if( event.namespace && !hasNamespaces( namespaces, event.namespace.split( vars.eventsNamespacesSeparator ) ) ) {
					return;
				}

				if( !selector && ( ( isEventFocus && ( event.target !== ele || event.___ot === name ) ) || ( isEventHover && event.relatedTarget && ele.contains( event.relatedTarget ) ) ) ) {
					return;
				}

				let thisArg = ele;

				if( selector ) {
					let target = event.target;
					while( !matches( target, selector ) ) {
						if( target === ele ) {
							return;
						}
						target = target.parentNode;
						if( !target ) {
							return;
						}
					}
					thisArg     = target;
					event.___cd = true; // Delegate
				}

				if( event.___cd ) {
					Object.defineProperty( event, 'currentTarget', {
						configurable: true,
						get() {
							// We need to define a getter for this to work everywhere
							return thisArg;
						}
					} );
				}

				Object.defineProperty( event, 'data', {
					configurable: true,
					get() {
						return data;
					}
				} );

				const returnValue = callback.call( thisArg, event, event.___td );
				if( _one ) {
					removeEvent( ele, name, namespaces, selector, finalCallback );
				}

				if( returnValue === false ) {
					event.preventDefault();
					event.stopPropagation();
				}
			};

			finalCallback.guid = callback.guid = ( callback.guid || core.guid++ );
			addEvent( ele, name, namespaces, selector, finalCallback );
		} );
	} );
	return this;
};
