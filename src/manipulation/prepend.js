import { fn } from "../setup";
import insertSelectors from "./helper/insertSelectors";

fn.prepend      = function() {
	return insertSelectors( arguments, this, false, true, true, true, true );
};
