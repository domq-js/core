function isWpopv (instance) {
  return instance instanceof PickledVanilla;
}

/**
 * Array Related Vars.
 */
var Arr = Array;
var _Arrayprop = Arr.prototype;
var _concat = _Arrayprop.concat;
var _filter = _Arrayprop.filter;
var _indexOf = _Arrayprop.indexOf;
var _map = _Arrayprop.map;
var _push = _Arrayprop.push;
var _some = _Arrayprop.some;
var _slice = _Arrayprop.slice;
var _splice = _Arrayprop.splice;
var _isArray = Arr.isArray;
/**
 * Object Related Vars
 */

var _obj = Object;
/**
 * General Vars
 */

var win = window;
var doc = win.document;
var docEle = doc.documentElement;
var celem = doc.createElement.bind(doc);
var body = doc.body;

var v = {
  div: celem('div'),
  table: celem('table'),
  tbody: celem('tbody'),
  tr: celem('tr')
};

var rid = /^#(?:[\w-]|\\.|[^\x00-\xa0])*$/,
    rclass = /^\.(?:[\w-]|\\.|[^\x00-\xa0])*$/,
    rhtml = /<.+>/,
    rtag = /^\w+$/,
    rsplitValues = /\S+/g,
    rcamelCase = /-([a-z])/g,
    rfragment = /^\s*<(\w+)[^>]*>/,
    rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>)?$/,
    rcssVariable = /^--/,
    //rcssProperty      = /^(.*?)(em|ex|%|px|cm|mm|in|pt|pc|ch|rem|vh|vw|vmin|vmax|deg)?$/,
rJSONString = /^\s+|\s+$/,
    reventsMouse = /^(mouse|pointer|contextmenu|drag|drop|click|dblclick)/i,
    //rqueryEncodeSpace = /%20/g,
//rqueryEncodeCRLF  = /\r?\n/g,
//rskippable        = /file|reset|submit|button|image/i,
rcheckable = /radio|checkbox/i,
    rHTMLCDATA = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
    rscriptType = /^$|^module$|\/(java|ecma)script/;

function isObjectType(data, type) {
  type = "[object " + type + "]" || "[object]";
  return _obj.prototype.toString.call(data) === type;
}
function isType(data, type) {
  return typeof data === type;
}
function isNodeType(x, type) {
  return !!x && x.nodeType === type;
}
function isNull(value) {
  return value === null;
}
function isArray(value) {
  return _isArray && _isArray(value) || isObjectType(value, 'Array');
}
function isBoolean(value) {
  return value === true || value === false || isObjectType(value, 'Boolean');
}
function isFunction(value) {
  return isObjectType(value, 'Function') || isType(value, 'function');
}
function isNumber(value) {
  return isType(value, 'number');
}
function isNumeric(value) {
  return Number.isFinite(value);
}
function isString(value) {
  return isObjectType(value, 'String');
}
function isUndefined(value) {
  return value === void 0 || isType(value, 'undefined');
}
function isPlainObject(value) {
  if (!isType(value, 'object') || isNull(value)) {
    return false;
  }

  var proto = _obj.getPrototypeOf(value);

  return isNull(proto) || proto === _obj.prototype;
}
function isWindow(x) {
  return !!x && x === x.window;
}
function isElement(x) {
  return isNodeType(x, 1);
}
function isDocument(x) {
  return isNodeType(x, 9);
}

var containers = {
  '*': v.div,
  tr: v.tbody,
  td: v.tr,
  th: v.tr,
  thead: v.table,
  tbody: v.table,
  tfoot: v.table
}; //@TODO: Create elements inside a document fragment, in order to prevent inline event handlers from firing
//@TODO: Ensure the created elements have the fragment as their parent instead of null, this also ensures we can deal with detatched nodes more reliably

function parseHTML (html) {
  if (!isString(html)) {
    return [];
  }

  if (rsingleTag.test(html)) {
    return [celem(RegExp.$1)];
  }

  var fragment = rfragment.test(html) && RegExp.$1,
      container = containers[fragment] || containers['*'];
  container.innerHTML = html;
  return core(container.childNodes).detach().get();
}

function _find (sel, ctx) {
  if (!sel || !isDocument(ctx) && !isElement(ctx)) {
    return [];
  } // Regex Test For Class.


  if (rclass.test(sel)) {
    return ctx.getElementsByClassName(sel.slice(1));
  } // Regex Test For Tag.


  if (rtag.test(sel)) {
    return ctx.getElementsByTagName(sel);
  }

  return ctx.querySelectorAll(sel);
}

var PickledVanilla = /*#__PURE__*/function () {
  function PickledVanilla(selector, context) {
    if (!selector) {
      return;
    }

    if (isWpopv(selector)) {
      return selector;
    }

    var eles = selector;

    if (isString(selector)) {
      var ctx = (isWpopv(context) ? context[0] : context) || doc;
      eles = rid.test(selector) ? ctx.getElementById(selector.slice(1)) : rhtml.test(selector) ? parseHTML(selector) : _find(selector, ctx);

      if (!eles) {
        return;
      }
    } else if (isFunction(selector)) {
      return this.ready(selector);
    }

    if (eles.nodeType || eles === win) {
      eles = [eles];
    }

    this.length = eles.length;

    for (var i = 0, l = this.length; i < l; i++) {
      this[i] = eles[i];
    }
  }

  var _proto = PickledVanilla.prototype;

  _proto.init = function init(selector, context) {
    return new PickledVanilla(selector, context);
  };

  return PickledVanilla;
}();

var fn = PickledVanilla.prototype;
var core = fn.init;
core.fn = core.prototype = fn;
core.guid = 1;
fn.length = 0;

