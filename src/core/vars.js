const v                     = {  };
v.doc                       = document;
v.win                       = window;
v.isArray                   = Array.isArray;
v.ArrayProp                 = Array.prototype;
v.docEle                    = v.doc.documentElement;
v.celem                     = v.doc.createElement.bind( v.doc );
v.div                       = v.celem( 'div' );
v.table                     = v.celem( 'table' );
v.tbody                     = v.celem( 'tbody' );
v.tr                        = v.celem( 'tr' );
v.concat                    = v.ArrayProp.concat;
v.filter                    = v.ArrayProp.filter;
v.indexOf                   = v.ArrayProp.indexOf;
v.map                       = v.ArrayProp.map;
v.push                      = v.ArrayProp.push;
v.slice                     = v.ArrayProp.slice;
v.some                      = v.ArrayProp.some;
v.splice                    = v.ArrayProp.splice;
v.displayProperty           = '___cd';
v.propMap                   = {
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
v.vendorsPrefixes           = [ 'webkit', 'moz', 'ms' ];
v.numericProps              = {
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
v.eventsNamespace           = '___ce';
v.eventsNamespacesSeparator = '.';
v.eventsFocus               = {
	focus: 'focusin',
	blur: 'focusout'
};
v.eventsHover               = {
	mouseenter: 'mouseover',
	mouseleave: 'mouseout'
};
v.scriptAttributes          = [ 'type', 'src', 'nonce', 'noModule' ];


export default v;
