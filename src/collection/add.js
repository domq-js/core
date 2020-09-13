import core, { fn } from "../setup";
import { unique } from "../helper";

fn.add    = function( selector, context ) {
	return core( unique( this.get().concat( core( selector, context ).get() ) ) );
};