function extend() {
  for (var _len = arguments.length, sources = new Array(_len), _key = 0; _key < _len; _key++) {
    sources[_key] = arguments[_key];
  }

  var deep = isBoolean(sources[0]) ? sources.shift() : false,
      target = sources.shift(),
      length = sources.length;

  if (!target) {
    return {};
  }

  if (!length) {
    return extend(deep, core, target);
  }

  for (var i = 0; i < length; i++) {
    var source = sources[i];

    for (var key in source) {
      if (deep && (isArray(source[key]) || isPlainObject(source[key]))) {
        if (!target[key] || target[key].constructor !== source[key].constructor) {
          target[key] = new source[key].constructor();
        }

        extend(deep, target[key], source[key]);
      } else {
        target[key] = source[key];
      }
    }
  }

  return target;
}

function _each(arr, callback, _reverse) {
  if (_reverse) {
    var i = arr.length;

    while (i--) {
      if (callback.call(arr[i], i, arr[i]) === false) {
        return arr;
      }
    }
  } else if (isPlainObject(arr)) {
    var keys = _obj.keys(arr);

    for (var _i = 0, l = keys.length; _i < l; _i++) {
      var key = keys[_i];

      if (callback.call(arr[key], key, arr[key]) === false) {
        return arr;
      }
    }
  } else {
    for (var _i2 = 0, _l = arr.length; _i2 < _l; _i2++) {
      if (callback.call(arr[_i2], _i2, arr[_i2]) === false) {
        return arr;
      }
    }
  }

  return arr;
}

var cssNumericProp = {
  animationIterationCount: true,
  columnCount: true,
  flexGrow: true,
  flexShrink: true,
  fontWeight: true,
  gridArea: true,
  gridColumn: true,
  gridColumnEnd: true,
  gridColumnStart: true,
  gridRow: true,
  gridRowEnd: true,
  gridRowStart: true,
  lineHeight: true,
  opacity: true,
  order: true,
  orphans: true,
  widows: true,
  zIndex: true
};

core.animation = {
  'slow': 600,
  'default': 400,
  'fast': 200
};
core.cssNumber = cssNumericProp;

var hooksCSS = {};
var hooksAttr = {};
core.hooks = {
  attr: hooksAttr,
  css: hooksCSS
};
core.hooks;

var animationArgs = ['id', 'speed', 'direction', 'delay', 'easing', 'endDelay', 'fill', 'iterationStart', 'iterations'];

fn.animate = function (keyframes, speed, easing, callback) {
  var options = {};

  if (isPlainObject(keyframes)) {
    _each(animationArgs, function (i, key) {
      if (!isUndefined(keyframes[key])) {
        options[key] = keyframes[key];
        delete keyframes[key];
      }
    });
  }

  if (isFunction(speed)) {
    callback = speed;
  }

  if (isPlainObject(speed)) {
    options = extend(speed, options);
  }

  if (isPlainObject(easing)) {
    options = extend(easing, options);
  }

  if (isFunction(easing)) {
    callback = easing;
  }

  options.duration = !isNumber(speed) ? core.animation[speed] || core.animation["default"] : speed;
  options.easing = !isString(easing) ? 'linear' : easing;

  if (!isUndefined(options.loop)) {
    options.iterations = options.loop;
    delete options.loop;
  }

  if (!isUndefined(options.iterations) && options.iterations === -1) {
    options.iterations = Infinity;
  }

  return this.each(function (i, el) {
    var animate = el.animate(keyframes, options);

    if (isFunction(callback)) {
      animate.onfinish = function () {
        return callback(el);
      };
    }
  });
};

fn.addClass = function (cls) {
  return this.toggleClass(cls, true);
};

function getCompareFunction(comparator) {
  return isString(comparator) ? function (i, ele) {
    return matches(ele, comparator);
  } : isFunction(comparator) ? comparator : isWpopv(comparator) ? function (i, ele) {
    return comparator.is(ele);
  } : !comparator ? function () {
    return false;
  } : function (i, ele) {
    return ele === comparator;
  };
}
function getSplitValues(str) {
  if (isFunction(str)) {
    return [str];
  }

  return isString(str) ? str.match(rsplitValues) || [] : [];
}
function matches(ele, selector) {
  try {
    var _matches = ele && (ele.matches || ele.webkitMatchesSelector || ele.msMatchesSelector);

    return !!_matches && !!selector && _matches.call(ele, selector);
  } catch (e) {}
}
function handleObjectDataLoop(data, callback) {
  for (var key in data) {
    this[callback](key, data[key]);
  }
}
function setupExtraEventsFunctions() {
  _each('load error blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu'.split(' '), function (i, _event) {
    fn[_event] = function (eventData, callback) {
      return eventData || callback ? this.on(_event, eventData, callback) : this.trigger(_event, eventData, callback);
    };
  });
}
function access(value, index, elem) {
  return isFunction(value) ? value.call(elem, index, elem) : value;
}

fn.attr = function (attr, value) {
  if (!attr) {
    return;
  }

  if (isString(attr)) {
    if (arguments.length < 2) {
      if (!this[0] || !isElement(this[0])) {
        return;
      }

      var _value = this[0].getAttribute(attr);

      return isNull(_value) ? undefined : _value;
    }

    if (isUndefined(value)) {
      return this;
    }

    if (isNull(value)) {
      return this.removeAttr(attr);
    }

    return this.each(function (i, ele) {
      if (!isElement(ele)) {
        return;
      }

      ele.setAttribute(attr, value);
    });
  }

  handleObjectDataLoop.call(this, attr, 'attr');
  return this;
};

fn.hasAttr = function (attr) {
  return this[0] && this[0].hasAttribute(attr);
};

fn.hasClass = function (cls) {
  return !!cls && _some.call(this, function (ele) {
    return isElement(ele) && ele.classList.contains(cls);
  });
};

function attrHandler (from, to, isMove) {
  if (isMove === void 0) {
    isMove = false;
  }

  return this.each(function (i, el) {
    if (!isElement(el)) {
      return;
    }

    var instance = core(el);
    var $existing = instance.attr(from);

    if (!isUndefined($existing)) {
      instance.attr(to, $existing);

      if (isMove) {
        instance.removeAttr(from);
      }
    }
  });
}

