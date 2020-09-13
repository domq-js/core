import { rcssVariable } from "../../core/regex";

export default function( prop ) {
	return rcssVariable.test( prop );
}
