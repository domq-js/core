const vars                     = {};
vars.doc                       = document;
vars.win                       = window;
vars.isArray                   = Array.isArray;
vars.ArrayPrototype            = Array.prototype;
vars.docEle                    = vars.doc.documentElement;
vars.createElement             = vars.doc.createElement.bind( vars.doc );
vars.div                       = vars.createElement( 'div' );
vars.table                     = vars.createElement( 'table' );
vars.tbody                     = vars.createElement( 'tbody' );
vars.tr                        = vars.createElement( 'tr' );
vars.concat                    = vars.ArrayPrototype.concat;
vars.filter                    = vars.ArrayPrototype.filter;
vars.indexOf                   = vars.ArrayPrototype.indexOf;
vars.map                       = vars.ArrayPrototype.map;
vars.push                      = vars.ArrayPrototype.push;
vars.slice                     = vars.ArrayPrototype.slice;
vars.some                      = vars.ArrayPrototype.some;
vars.splice                    = vars.ArrayPrototype.splice;
vars.displayProperty           = '___cd';
vars.propMap                   = {
	class: 'className', // General
	contenteditable: 'contentEditable', // General
	for: 'htmlFor', // Label
	readonly: 'readOnly', // Input
	maxlength: 'maxLength', // Input
	tabindex: 'tabIndex', // Input
	colspan: 'colSpan', // Table
	rowspan: 'rowSpan', // Table
	usemap: 'useMap' // Image
};
vars.vendorsPrefixes           = [ 'webkit', 'moz', 'ms' ];
vars.numericProps              = {
	animationIterationCount: true,
	columnCount: true,
	flexGrow: true,
	flexShrink: true,
	fontWeight: true,
	gridArea: true,
	gridColumn: true,
	gridColumnEnd: true,
	gridColumnStart: true,
	gridRow: true,
	gridRowEnd: true,
	gridRowStart: true,
	lineHeight: true,
	opacity: true,
	order: true,
	orphans: true,
	widows: true,
	zIndex: true
};
vars.eventsNamespace           = '___ce';
vars.eventsNamespacesSeparator = '.';
vars.eventsFocus               = {
	focus: 'focusin',
	blur: 'focusout'
};
vars.eventsHover               = {
	mouseenter: 'mouseover',
	mouseleave: 'mouseout'
};
vars.scriptAttributes          = [ 'type', 'src', 'nonce', 'noModule' ];
export default vars;


