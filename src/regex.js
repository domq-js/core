export default {
	id: /^#(?:[\w-]|\\.|[^\x00-\xa0])*$/,
	class: /^\.(?:[\w-]|\\.|[^\x00-\xa0])*$/,
	html: /<.+>/,
	tag: /^\w+$/,
	splitValues: /\S+/g,
	camelCase: /-([a-z])/g,
	fragment: /^\s*<(\w+)[^>]*>/,
	singleTag: /^<(\w+)\s*\/?>(?:<\/\1>)?$/,
	cssVariable: /^--/,
	JSONString: /^\s+|\s+$/,
	eventsMouse: /^(mouse|pointer|contextmenu|drag|drop|click|dblclick)/i,
	queryEncodeSpace: /%20/g,
	queryEncodeCRLF: /\r?\n/g,
	skippable: /file|reset|submit|button|image/i,
	checkable: /radio|checkbox/i
};