fn.copyAttr = function (from, to) {
  return attrHandler.call(this, from, to);
};

fn.moveAttr = function (from, to) {
  return attrHandler.call(this, from, to, true);
};

fn.html = function (html) {
  if (!arguments.length) {
    return this[0] && this[0].innerHTML;
  }

  if (isUndefined(html)) {
    return this;
  }

  return this.each(function (i, ele) {
    if (!isElement(ele)) {
      return;
    }

    ele.innerHTML = access(html, i, ele);
  });
};

var cssMaps = {
  'class': 'className',
  contenteditable: 'contentEditable',
  'for': 'htmlFor',
  readonly: 'readOnly',
  maxlength: 'maxLength',
  tabindex: 'tabIndex',
  colspan: 'colSpan',
  rowspan: 'rowSpan',
  usemap: 'useMap'
};

fn.prop = function (prop, value) {
  if (!prop) {
    return;
  }

  if (isString(prop)) {
    prop = cssMaps[prop] || prop;

    if (arguments.length < 2) {
      return this[0] && this[0][prop];
    }

    return this.each(function (i, ele) {
      ele[prop] = access(value, i, ele);
    });
  }

  handleObjectDataLoop.call(this, prop, 'prop');
  return this;
};

fn.removeAttr = function (attr) {
  var attrs = getSplitValues(attr);
  return this.each(function (i, ele) {
    if (!isElement(ele)) {
      return;
    }

    _each(attrs, function (L, a) {
      ele.removeAttribute(access(a, i, ele));
    });
  });
};

fn.removeClass = function (cls) {
  return arguments.length ? this.toggleClass(cls, false) : this.attr('class', '');
};

fn.removeProp = function (prop) {
  return this.each(function (i, ele) {
    var key = cssMaps[prop] || prop;
    ele[key] = null;
    delete ele[key];
  });
};

fn.toggleClass = function (cls, force) {
  var classes = getSplitValues(cls),
      isForce = !isUndefined(force);
  return this.each(function (i, ele) {
    if (!isElement(ele)) {
      return;
    }

    _each(classes, function (i, c) {
      c = access(c, i, ele);

      if (isForce) {
        force ? ele.classList.add(c) : ele.classList.remove(c);
      } else {
        ele.classList.toggle(c);
      }
    });
  });
};

function unique (arr) {
  return arr.length > 1 ? _filter.call(arr, function (item, index, self) {
    return _indexOf.call(self, item) === index;
  }) : arr;
}

fn.add = function (selector, context) {
  return core(unique(this.get().concat(core(selector, context).get())));
};

fn.each = function (callback) {
  return _each(this, callback);
};

fn.eq = function (index) {
  return core(this.get(index));
};

fn.filter = function (comparator) {
  var compare = getCompareFunction(comparator);
  return core(_filter.call(this, function (ele, i) {
    return compare.call(ele, i, ele);
  }));
};

fn.first = function () {
  return this.eq(0);
};

fn.get = function (index) {
  if (isUndefined(index)) {
    return _slice.call(this);
  }

  index = Number(index);
  return this[index < 0 ? index + this.length : index];
};

fn.index = function (selector) {
  var child = selector ? core(selector)[0] : this[0],
      collection = selector ? this : core(child).parent().children();
  return _indexOf.call(collection, child);
};

fn.last = function () {
  return this.eq(-1);
};

fn.map = function (callback) {
  return core(_concat.apply([], _map.call(this, function (ele, i) {
    return callback.call(ele, i, ele);
  })));
};

fn.slice = function (start, end) {
  return core(_slice.call(this, start, end));
};

function isCSSVariable (prop) {
  return rcssVariable.test(prop);
}

function getSuffixedValue (prop, value, isVariable) {
  if (isVariable === void 0) {
    isVariable = isCSSVariable(prop);
  }

  return !isVariable && !cssNumericProp[prop] && isNumeric(value) ? value + "px" : value;
}

var cssVendors = ['webkit', 'moz', 'ms', 'o'];

function camelCase (str) {
  return str.replace(rcamelCase, function (match, letter) {
    return letter.toUpperCase();
  });
}

var prefixedProps = {},
    style = v.div.style;
function getPrefixedProp (prop, isVariable) {
  if (isVariable === void 0) {
    isVariable = isCSSVariable(prop);
  }

  if (isVariable) {
    return prop;
  }

  if (!prefixedProps[prop]) {
    var propCC = camelCase(prop),
        propUC = "" + propCC[0].toUpperCase() + propCC.slice(1),
        props = (propCC + " " + cssVendors.join(propUC + " ") + propUC).split(' ');

    _each(props, function (i, p) {
      if (p in style) {
        prefixedProps[prop] = p;
        return false;
      }
    });
  }

  return prefixedProps[prop];
}

function computeStyle (ele, prop, isVariable) {
  if (!isElement(ele)) {
    return;
  }

  var style = win.getComputedStyle(ele, null);
  return isVariable ? style.getPropertyValue(prop) || undefined : style[prop] || ele.style[prop];
}

fn.css = function (prop, value) {
  if (isString(prop)) {
    var isVariable = isCSSVariable(prop);
    prop = getPrefixedProp(prop, isVariable);

    if (arguments.length < 2) {
      return this[0] && computeStyle(this[0], prop, isVariable);
    }

    if (!prop) {
      return this;
    }

    value = getSuffixedValue(prop, value, isVariable);
    return this.each(function (i, ele) {
      if (!isElement(ele)) {
        return;
      }

      if (isVariable) {
        ele.style.setProperty(prop, value);
      } else {
        ele.style[prop] = value;
      }
    });
  }

  handleObjectDataLoop.call(this, prop, 'css');
  return this;
};

