import { fn } from "../setup";
import filtered from "../core/filtered";


fn.remove       = function( comparator ) {
	filtered( this, comparator ).detach().off();
	return this;
};
