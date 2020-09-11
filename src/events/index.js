import { isNull, isUndefined, isElement, isDocument, isWindow, isString, isFunction } from "../core/typechecking";
import { each, getSplitValues, matches } from "../helper";
import { doc, eventsFocus, eventsHover, eventsNamespacesSeparator } from "../core/vars";
import { parseEventName, getEventNameBubbling, removeEvent, hasNamespaces, addEvent } from "./helper";
import core from "../global-var";
import regex from "../regex";

export function off( eventFullName, selector, callback ) {
	if( isUndefined( eventFullName ) ) {
		this.each( ( i, ele ) => {
			if( !isElement( ele ) && !isDocument( ele ) && !isWindow( ele ) ) {
				return;
			}
			removeEvent( ele );
		} );

	} else if( !isString( eventFullName ) ) {
		for( const key in eventFullName ) {
			this.off( key, eventFullName[ key ] );
		}
	} else {
		if( isFunction( selector ) ) {
			callback = selector;
			selector = '';
		}
		each( getSplitValues( eventFullName ), ( i, eventFullName ) => {
			const [ nameOriginal, namespaces ] = parseEventName( eventFullName ),
				  name                         = getEventNameBubbling( nameOriginal );

			this.each( ( i, ele ) => {
				if( !isElement( ele ) && !isDocument( ele ) && !isWindow( ele ) ) return;
				removeEvent( ele, name, namespaces, selector, callback );
			} );
		} );
	}
	return this;
}

export function on( eventFullName, selector, data, callback, _one ) {
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

	each( getSplitValues( eventFullName ), ( i, eventFullName ) => {
		const [ nameOriginal, namespaces ] = parseEventName( eventFullName ),
			  name                         = getEventNameBubbling( nameOriginal ),
			  isEventHover                 = ( nameOriginal in eventsHover ),
			  isEventFocus                 = ( nameOriginal in eventsFocus );

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

				if( event.namespace && !hasNamespaces( namespaces, event.namespace.split( eventsNamespacesSeparator ) ) ) {
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
}

export function one( eventFullName, selector, data, callback ) {
	return this.on( eventFullName, selector, data, callback, true );
}

export function ready( callback ) {
	const cb = () => setTimeout( callback, 0, core );

	if( doc.readyState !== 'loading' ) {
		cb();
	} else {
		doc.addEventListener( 'DOMContentLoaded', cb );
	}
	return this;
}

export function trigger( event, data ) {
	if( isString( event ) ) {
		const [ nameOriginal, namespaces ] = parseEventName( event ),
			  name                         = getEventNameBubbling( nameOriginal );

		if( !name ) {
			return this;
		}

		const type = regex.eventsMouse.test( name ) ? 'MouseEvents' : 'HTMLEvents';
		event      = doc.createEvent( type );
		event.initEvent( name, true, true );
		event.namespace = namespaces.join( eventsNamespacesSeparator );
		event.___ot     = nameOriginal;

	}

	event.___td        = data;
	const isEventFocus = ( event.___ot in eventsFocus );

	return this.each( ( i, ele ) => {
		if( isEventFocus && isFunction( ele[ event.___ot ] ) ) {
			ele[ `___i${event.type}` ] = true; // Ensuring the native event is ignored
			ele[ event.___ot ]();
			ele[ `___i${event.type}` ] = false; // Ensuring the custom event is not ignored
		}
		ele.dispatchEvent( event );
	} );
}
