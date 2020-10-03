import { isUndefined } from "@varunsridharan/js-is";
import core from "../setup";

export function hookHandler( hookType, hookname, Type ) {
	if( !isUndefined( core.hooks[ hookType ][ hookname ] ) && Type && !isUndefined( core.hooks[ hookType ][ hookname ][ Type ] ) ) {
		return core.hooks[ hookType ][ hookname ][ Type ];
	}
	return false;
}

export function attrHook( hookName, type ) {
	return hookHandler( 'attr', hookName, type );
}

export function cssHook( hookName, type ) {
	return hookHandler( 'css', hookName, type );
}