function attempt (fn, arg) {
  try {
    return fn(arg);
  } catch (_a) {
    return arg;
  }
}

function getData (ele, key) {
  var value = ele.dataset[key] || ele.dataset[camelCase(key)];
  return rJSONString.test(value) ? value : attempt(JSON.parse, value);
}

function setData (ele, key, value) {
  ele.dataset[camelCase(key)] = attempt(JSON.stringify, value);
}

fn.data = function (name, value) {
  if (!name) {
    if (!this[0]) {
      return;
    }

    var datas = {};

    for (var key in this[0].dataset) {
      datas[key] = getData(this[0], key);
    }

    return datas;
  }

  if (isString(name)) {
    if (arguments.length < 2) {
      return this[0] && getData(this[0], name);
    }

    if (isUndefined(value)) {
      return this;
    }

    return this.each(function (i, ele) {
      setData.call(ele, name, value);
    });
  }

  handleObjectDataLoop.call(this, name, 'data');
  return this;
};

function getDocumentDimension (doc, dimension) {
  return Math.max(body["scroll" + dimension], docEle["scroll" + dimension], body["offset" + dimension], docEle["offset" + dimension], docEle["client" + dimension]);
}

function computeStyleInt (ele, prop) {
  return parseInt(computeStyle(ele, prop), 10) || 0;
}

function getExtraSpace (ele, xAxis) {
  return computeStyleInt(ele, "border" + (xAxis ? 'Left' : 'Top') + "Width") + computeStyleInt(ele, "padding" + (xAxis ? 'Left' : 'Top')) + computeStyleInt(ele, "padding" + (xAxis ? 'Right' : 'Bottom')) + computeStyleInt(ele, "border" + (xAxis ? 'Right' : 'Bottom') + "Width");
}

function WidthHeightHandler (prop, value) {
  var index = 'width' === prop ? 0 : 1;

  if (!this[0]) {
    return isUndefined(value) ? undefined : this;
  }

  if (!value) {
    if (isWindow(this[0])) {
      return this[0].document.documentElement["client" + prop];
    }

    if (isDocument(this[0])) {
      return getDocumentDimension(this[0], prop);
    }

    return this[0].getBoundingClientRect()[prop] - getExtraSpace(this[0], !index);
  }

  var valueNumber = parseInt(value, 10);
  return this.each(function (i, ele) {
    if (!isElement(ele)) {
      return;
    }

    var boxSizing = computeStyle(ele, 'boxSizing');
    ele.style[prop] = getSuffixedValue(prop, valueNumber + (boxSizing === 'border-box' ? getExtraSpace(ele, !index) : 0));
  });
}

fn.height = function (value) {
  return WidthHeightHandler.call(this, 'height', value);
};

function OuterInnerHandler (ins, position, prop, includeMargins) {
  if (!this[0]) {
    return;
  }

  position = 'outer' === position ? 1 : 0;
  var type = 'Width' === prop ? 1 : 0;

  if (isWindow(this[0])) {
    return position ? this[0]["inner" + prop] : this[0].document.documentElement["client" + prop];
  }

  if (isDocument(this[0])) {
    return getDocumentDimension(this[0], prop);
  }

  return this[0]["" + (position ? 'offset' : 'client') + prop] + (includeMargins && position ? computeStyleInt(this[0], "margin" + (type ? 'Top' : 'Left')) + computeStyleInt(this[0], "margin" + (type ? 'Bottom' : 'Right')) : 0);
}

fn.innerHeight = function (includeMargins) {
  return OuterInnerHandler.call(this, 'inner', 'Height', includeMargins);
};

fn.innerWidth = function (includeMargins) {
  return OuterInnerHandler.call(this, 'inner', 'Width', includeMargins);
};

fn.outerHeight = function (includeMargins) {
  return OuterInnerHandler.call(this, 'outer', 'Height', includeMargins);
};

fn.outerWidth = function (includeMargins) {
  return OuterInnerHandler.call(this, 'outer', 'Width', includeMargins);
};

fn.width = function (value) {
  return WidthHeightHandler.call(this, 'width', value);
};

fn.fadeIn = function (speed, easing, callback) {
  return this.fadeToggle(speed, easing, callback, true);
};

fn.fadeOut = function (speed, easing, callback) {
  return this.fadeToggle(speed, easing, callback, false);
};

function isHidden(ele) {
  return computeStyle(ele, 'display') === 'none';
}

fn.fadeToggle = function (speed, easing, callback, force) {
  return this.each(function (i, el) {
    var isElemHidden = isHidden(el),
        isShow = isElemHidden;
    isShow = isUndefined(force) ? isShow : !force ? false : force ? true : isShow;

    if (isElemHidden && !isShow || !isElemHidden && isShow) {
      return;
    }

    el = core(el);

    if (isShow) {
      el.show();
    }

    el.animate({
      'opacity': isShow ? [0, 1] : 0
    }, speed, easing, function (elm) {
      isShow ? el.show() : el.hide();

      if (isFunction(callback)) {
        callback(elm);
      }
    });
  });
};

fn.fadeTo = function (speed, opacity, easing, callback) {
  return this.animate({
    opacity: opacity
  }, speed, easing, function (el) {
    core(el).css('opacity', opacity);

    if (isFunction(callback)) {
      callback(el);
    }
  });
};

fn.hide = function () {
  return this.toggle(false);
};

fn.show = function () {
  return this.toggle(true);
};

var defaultDisplay = {};
function getDefaultDisplay (tagName) {
  if (defaultDisplay[tagName]) {
    return defaultDisplay[tagName];
  }

  var ele = celem(tagName);
  doc.body.insertBefore(ele, null);
  var display = computeStyle(ele, 'display');
  doc.body.removeChild(ele);
  return defaultDisplay[tagName] = display !== 'none' ? display : 'block';
}

var cssDisplayProp = '___cd';

