import collection from "../collection";

export default function filtered( main_instance, comparator ) {
	return !comparator ? main_instance : collection.filter( comparator );
}
