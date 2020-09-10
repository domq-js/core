export default {
	id: /^#(?:[\w-]|\\.|[^\x00-\xa0])*$/,
	class: /^\.(?:[\w-]|\\.|[^\x00-\xa0])*$/,
	html: /<.+>/,
	tag: /^\w+$/,
	splitValues: /\S+/g,
	camelCase: /-([a-z])/g,
	fragment: /^\s*<(\w+)[^>]*>/,
	singleTag: /^<(\w+)\s*\/?>(?:<\/\1>)?$/,
};
