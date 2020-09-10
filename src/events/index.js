import typechecking from "../core/typechecking";
import parseEventName from "./helpers/parse_event_name";
import getEventNameBubbling from "./helpers/get_event_name_bubbling";
import getSplitValues from "../core/get_split_values";
import each from "../core/each";
import removeEvent from "./helpers/remove_event";
import vars from "../core/vars";
import hasNamespaces from "./helpers/has_namespaces";
import matches from "../core/matches";
import addEvent from "./helpers/add_event";
import core from "../wrap";
import regex from "../regex";

const events = {};

events.off = function( eventFullName, selector, callback ) {
	if( typechecking.isUndefined( eventFullName ) ) {
		this.each( ( i, ele ) => {
			if( !typechecking.isElement( ele ) && !typechecking.isDocument( ele ) && !typechecking.isWindow( ele ) ) {
				return;
			}
			removeEvent( ele );
		} );

	} else if( !typechecking.isString( eventFullName ) ) {
		for( const key in eventFullName ) {
			this.off( key, eventFullName[ key ] );
		}
	} else {
		if( typechecking.isFunction( selector ) ) {
			callback = selector;
			selector = '';
		}
		each( getSplitValues( eventFullName ), ( i, eventFullName ) => {
			const [ nameOriginal, namespaces ] = parseEventName( eventFullName ),
				  name                         = getEventNameBubbling( nameOriginal );

			this.each( ( i, ele ) => {
				if( !typechecking.isElement( ele ) && !typechecking.isDocument( ele ) && !typechecking.isWindow( ele ) ) return;
				removeEvent( ele, name, namespaces, selector, callback );
			} );
		} );
	}
	return this;
};

events.on = function( eventFullName, selector, data, callback, _one ) {
	if( !typechecking.isString( eventFullName ) ) {
		for( const key in eventFullName ) {
			this.on( key, selector, data, eventFullName[ key ], _one );
		}
		return this;
	}

	if( !typechecking.isString( selector ) ) {
		if( typechecking.isUndefined( selector ) || typechecking.isNull( selector ) ) {
			selector = '';
		} else if( typechecking.isUndefined( data ) ) {
			data     = selector;
			selector = '';
		} else {
			callback = data;
			data     = selector;
			selector = '';
		}
	}

	if( !typechecking.isFunction( callback ) ) {
		callback = data;
		data     = undefined;
	}

	if( !callback ) {
		return this;
	}

	each( getSplitValues( eventFullName ), ( i, eventFullName ) => {
		const [ nameOriginal, namespaces ] = parseEventName( eventFullName ),
			  name                         = getEventNameBubbling( nameOriginal ),
			  isEventHover                 = ( nameOriginal in vars.eventsHover ),
			  isEventFocus                 = ( nameOriginal in vars.eventsFocus );

		if( !name ) {
			return;
		}

		this.each( ( i, ele ) => {
			if( !typechecking.isElement( ele ) && !typechecking.isDocument( ele ) && !typechecking.isWindow( ele ) ) {
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
			finalCallback.guid  = callback.guid = ( callback.guid || core.guid++ );
			addEvent( ele, name, namespaces, selector, finalCallback );
		} );
	} );
	return this;
};

events.one = function one( eventFullName, selector, data, callback ) {
	return this.on( eventFullName, selector, data, callback, true );
};

events.ready = function( callback ) {
	const cb = () => setTimeout( callback, 0, core );

	if( vars.doc.readyState !== 'loading' ) {
		cb();
	} else {
		vars.doc.addEventListener( 'DOMContentLoaded', cb );
	}
	return this;
};

events.trigger = function( event, data ) {
	if( typechecking.isString( event ) ) {
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
		if( isEventFocus && typechecking.isFunction( ele[ event.___ot ] ) ) {
			ele[ `___i${event.type}` ] = true; // Ensuring the native event is ignored
			ele[ event.___ot ]();
			ele[ `___i${event.type}` ] = false; // Ensuring the custom event is not ignored
		}
		ele.dispatchEvent( event );
	} );
};

export default events;
