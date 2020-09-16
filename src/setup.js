import coreClass from "./core/core-class";

export const fn = coreClass.prototype;
const core      = fn.init;
core.fn         = core.prototype = fn;
core.guid       = 1;
fn.length       = 0;

export default core;