fn.toggle = function (force) {
  return this.each(function (i, ele) {
    if (!isElement(ele)) {
      return;
    }

    var show = isUndefined(force) ? isHidden(ele) : force;

    if (show) {
      ele.style.display = ele[cssDisplayProp] || '';

      if (isHidden(ele)) {
        ele.style.display = getDefaultDisplay(ele.tagName);
      }
    } else {
      ele[cssDisplayProp] = computeStyle(ele, 'display');
      ele.style.display = 'none';
    }
  });
};

fn.pulse = function (speed, easing, callback) {
  return this.animate({
    opacity: [0.5, 1],
    direction: 'alternate',
    transform: ['scale(0.5)', 'scale(1)']
  }, speed, easing, callback);
};

function hasNamespaces (ns1, ns2) {
  return !ns2 || !_some.call(ns2, function (ns) {
    return ns1.indexOf(ns) < 0;
  });
}

var evNamespace = '___ce';
var evNamespacesSep = '.';
var evFocus = {
  focus: 'focusin',
  blur: 'focusout'
};
var evHover = {
  mouseenter: 'mouseover',
  mouseleave: 'mouseout'
};

function getEventsCache (ele) {
  return ele[evNamespace] = ele[evNamespace] || {};
}

function removeEvent(ele, name, namespaces, selector, callback) {
  var cache = getEventsCache(ele);

  if (!name) {
    for (name in cache) {
      removeEvent(ele, name, namespaces, selector, callback);
    }
  } else if (cache[name]) {
    cache[name] = cache[name].filter(function (_ref) {
      var ns = _ref[0],
          sel = _ref[1],
          cb = _ref[2];

      if (callback && cb.guid !== callback.guid || !hasNamespaces(ns, namespaces) || selector && selector !== sel) {
        return true;
      }

      ele.removeEventListener(name, cb);
    });
  }
}

function parseEventName (eventName) {
  var parts = eventName.split(evNamespacesSep);
  return [parts[0], parts.slice(1).sort()];
}

function getEventNameBubbling (name) {
  return evHover[name] || evFocus[name] || name;
}

fn.off = function (eventFullName, selector, callback) {
  var _this = this;

  if (isUndefined(eventFullName)) {
    this.each(function (i, ele) {
      if (!isElement(ele) && !isDocument(ele) && !isWindow(ele)) {
        return;
      }

      removeEvent(ele);
    });
  } else if (!isString(eventFullName)) {
    handleObjectDataLoop.call(this, eventFullName, 'off');
  } else {
    if (isFunction(selector)) {
      callback = selector;
      selector = '';
    }

    _each(getSplitValues(eventFullName), function (i, eventFullName) {
      var _parseEventName = parseEventName(eventFullName),
          nameOriginal = _parseEventName[0],
          namespaces = _parseEventName[1],
          name = getEventNameBubbling(nameOriginal);

      _this.each(function (i, ele) {
        if (!isElement(ele) && !isDocument(ele) && !isWindow(ele)) {
          return;
        }

        removeEvent(ele, name, namespaces, selector, callback);
      });
    });
  }

  return this;
};

function addEvent (ele, name, namespaces, selector, callback) {
  var eventCache = getEventsCache(ele);
  eventCache[name] = eventCache[name] || [];
  eventCache[name].push([namespaces, selector, callback]);
  ele.addEventListener(name, callback);
}

fn.on = function (eventFullName, selector, data, callback, _one) {
  var _this = this;

  if (!isString(eventFullName)) {
    for (var key in eventFullName) {
      this.on(key, selector, data, eventFullName[key], _one);
    }

    return this;
  }

  if (!isString(selector)) {
    if (isUndefined(selector) || isNull(selector)) {
      selector = '';
    } else if (isUndefined(data)) {
      data = selector;
      selector = '';
    } else {
      callback = data;
      data = selector;
      selector = '';
    }
  }

  if (!isFunction(callback)) {
    callback = data;
    data = undefined;
  }

  if (!callback) {
    return this;
  }

  _each(getSplitValues(eventFullName), function (i, eventFullName) {
    var _parseEventName = parseEventName(eventFullName),
        nameOriginal = _parseEventName[0],
        namespaces = _parseEventName[1],
        name = getEventNameBubbling(nameOriginal),
        isEventHover = (nameOriginal in evHover),
        isEventFocus = (nameOriginal in evFocus);

    if (!name) {
      return;
    }

    _this.each(function (i, ele) {
      if (!isElement(ele) && !isDocument(ele) && !isWindow(ele)) {
        return;
      }

      var finalCallback = function finalCallback(event) {
        if (event.target["___i" + event.type]) {
          return event.stopImmediatePropagation();
        }

        if (event.namespace && !hasNamespaces(namespaces, event.namespace.split(evNamespacesSep))) {
          return;
        }

        if (!selector && (isEventFocus && (event.target !== ele || event.___ot === name) || isEventHover && event.relatedTarget && ele.contains(event.relatedTarget))) {
          return;
        }

        var thisArg = ele;

        if (selector) {
          var target = event.target;

          while (!matches(target, selector)) {
            if (target === ele) {
              return;
            }

            target = target.parentNode;

            if (!target) {
              return;
            }
          }

          thisArg = target;
          event.___cd = true; // Delegate
        }

        if (event.___cd) {
          _obj.defineProperty(event, 'currentTarget', {
            configurable: true,
            get: function get() {
              return thisArg;
            }
          });
        }

        _obj.defineProperty(event, 'data', {
          configurable: true,
          get: function get() {
            return data;
          }
        });

        var returnValue = callback.call(thisArg, event, event.___td);

        if (_one) {
          removeEvent(ele, name, namespaces, selector, finalCallback);
        }

        if (returnValue === false) {
          event.preventDefault();
          event.stopPropagation();
        }
      };

      finalCallback.guid = callback.guid = callback.guid || core.guid++;
      addEvent(ele, name, namespaces, selector, finalCallback);
    });
  });

  return this;
};

