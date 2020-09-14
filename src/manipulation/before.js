import { fn } from "../setup";
import insertSelectors from "./helper/insertSelectors";

fn.before = function() {
	return insertSelectors( arguments, this, false, true );
};
