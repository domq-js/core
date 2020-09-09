import core from '../core';
import addClass from "./class/addClass";
import hasClass from "./class/hasClass";
import toggleClass from "./class/toggleClass";
import removeClass from "./class/removeClass";
import replaceClass from "./class/replaceClass";
import show from "./effects/show";
import hide from "./effects/hide";
import css from './css';

core.fn.css          = css;
core.fn.addClass     = addClass;
core.fn.hasClass     = hasClass;
core.fn.toggleClass  = toggleClass;
core.fn.removeClass  = removeClass;
core.fn.replaceClass = replaceClass;
core.fn.show         = show;
core.fn.hide         = hide;
