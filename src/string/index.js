import regex from "../regex";

const stringHandler     = {};

stringHandler.camelCase = function( str ) {
	return str.replace( regex.camelCase, ( match, letter ) => letter.toUpperCase() );
};

export default stringHandler;
