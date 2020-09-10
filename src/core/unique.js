import vars from "./vars";

export default function unique( arr ) {
	return arr.length > 1 ? vars.filter.call( arr, ( item, index, self ) => vars.indexOf.call( self, item ) === index ) : arr;
}