fn.one = function (eventFullName, selector, data, callback) {
  return this.on(eventFullName, selector, data, callback, true);
};

fn.ready = function (callback) {
  var cb = function cb() {
    return setTimeout(callback, 0, core);
  };

  doc.readyState !== 'loading' ? cb() : doc.addEventListener('DOMContentLoaded', cb);
  return this;
};

fn.trigger = function (event, data) {
  if (isString(event)) {
    var _parseEventName = parseEventName(event),
        nameOriginal = _parseEventName[0],
        namespaces = _parseEventName[1],
        name = getEventNameBubbling(nameOriginal);

    if (!name) {
      return this;
    }

    var type = reventsMouse.test(name) ? 'MouseEvents' : 'HTMLEvents';
    event = doc.createEvent(type);
    event.initEvent(name, true, true);
    event.namespace = namespaces.join(evNamespacesSep);
    event.___ot = nameOriginal;
  }

  event.___td = data;
  var isEventFocus = (event.___ot in evFocus);
  return this.each(function (i, ele) {
    if (isEventFocus && isFunction(ele[event.___ot])) {
      ele["___i" + event.type] = true;

      ele[event.___ot]();

      ele["___i" + event.type] = false;
    }

    ele.dispatchEvent(event);
  });
};

function serializeHandler (type) {
  var rval = 'o' === type ? {} : [];
  this.each(function (i, form) {
    _each(form.elements, function (i, field) {
      if (!field.name || field.disabled || ['file', 'reset', 'submit', 'button'].indexOf(field.type) > -1) {
        return;
      }

      if (field.type === 'select-multiple') {
        var options = [];

        _slice.call(field.options).forEach(function (option) {
          if (!option.selected) {
            return;
          }

          if ('s' === type) {
            rval.push(encodeURIComponent(field.name) + '=' + encodeURIComponent(option.value));
          } else if ('a' === type) {
            rval.push({
              name: field.name,
              value: option.value
            });
          } else {
            options.push(option.value);
          }
        });

        if ('o' === type && options.length) {
          rval[field.name] = options;
        }

        return;
      }

      if (['checkbox', 'radio'].indexOf(field.type) > -1 && !field.checked) {
        return;
      }

      if ('s' === type) {
        rval.push(encodeURIComponent(field.name) + '=' + encodeURIComponent(field.value));
      } else if ('a' === type) {
        rval.push({
          name: field.name,
          value: field.value
        });
      } else {
        rval[field.name] = field.value;
      }
    });
  });
  return 's' === type ? rval.join('&') : rval;
}

fn.serialize = function () {
  return serializeHandler.call(this, 's');
};

fn.serializeArray = function () {
  return serializeHandler.call(this, 'a');
};

fn.serializeObject = function () {
  return serializeHandler.call(this, 'o');
};

function pluck (arr, prop, deep, until) {
  var plucked = [],
      isCallback = isFunction(prop),
      compare = until && getCompareFunction(until);

  for (var i = 0, l = arr.length; i < l; i++) {
    if (isCallback) {
      var val = prop(arr[i]);

      if (val.length) {
        _push.apply(plucked, val);
      }
    } else {
      var _val = arr[i][prop];

      while (_val != null) {
        if (until && compare(-1, _val)) {
          break;
        }

        plucked.push(_val);
        _val = deep ? _val[prop] : null;
      }
    }
  }

  return plucked;
}

function getValue (ele, filter) {
  if (ele.multiple && ele.options) {
    return pluck(filter.call(ele.options, function (option) {
      return option.selected && !option.disabled && !option.parentNode.disabled;
    }), 'value');
  }

  return ele.value || '';
}

fn.val = function (value) {
  if (!arguments.length) {
    return this[0] && getValue(this[0]);
  }

  return this.each(function (i, ele) {
    var isSelect = ele.multiple && ele.options;

    if (isSelect || rcheckable.test(ele.type)) {
      var eleValue = isArray(value) ? _map.call(value, String) : isNull(value) ? [] : [String(value)];

      if (isSelect) {
        _each(ele.options, function (i, option) {
          option.selected = eleValue.indexOf(option.value) >= 0;
        }, true);
      } else {
        ele.checked = eleValue.indexOf(ele.value) >= 0;
      }
    } else {
      ele.value = isUndefined(value) || isNull(value) ? '' : value;
    }
  });
};

var scriptAttrs = ['type', 'src', 'nonce', 'noModule'];

function evalScripts (node, doc) {
  var collection = core(node);
  collection.filter('script').add(collection.find('script')).each(function (i, ele) {
    if (rscriptType.test(ele.type) && docEle.contains(ele)) {
      var script = celem('script');
      script.text = ele.textContent.replace(rHTMLCDATA, '');

      _each(scriptAttrs, function (i, attr) {
        if (ele[attr]) {
          script[attr] = ele[attr];
        }
      });

      doc.head.insertBefore(script, null);
      doc.head.removeChild(script);
    }
  });
}

function insertElement (anchor, target, left, inside, evaluate) {
  if (inside) {
    anchor.insertBefore(target, left ? anchor.firstChild : null);
  } else {
    anchor.parentNode.insertBefore(target, left ? anchor : anchor.nextSibling);
  }

  if (evaluate) {
    evalScripts(target, anchor.ownerDocument);
  }
}

function insertSelectors (selectors, anchors, inverse, left, inside, reverseLoop1, reverseLoop2, reverseLoop3) {
  _each(selectors, function (si, selector) {
    _each(core(selector), function (ti, target) {
      _each(core(anchors), function (ai, anchor) {
        var anchorFinal = inverse ? target : anchor,
            targetFinal = inverse ? anchor : target,
            indexFinal = inverse ? ti : ai;
        insertElement(anchorFinal, !indexFinal ? targetFinal : targetFinal.cloneNode(true), left, inside, !indexFinal);
      }, reverseLoop3);
    }, reverseLoop2);
  }, reverseLoop1);

  return anchors;
}

