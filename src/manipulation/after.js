import { fn } from "../setup";
import insertSelectors from "./helper/insertSelectors";

fn.after        = function() {
	return insertSelectors( arguments, this, false, false, false, true, true );
};
