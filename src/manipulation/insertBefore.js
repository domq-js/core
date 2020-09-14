import { fn } from "../setup";
import insertSelectors from "./helper/insertSelectors";

fn.insertBefore = function() {
	return insertSelectors( arguments, this, true, true );
};