fn.after = function () {
  return insertSelectors(arguments, this, false, false, false, true, true);
};

fn.append = function () {
  return insertSelectors(arguments, this, false, false, true);
};

fn.appendTo = function () {
  return insertSelectors(arguments, this, true, false, true);
};

fn.before = function () {
  return insertSelectors(arguments, this, false, true);
};

fn.clone = function () {
  return this.map(function (i, ele) {
    return ele.cloneNode(true);
  });
};

function filtered (ins, comparator) {
  return !comparator ? ins : ins.filter(comparator);
}

fn.detach = function (comparator) {
  filtered(this, comparator).each(function (i, ele) {
    if (ele.parentNode) {
      ele.parentNode.removeChild(ele);
    }
  });
  return this;
};

fn.empty = function () {
  return this.each(function (i, ele) {
    while (ele.firstChild) {
      ele.removeChild(ele.firstChild);
    }
  });
};

fn.html = function (html) {
  if (!arguments.length) {
    return this[0] && this[0].innerHTML;
  }

  if (isUndefined(html)) {
    return this;
  }

  return this.each(function (i, ele) {
    if (!isElement(ele)) {
      return;
    }

    ele.innerHTML = html;
  });
};

fn.insertAfter = function () {
  return insertSelectors(arguments, this, true, false, false, false, false, true);
};

fn.insertBefore = function () {
  return insertSelectors(arguments, this, true, true);
};

fn.prepend = function () {
  return insertSelectors(arguments, this, false, true, true, true, true);
};

fn.prependTo = function () {
  return insertSelectors(arguments, this, true, true, true, false, false, true);
};

fn.remove = function (comparator) {
  filtered(this, comparator).detach().off();
  return this;
};

fn.replaceAll = function (selector) {
  core(selector).replaceWith(this);
  return this;
};

fn.replaceWith = function (selector) {
  return this.before(selector).remove();
};

fn.text = function (text) {
  if (isUndefined(text)) {
    return this[0] ? this[0].textContent : '';
  }

  return this.each(function (i, ele) {
    if (!isElement(ele)) {
      return;
    }

    ele.textContent = text;
  });
};

fn.unwrap = function () {
  this.parent().each(function (i, ele) {
    if (ele.tagName === 'BODY') {
      return;
    }

    var $ele = core(ele);
    $ele.replaceWith($ele.children());
  });
  return this;
};

fn.wrap = function (selector) {
  return this.each(function (i, ele) {
    var wrapper = core(selector)[0];
    core(ele).wrapAll(!i ? wrapper : wrapper.cloneNode(true));
  });
};

fn.wrapAll = function (selector) {
  var structure = core(selector),
      wrapper = structure[0];

  while (wrapper.children.length) {
    wrapper = wrapper.firstElementChild;
  }

  this.first().before(structure);
  return this.appendTo(wrapper);
};

fn.wrapInner = function (selector) {
  return this.each(function (i, ele) {
    var $ele = core(ele),
        contents = $ele.contents();
    contents.length ? contents.wrapAll(selector) : $ele.append(selector);
  });
};

fn.offset = function () {
  var ele = this[0];

  if (!ele) {
    return;
  }

  var rect = ele.getBoundingClientRect();
  return {
    top: rect.top + win.pageYOffset,
    left: rect.left + win.pageXOffset
  };
};

fn.offsetParent = function () {
  return this.map(function (i, ele) {
    var offsetParent = ele.offsetParent;

    while (offsetParent && computeStyle(offsetParent, 'position') === 'static') {
      offsetParent = offsetParent.offsetParent;
    }

    return offsetParent || docEle;
  });
};

fn.position = function () {
  var ele = this[0];

  if (!ele) {
    return;
  }

  var isFixed = computeStyle(ele, 'position') === 'fixed',
      offset = isFixed ? ele.getBoundingClientRect() : this.offset();

  if (!isFixed) {
    var doc = ele.ownerDocument;
    var offsetParent = ele.offsetParent || doc.documentElement;

    while ((offsetParent === doc.body || offsetParent === doc.documentElement) && computeStyle(offsetParent, 'position') === 'static') {
      offsetParent = offsetParent.parentNode;
    }

    if (offsetParent !== ele && isElement(offsetParent)) {
      var parentOffset = core(offsetParent).offset();
      offset.top -= parentOffset.top + computeStyleInt(offsetParent, 'borderTopWidth');
      offset.left -= parentOffset.left + computeStyleInt(offsetParent, 'borderLeftWidth');
    }
  }

  return {
    top: offset.top - computeStyleInt(ele, 'marginTop'),
    left: offset.left - computeStyleInt(ele, 'marginLeft')
  };
};

fn.children = function (comparator) {
  return filtered(core(unique(pluck(this, function (ele) {
    return ele.children;
  }))), comparator);
};

fn.closest = function (comparator) {
  var filtered = this.filter(comparator);

  if (filtered.length) {
    return filtered;
  }

  var $parent = this.parent();

  if (!$parent.length) {
    return filtered;
  }

  return $parent.closest(comparator);
};

fn.contents = function () {
  return core(unique(pluck(this, function (ele) {
    return ele.tagName === 'IFRAME' ? [ele.contentDocument] : ele.tagName === 'TEMPLATE' ? ele.content.childNodes : ele.childNodes;
  })));
};

fn.find = function (selector) {
  return core(unique(pluck(this, function (ele) {
    return _find(selector, ele);
  })));
};

function grep (elems, callback, invert) {
  var callbackInverse,
      matches = [],
      i = 0,
      length = elems.length,
      callbackExpect = !invert; // Go through the array, only saving the items
  // that pass the validator function

  for (; i < length; i++) {
    callbackInverse = !callback(elems[i], i);

    if (callbackInverse !== callbackExpect) {
      matches.push(elems[i]);
    }
  }

  return matches;
}

