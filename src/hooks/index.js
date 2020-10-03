import core from "../setup";
import "./attr";
import attrHooks from "./attr";
import plainObject from "../utilities/plainObject";

core.hooks = {
	attr: attrHooks,
	css: plainObject(),
	prop: plainObject(),
};
