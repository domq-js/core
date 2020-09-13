export default function( ins, comparator ) {
	return !comparator ? ins : ins.filter( comparator );
}
