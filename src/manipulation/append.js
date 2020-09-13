import { fn } from "../setup";
import insertSelectors from "./helper/insertSelectors";

fn.append       = function() {
	return insertSelectors( arguments, this, false, false, true );
};