fn.even = function () {
  return core(grep(this, function (_elem, i) {
    return (i + 1) % 2;
  }));
};

fn.has = function (selector) {
  var comparator = isString(selector) ? function (i, ele) {
    return _find(selector, ele).length;
  } : function (i, ele) {
    return ele.contains(selector);
  };
  return this.filter(comparator);
};

fn.is = function (comparator) {
  var compare = getCompareFunction(comparator);
  return _some.call(this, function (ele, i) {
    return compare.call(ele, i, ele);
  });
};

fn.next = function (comparator, _all, _until) {
  return filtered(core(unique(pluck(this, 'nextElementSibling', _all, _until))), comparator);
};

fn.nextAll = function (comparator) {
  return this.next(comparator, true);
};

fn.nextUntil = function (until, comparator) {
  return this.next(comparator, true, until);
};

fn.not = function (comparator) {
  var compare = getCompareFunction(comparator);
  return this.filter(function (i, ele) {
    return (!isString(comparator) || isElement(ele)) && !compare.call(ele, i, ele);
  });
};

fn.parent = function (comparator) {
  return filtered(core(unique(pluck(this, 'parentNode'))), comparator);
};

fn.parents = function (comparator, _until) {
  return filtered(core(unique(pluck(this, 'parentElement', true, _until))), comparator);
};

fn.parentsUntil = function (until, comparator) {
  return this.parents(comparator, until);
};

fn.prev = function (comparator, _all, _until) {
  return filtered(core(unique(pluck(this, 'previousElementSibling', _all, _until))), comparator);
};

fn.prevAll = function (comparator) {
  return this.prev(comparator, true);
};

fn.prevUntil = function (until, comparator) {
  return this.prev(comparator, true, until);
};

fn.siblings = function (comparator) {
  return filtered(core(unique(pluck(this, function (ele) {
    return core(ele).parent().children().not(ele);
  }))), comparator);
};

core.camelCase = camelCase;

core.isBoolean = isBoolean;
core.isDocument = isDocument;
core.isElement = isElement;
core.isFunction = isFunction;
core.isNodetype = isNodeType;
core.isNull = isNull;
core.isNumber = isNumber;
core.isNumeric = isNumeric;
core.isPlainObject = isPlainObject;
core.isString = isString;
core.isType = isType;
core.isUndefined = isUndefined;
core.isWindow = isWindow;
core.isWpopv = isWpopv;

function getScript (url, success) {
  var script = celem('script');
  script.async = true;
  script.src = url;

  if (success) {
    script.onload = function () {
      return success();
    };
  }

  core('script').before(script);
}

function merge (first, second) {
  var len = +second.length,
      j = 0,
      i = first.length;

  for (; j < len; j++) {
    first[i++] = second[j];
  }

  first.length = i;
  return first;
}

function CacheStorage() {}

CacheStorage.prototype = {
  get: function get(key, _default) {
    if (_default === void 0) {
      _default = false;
    }

    return this[key] || _default;
  },
  set: function set(key, data) {
    this[key] = data;
    return this;
  }
};
var staticStorage = Object.create({
  d: Object.create({}),
  g: function g(name) {
    return staticStorage.d[name] || false;
  },
  s: function s(name) {
    staticStorage.d[name] = new CacheStorage();
    return staticStorage.d[name];
  },
  r: function r(name) {
    if (staticStorage.d[name]) {
      delete staticStorage.d[name];
    }
  }
});
function storage (cacheName, remove) {
  if (remove === void 0) {
    remove = false;
  }

  if (remove) {
    staticStorage.r(cacheName);
    return this;
  }

  var isExists = staticStorage.g(cacheName);

  if (!isExists) {
    return staticStorage.s(cacheName);
  }

  return isExists;
}

/**
 * Control a sequence of objects
 *
 * @class Queue
 * @api private
 */
var Queue = /*#__PURE__*/function () {
  /**
   * Create a new `Queue` instance
   *
   * @constructor
   * @api public
   */
  function Queue() {
    this.i = [];
  }
  /**
   * Add an object to the end of
   * the queue
   *
   * @param {*} item
   * @api public
   */


  var _proto = Queue.prototype;

  _proto.enqueue = function enqueue(item) {
    this.i.push(item);
  }
  /**
   * Remove and return the first
   * object in the queue, return
   * null if none exist
   *
   * @return {*|Null}
   * @api public
   */
  ;

  _proto.dequeue = function dequeue() {
    return this.i.shift() || null;
  }
  /**
   * Return the last item in the
   * queue or null if none exist
   *
   * @return {*|Null}
   * @api public
   */
  ;

  _proto.getLast = function getLast() {
    return this.i[this.i.length - 1] || null;
  }
  /**
   * Clear the queue
   *
   * @api public
   */
  ;

  _proto.clear = function clear() {
    this.i.length = 0;
  }
  /**
   * Is the queue empty?
   *
   * @return {Boolean}
   * @api public
   */
  ;

  _proto.isEmpty = function isEmpty() {
    return this.i.length === 0;
  };

  return Queue;
}();

core.attempt = attempt;
core.parseHTML = parseHTML;
core.pluck = pluck;
core.unique = unique;
core.getScript = getScript;
core.merge = merge;
core.grep = grep;
core.storage = storage;
core.Queue = Queue;

if (isFunction(Symbol)) {
  fn[Symbol.iterator] = _Arrayprop[Symbol.iterator];
}
/**
 * Dynamic Functions.
 */


fn.version = '0.0.0';
fn.uid = 'wpopv' + Math.random();

fn.extend = function (plugins) {
  return extend(fn, plugins);
};

fn.splice = _splice;
/**
 * Static Functions
 */

core.each = _each;
core.extend = extend;
setupExtraEventsFunctions();

export default core;
