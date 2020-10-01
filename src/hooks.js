import core from "./setup";

const hooksCSS  = {};
const hooksAttr = {};

core.hooks = { attr: hooksAttr, css: hooksCSS };
export default core.hooks;
