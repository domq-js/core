export var doc                       = document;
export var win                       = window;
export var isArray                   = Array.isArray;
export var ArrayProp                 = Array.prototype;
export var docEle                    = doc.documentElement;
export var celem                     = doc.createElement.bind( doc );
export var div                       = celem( 'div' );
export var table                     = celem( 'table' );
export var tbody                     = celem( 'tbody' );
export var tr                        = celem( 'tr' );
export var concat                    = ArrayProp.concat;
export var filter                    = ArrayProp.filter;
export var indexOf                   = ArrayProp.indexOf;
export var map                       = ArrayProp.map;
export var push                      = ArrayProp.push;
export var slice                     = ArrayProp.slice;
export var some                      = ArrayProp.some;
export var splice                    = ArrayProp.splice;
export var displayProperty           = '___cd';
export var propMap                   = {
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
export var vendorsPrefixes           = [ 'webkit', 'moz', 'ms' ];
export var numericProps              = {
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
export var eventsNamespace           = '___ce';
export var eventsNamespacesSeparator = '.';
export var eventsFocus               = {
	focus: 'focusin',
	blur: 'focusout'
};
export var eventsHover               = {
	mouseenter: 'mouseover',
	mouseleave: 'mouseout'
};
export var scriptAttributes          = [ 'type', 'src', 'nonce', 'noModule' ];
