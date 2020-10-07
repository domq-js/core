import core from "../setup";
import isdomQ from "./isdomQ";
import {
	isBoolean,
	isDocument,
	isElement,
	isFunction,
	isNodeType,
	isNull,
	isNumber,
	isNumeric,
	isPlainObject,
	isString,
	isType,
	isUndefined,
	isWindow,
} from "@varunsridharan/js-is";

core.isBoolean     = isBoolean;
core.isDocument    = isDocument;
core.isElement     = isElement;
core.isFunction    = isFunction;
core.isNodetype    = isNodeType;
core.isNull        = isNull;
core.isNumber      = isNumber;
core.isNumeric     = isNumeric;
core.isPlainObject = isPlainObject;
core.isString      = isString;
core.isType        = isType;
core.isUndefined   = isUndefined;
core.isWindow      = isWindow;
core.isdomQ        = isdomQ;
