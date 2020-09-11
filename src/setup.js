import coreClass from "./core/core-class";

const core = coreClass.prototype.init;
core.fn    = core.prototype = coreClass.prototype;
core.guid  = 1;

export default core;
