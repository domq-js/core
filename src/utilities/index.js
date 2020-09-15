import attempt from "./attempt.js";
import parseHTML from "./parseHTML.js";
import pluck from "./pluck.js";
import unique from "./unique.js";
import getScript from "./getScript.js";
import grep from "./grep.js";
import core from "../setup";

core.attempt   = attempt;
core.parseHTML = parseHTML;
core.pluck     = pluck;
core.unique    = unique;
core.getScript = getScript;
core.grep = grep;
