const vars                     = {};
vars.doc                       = document;
vars.win                       = window;
vars.isArray                   = Array.isArray;
vars.ArrayProp                 = Array.prototype;
vars.docEle                    = vars.doc.documentElement;
vars.celem                     = vars.doc.createElement.bind( vars.doc );
vars.div                       = vars.celem( 'div' );
vars.table                     = vars.celem( 'table' );
vars.tbody                     = vars.celem( 'tbody' );
vars.tr                        = vars.celem( 'tr' );
vars.concat                    = vars.ArrayProp.concat;
vars.filter                    = vars.ArrayProp.filter;
vars.indexOf                   = vars.ArrayProp.indexOf;
vars.map                       = vars.ArrayProp.map;
vars.push                      = vars.ArrayProp.push;
vars.slice                     = vars.ArrayProp.slice;
vars.some                      = vars.ArrayProp.some;
vars.splice                    = vars.ArrayProp.splice;
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


