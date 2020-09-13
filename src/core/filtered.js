export default function( instance, comparator ) {
	return !comparator ? instance : instance.filter( comparator );
}
