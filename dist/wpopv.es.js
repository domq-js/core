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

var rhtml = /<.+>/,
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

function DizzleCore(selector, context) {
  return DizzleCore.find(selector, context);
}

DizzleCore.instanceID = 'dizzle' + 1 * new Date();

DizzleCore.err = function (msg) {
  throw new Error(msg);
};

var reName = /^[^\\]?(?:\\(?:[\da-f]{1,6}\s?|.)|[\w\-\u00b0-\uFFFF])+/,
    reEscape = /\\([\da-f]{1,6}\s?|(\s)|.)/gi,
    // Modified version of https://github.com/jquery/sizzle/blob/master/src/sizzle.js#L87
reAttr = /^\s*((?:\\.|[\w\u00b0-\uFFFF-])+)\s*(?:(\S?)=\s*(?:(['"])([^]*?)\3|(#?(?:\\.|[\w\u00b0-\uFFFF-])*)|)|)\s*(i)?\]/,
    // Easily-parseable/retrievable ID or TAG or CLASS selectors
rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
    whitespace = '[\\x20\\t\\r\\n\\f]',
    rwhitespace = new RegExp(whitespace + '+', 'g'),
    // Below Regex is used to find any issues with string such as using / or \ - _ (Any Special Char Thats Needs To Be Escaped)
rfindEscapeChar = /[-[\]{}()*+?.,\\^$|#\s]/g;
var CombinatorTypes = ['>', '<', '~', '+'];

function createCache() {
  var keys = [];

  function cache(key, value) {
    if (isUndefined(value)) {
      return cache[key + ' '];
    }

    if (keys.push(key + ' ') > DizzleCore.cacheLength) {
      delete cache[keys.shift()];
    }

    return cache[key + ' '] = value;
  }

  return cache;
}
/**
 * Stores All Parsed Selector In Cache.
 * @type {cache}
 */


var parseCache = createCache();
/**
 * Stores All Non Native Selector Data.
 * @type {cache}
 */

var nonNativeSelector = createCache();
/**
 * Stores All Selector's Results in Cache
 * @type {cache}
 */

var selectorResultsCache = createCache();
var attribSelectors = {
  '#': ['id', '='],
  '.': ['class', 'element']
},
    unpackPseudos = new Set(['has', 'not', 'matches', 'is']),
    stripQuotesFromPseudos = new Set(['contains', 'icontains']),
    quotes = new Set(['"', '\'']);
/**
 * Below Regex Is Used To Escape CSS Selector such as
 * #myID.entry[1] -->  #myID\\.entry\\[1\\]
 * @type {RegExp}
 */

function funescape(escaped, escapedWhitespace) {
  var high = parseInt(escaped, 16) - 0x10000;
  return high !== high || escapedWhitespace ? escaped : high < 0 ? String.fromCharCode(high + 0x10000) : String.fromCharCode(high >> 10 | 0xd800, high & 0x3ff | 0xdc00);
}

function unescapeCSS(str) {
  return str.replace(reEscape, funescape);
}

function isWhitespace(c) {
  return c === ' ' || c === '\n' || c === '\t' || c === '\f' || c === '\r';
}

function parseSelector(subselects, selector) {
  var tokens = [],
      sawWS = false;

  function getName() {
    var match = selector.match(reName);

    if (!match) {
      DizzleCore.err("Expected name, found " + selector);
    }

    var sub = match[0];
    selector = selector.substr(sub.length);
    return unescapeCSS(sub);
  }

  function stripWhitespace(start) {
    while (isWhitespace(selector.charAt(start))) {
      start++;
    }

    selector = selector.substr(start);
  }

  function isEscaped(pos) {
    var slashCount = 0;

    while (selector.charAt(--pos) === '\\') {
      slashCount++;
    }

    return (slashCount & 1) === 1;
  }

  stripWhitespace(0);

  while (selector !== '') {
    var firstChar = selector.charAt(0);

    if (isWhitespace(firstChar)) {
      sawWS = true;
      stripWhitespace(1);
    } else if (CombinatorTypes.indexOf(firstChar) >= 0) {
      tokens.push({
        type: 'combinators',
        action: firstChar
      });
      sawWS = false;
      stripWhitespace(1);
    } else if (firstChar === ',') {
      if (tokens.length === 0) {
        DizzleCore.err('Empty sub-selector');
      }

      subselects.push(tokens);
      tokens = [];
      sawWS = false;
      stripWhitespace(1);
    } else {
      if (sawWS) {
        if (tokens.length > 0) {
          tokens.push({
            type: 'descendant',
            action: ' '
          });
        }

        sawWS = false;
      }

      if (firstChar === '*') {
        selector = selector.substr(1);
        tokens.push({
          type: '*'
        });
      } else if (firstChar in attribSelectors) {
        var _attribSelectors$firs = attribSelectors[firstChar],
            name = _attribSelectors$firs[0],
            action = _attribSelectors$firs[1];
        selector = selector.substr(1);
        tokens.push({
          type: 'attr',
          id: name,
          action: action,
          val: getName(),
          igCase: false
        });
      } else if (firstChar === '[') {
        selector = selector.substr(1);
        var attributeMatch = selector.match(reAttr);

        if (!attributeMatch) {
          DizzleCore.err("Malformed attribute selector: " + selector);
        }

        var completeSelector = attributeMatch[0],
            baseName = attributeMatch[1],
            actionType = attributeMatch[2],
            _attributeMatch$ = attributeMatch[4],
            quotedValue = _attributeMatch$ === void 0 ? "" : _attributeMatch$,
            _attributeMatch$2 = attributeMatch[5],
            value = _attributeMatch$2 === void 0 ? quotedValue : _attributeMatch$2,
            igCase = attributeMatch[6];
        selector = selector.substr(completeSelector.length);

        var _name = unescapeCSS(baseName);

        _name = _name.toLowerCase();
        tokens.push({
          type: 'attr',
          id: _name,
          action: actionType || '=',
          val: unescapeCSS(value),
          igCase: !!igCase
        });
      } else if (firstChar === ':') {
        if (selector.charAt(1) === ':') {
          selector = selector.substr(2);
          tokens.push({
            type: 'pseudo-element',
            id: getName().toLowerCase()
          });
          continue;
        }

        selector = selector.substr(1);

        var _name2 = getName().toLowerCase();

        var data = null;

        if (selector.startsWith('(')) {
          if (unpackPseudos.has(_name2)) {
            var quot = selector.charAt(1);
            var quoted = quotes.has(quot);
            selector = selector.substr(quoted ? 2 : 1);
            data = [];
            selector = parseSelector(data, selector);

            if (quoted) {
              if (!selector.startsWith(quot)) {
                DizzleCore.err("Unmatched quotes in :" + _name2);
              } else {
                selector = selector.substr(1);
              }
            }

            if (!selector.startsWith(')')) {
              DizzleCore.err("Missing closing parenthesis in :" + _name2 + " (" + selector + ")");
            }

            selector = selector.substr(1);
          } else {
            var pos = 1,
                counter = 1;

            for (; counter > 0 && pos < selector.length; pos++) {
              if (selector.charAt(pos) === '(' && !isEscaped(pos)) {
                counter++;
              } else if (selector.charAt(pos) === ')' && !isEscaped(pos)) {
                counter--;
              }
            }

            if (counter) {
              DizzleCore.err('Parenthesis not matched');
            }

            data = selector.substr(1, pos - 2);
            selector = selector.substr(pos);

            if (stripQuotesFromPseudos.has(_name2)) {
              var _quot = data.charAt(0);

              if (_quot === data.slice(-1) && quotes.has(_quot)) {
                data = data.slice(1, -1);
              }

              data = unescapeCSS(data);
            }
          }
        }

        tokens.push({
          type: 'pseudo',
          id: _name2,
          data: data
        });
      } else if (reName.test(selector)) {
        var _name3 = getName();

        _name3 = _name3.toLowerCase();
        tokens.push({
          type: 'tag',
          id: _name3
        });
      } else {
        if (tokens.length && tokens[tokens.length - 1].type === 'descendant') {
          tokens.pop();
        }

        addToken(subselects, tokens);
        return selector;
      }
    }
  }

  addToken(subselects, tokens);
  return selector;
}

function addToken(subselects, tokens) {
  if (subselects.length > 0 && tokens.length === 0) {
    DizzleCore.err('Empty sub-selector');
  }

  subselects.push(tokens);
}

function parse(selector) {
  var cached = parseCache(selector);

  if (cached) {
    return cached;
  }

  cached = selector;
  var subselects = [];
  selector = parseSelector(subselects, "" + selector);

  if (selector !== '') {
    DizzleCore.err("Unmatched selector: " + selector);
  }

  return parseCache(cached, subselects);
}
/**
 * @todo create a another function to check if attribute exists.
 * @param currentValue
 * @param compareValue
 * @return {boolean}
 */


function equals(currentValue, compareValue) {
  return currentValue === compareValue;
}

function notequals(currentValue, compareValue) {
  return !equals(currentValue, compareValue);
}

function isTag(elem) {
  return elem.nodeType === 1;
}

function getChildren(elem) {
  return elem.childNodes ? Array.prototype.slice.call(elem.childNodes, 0) : [];
}

function getParent(elem) {
  return elem.parentNode;
}

var adapter = {
  isTag: isTag,
  getChildren: getChildren,
  getParent: getParent,
  attr: function attr(el, key) {
    return el.getAttribute(key);
  },
  getSiblings: function getSiblings(elem) {
    var parent = getParent(elem);
    return parent ? getChildren(parent) : [elem];
  },
  getTagName: function getTagName(elem) {
    return (elem.tagName || '').toLowerCase();
  }
};

function prefixedwith(currentValue, compareValue) {
  return currentValue === compareValue || currentValue.slice(0, compareValue.length + 1) === compareValue + "-";
}

function contains(currentValue, compareValue) {
  return compareValue && currentValue.indexOf(compareValue) > -1;
}

function containsword(currentValue, compareValue) {
  return (' ' + currentValue.replace(rwhitespace, ' ') + ' ').indexOf(compareValue) > -1;
}

function endswith(currentValue, compareValue) {
  return compareValue && currentValue.slice(-compareValue.length) === compareValue;
}

function startswith(currentValue, compareValue) {
  return compareValue && currentValue.indexOf(compareValue) === 0;
}

function elementClass(currentValue, compareValue) {
  compareValue = compareValue.replace(rfindEscapeChar, '\\$&');
  var pattern = "(?:^|\\s)" + compareValue + "(?:$|\\s)";
  var regex = new RegExp(pattern, '');
  return currentValue != null && regex.test(currentValue);
}

var attrHandlers = {
  '=': equals,
  '!': notequals,
  '|': prefixedwith,
  '*': contains,
  '~': containsword,
  '$': endswith,
  '^': startswith,

  /**
   * The below function is used only to check for element class
   * when query is used like
   * .myclass1.myclass2 / .myclass .anotherelement
   */
  'element': elementClass
};

function attrHandler(el, token) {
  var status = true;
  var action = token.action,
      id = token.id,
      val = token.val;
  var currentValue = adapter.attr(el, id);

  if (currentValue === null) {
    return action === '!';
  }

  if (token.action in attrHandlers) {
    status = attrHandlers[action](currentValue, val);
  }

  return status;
}

function empty(elem) {
  // http://www.w3.org/TR/selectors/#empty-pseudo
  // :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
  //   but not by others (comment: 8; processing instruction: 7; etc.)
  // nodeType < 6 works because attributes (2) do not appear as children
  for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
    if (elem.nodeType < 6) {
      return false;
    }
  }

  return true;
}

function disabled(elem) {
  // Only certain elements can match :enabled or :disabled
  // https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
  // https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
  if ('form' in elem) {
    // Check for inherited disabledness on relevant non-disabled elements:
    // * listed form-associated elements in a disabled fieldset
    //   https://html.spec.whatwg.org/multipage/forms.html#category-listed
    //   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
    // * option elements in a disabled optgroup
    //   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
    // All such elements have a "form" property.
    if (elem.parentNode && elem.disabled === false) {
      // Option elements defer to a parent optgroup if present
      if ('label' in elem) {
        return 'label' in elem.parentNode ? elem.parentNode.disabled === true : elem.disabled === true;
      }
    }

    return elem.disabled === true; // Try to winnow out elements that can't be disabled before trusting the disabled property.
    // Some victims get caught in our net (label, legend, menu, track), but it shouldn't
    // even exist on them, let alone have a boolean value.
  } else if ('label' in elem) {
    return elem.disabled === true;
  } // Remaining elements are neither :enabled nor :disabled


  return false;
}

function enabled(elem) {
  return !disabled(elem);
}

var preferedDocument = win.document;
var currentDocument = preferedDocument,
    docElem = currentDocument.documentElement;

function markFunction(fn) {
  fn[DizzleCore.instanceID] = true;
  return fn;
}

function isMarkedFunction(fn) {
  return isFunction(fn) && fn[DizzleCore.instanceID] && fn[DizzleCore.instanceID] === true;
}
/**
 * Fetches Text Value From Nodes
 *
 * NodeTypes
 * 	1 --> ELEMENT_NODE ( p / div)
 * 	9 --> DOCUMENT_NODE (window.document)
 * 	11 --> DOCUMENT_FRAGMENT_NODE (such as iframe)
 * 	3 --> TEXT_NODE  ( The actual Text inside an Element or Attr. )
 *  4 --> CDATA_SECTION_NODE (A CDATASection, such as <!CDATA[[ … ]]>.)
 * @param elem
 * @return {string|any}
 */


function getText(elem) {
  var node,
      ret = '',
      i = 0,
      nodeType = elem.nodeType;

  if (!nodeType) {
    while (node = elem[i++]) {
      ret += getText(node);
    }
  } else if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
    if (isString(elem.textContent)) {
      return elem.textContent;
    } else {
      for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
        ret += getText(elem);
      }
    }
  } else if (nodeType === 3 || nodeType === 4) {
    return elem.nodeValue;
  }

  return ret;
}

function createPositionalPseudo(fn) {
  return markFunction(function (elements, token) {
    token.data = +token.data;
    var j,
        matches = [],
        matchIndexes = fn([], elements.length, token),
        i = matchIndexes.length;

    while (i--) {
      if (elements[j = matchIndexes[i]]) {
        elements[j] = !(matches[j] = elements[j]);
      }
    }

    return matches;
  });
}

function oddOrEven(isodd, result, totalFound) {
  var i = isodd ? 1 : 0;

  for (; i < totalFound; i += 2) {
    result.push(i);
  }

  return result;
}
/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */


function createInputPseudo(type) {
  return function (elem) {
    return elem.nodeName.toLowerCase() === 'input' && elem.type === type;
  };
}
/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */


function createButtonPseudo(type) {
  return function (elem) {
    var name = elem.nodeName.toLowerCase();
    return (name === 'input' || name === 'button') && elem.type === type;
  };
}

function even(result, totalFound) {
  return oddOrEven(false, result, totalFound);
}

function lang(el, token) {
  var elemLang,
      data = token.data;
  data = data.toLowerCase();

  do {
    if (elemLang = el.lang || adapter.attr(el, 'lang')) {
      elemLang = elemLang.toLowerCase();
      return elemLang === data || elemLang.indexOf(data + '-') === 0;
    }
  } while ((el = el.parentNode) && el.nodeType === 1);

  return false;
}

function visible(elem) {
  return !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);
}

function hidden(elem) {
  return !visible(elem);
}

function contains$1(elem, token) {
  return (elem.textContent || getText(elem)).indexOf(token.data) > -1;
}

function eq(result, totalFound, token) {
  return [token.data < 0 ? token.data + totalFound : token.data];
}

function firstChild(elem) {
  return !elem.previousElementSibling;
}

function lastChild(elem) {
  return !elem.nextElementSibling;
}

function firstOfType(elem) {
  var siblings = adapter.getSiblings(elem);

  for (var i = 0; i < siblings.length; i++) {
    if (adapter.isTag(siblings[i])) {
      if (siblings[i] === elem) {
        return true;
      }

      if (adapter.getTagName(siblings[i]) === adapter.getTagName(elem)) {
        break;
      }
    }
  }

  return false;
}

function lastOfType(elem) {
  var siblings = adapter.getSiblings(elem);

  for (var i = siblings.length - 1; i >= 0; i--) {
    if (adapter.isTag(siblings[i])) {
      if (siblings[i] === elem) {
        return true;
      }

      if (adapter.getTagName(siblings[i]) === adapter.getTagName(elem)) {
        break;
      }
    }
  }

  return false;
}
/**
 * @see https://github.com/fb55/nth-check
 */

/*
	returns a function that checks if an elements index matches the given rule
	highly optimized to return the fastest solution
*/


function compile(parsed) {
  var a = parsed[0],
      b = parsed[1] - 1; //when b <= 0, a*n won't be possible for any matches when a < 0
  //besides, the specification says that no element is matched when a and b are 0

  if (b < 0 && a <= 0) {
    return false;
  } //when a is in the range -1..1, it matches any element (so only b is checked)


  if (a === -1) {
    return function (pos) {
      return pos <= b;
    };
  }

  if (a === 0) {
    return function (pos) {
      return pos === b;
    };
  } //when b <= 0 and a === 1, they match any element


  if (a === 1) {
    return b < 0 ? true : function (pos) {
      return pos >= b;
    };
  } //when a > 0, modulo can be used to check if there is a match


  var bMod = b % a;

  if (bMod < 0) {
    bMod += a;
  }

  if (a > 1) {
    return function (pos) {
      return pos >= b && pos % a === bMod;
    };
  }

  a *= -1; //make `a` positive

  return function (pos) {
    return pos <= b && pos % a === bMod;
  };
}
/*
	parses a nth-check formula, returns an array of two numbers
	//following http://www.w3.org/TR/css3-selectors/#nth-child-pseudo
	//[ ['-'|'+']? INTEGER? {N} [ S* ['-'|'+'] S* INTEGER ]?
*/


function parse$1(formula) {
  formula = formula.trim().toLowerCase();

  if (formula === 'even') {
    return [2, 0];
  } else if (formula === 'odd') {
    return [2, 1];
  } else {
    var parsed = formula.match(/^([+\-]?\d*n)?\s*(?:([+\-]?)\s*(\d+))?$/);

    if (!parsed) {
      throw new SyntaxError("n-th rule couldn't be parsed ('" + formula + "')");
    }

    var a;

    if (parsed[1]) {
      a = parseInt(parsed[1], 10);

      if (isNaN(a)) {
        if (parsed[1].charAt(0) === '-') {
          a = -1;
        } else {
          a = 1;
        }
      }
    } else {
      a = 0;
    }

    return [a, parsed[3] ? parseInt((parsed[2] || '') + parsed[3], 10) : 0];
  }
}

function nthCheck(formula) {
  return compile(parse$1(formula));
}

function nthOfType(el, token) {
  var func = nthCheck(token.data),
      siblings = adapter.getSiblings(el);
  var pos = 0;

  for (var i = 0; i < siblings.length; i++) {
    if (adapter.isTag(siblings[i])) {
      if (siblings[i] === el) {
        break;
      }

      if (adapter.getTagName(siblings[i]) === adapter.getTagName(el)) {
        pos++;
      }
    }
  }

  return func(pos);
}

function first() {
  return [0];
}

function last(result, totalFound) {
  return [totalFound - 1];
}

function odd(result, totalFound) {
  return oddOrEven(true, result, totalFound);
}

function gt(result, totalFound, token) {
  var i = token.data < 0 ? token.data + totalFound : token.data;

  for (; ++i < totalFound;) {
    result.push(i);
  }

  return result;
}

function lt(result, totalFound, token) {
  var i = token.data < 0 ? token.data + totalFound : token.data > totalFound ? totalFound : token.data;

  for (; --i >= 0;) {
    result.push(i);
  }

  return result;
}

function nthLastOfType(el, token) {
  var func = nthCheck(token.data),
      siblings = adapter.getSiblings(el);
  var pos = 0;

  for (var i = siblings.length - 1; i >= 0; i--) {
    if (adapter.isTag(siblings[i])) {
      if (siblings[i] === el) {
        break;
      }

      if (adapter.getTagName(siblings[i]) === adapter.getTagName(el)) {
        pos++;
      }
    }
  }

  return func(pos);
}

function nthLastChild(el, token) {
  var func = nthCheck(token.data),
      siblings = adapter.getSiblings(el);
  var pos = 0;

  for (var i = siblings.length - 1; i >= 0; i--) {
    if (adapter.isTag(siblings[i])) {
      if (siblings[i] === el) {
        break;
      } else {
        pos++;
      }
    }
  }

  return func(pos);
}

function checked(elem) {
  var nodeName = elem.nodeName.toLowerCase();
  return nodeName === 'input' && !!elem.checked || nodeName === 'option' && !!elem.selected;
}

function button(elem) {
  var name = elem.nodeName.toLowerCase();
  return name === 'input' && elem.type === 'button' || name === 'button';
}

function input(elem) {
  return /^(?:input|select|textarea|button)$/i.test(elem.nodeName);
}

function parent(elem) {
  return !empty(elem);
}

function selected(elem) {
  /**
   * Accessing this property makes selected-by-default
   * options in Safari work properly
   */
  if (elem.parentNode) {
    elem.parentNode.selectedIndex;
  }

  return elem.selected === true;
}

function text(elem) {
  var attr;
  return elem.nodeName.toLowerCase() === 'input' && elem.type === 'text' && ((attr = elem.getAttribute('type')) == null || attr.toLowerCase() === 'text');
}

function onlyChild(elem) {
  var siblings = adapter.getSiblings(elem);

  for (var i = 0; i < siblings.length; i++) {
    if (adapter.isTag(siblings[i]) && siblings[i] !== elem) {
      return false;
    }
  }

  return true;
}

function onlyOfType(elem) {
  var siblings = adapter.getSiblings(elem);

  for (var i = 0, j = siblings.length; i < j; i++) {
    if (adapter.isTag(siblings[i])) {
      if (siblings[i] === elem) {
        continue;
      }

      if (adapter.getTagName(siblings[i]) === adapter.getTagName(elem)) {
        return false;
      }
    }
  }

  return true;
}

function has(elem, token) {
  return DizzleCore.find(token.data, elem).length > 0;
}

var pesudoHandlers = {
  'empty': empty,
  'disabled': disabled,
  'enabled': enabled,
  'lang': lang,
  'visible': visible,
  'hidden': hidden,
  'contains': contains$1,
  'first-child': firstChild,
  'last-child': lastChild,
  'first-of-type': firstOfType,
  'last-of-type': lastOfType,
  'even': createPositionalPseudo(even),
  'odd': createPositionalPseudo(odd),
  'gt': createPositionalPseudo(gt),
  'lt': createPositionalPseudo(lt),
  'eq': createPositionalPseudo(eq),
  'first': createPositionalPseudo(first),
  'last': createPositionalPseudo(last),
  'nth-of-type': nthOfType,
  'nth-last-of-type': nthLastOfType,
  'nth-last-child': nthLastChild,
  'checked': checked,
  'input': input,
  'button': button,
  'parent': parent,
  'selected': selected,
  'text': text,
  'only-child': onlyChild,
  'only-of-type': onlyOfType,
  'has': has
};
['radio', 'checkbox', 'file', 'password', 'image'].forEach(function (i) {
  pesudoHandlers[i] = createInputPseudo(i);
});
['submit', 'reset'].forEach(function (i) {
  pesudoHandlers[i] = createButtonPseudo(i);
});

function pesudoHandler(el, token) {
  if (_isArray(el)) {
    var id = token.id;

    if (id in pesudoHandlers) {
      if (isMarkedFunction(pesudoHandlers[id])) {
        el = pesudoHandlers[id](el, token);
      } else {
        el = el.filter(function (e) {
          return pesudoHandlers[id](e, token);
        });
      }
    }

    return el;
  } else {
    var status = true;
    var _id = token.id;

    if (_id in pesudoHandlers) {
      status = pesudoHandlers[_id](el, token);
    }

    return status;
  }
}

var matcherFn = false;

function matches(el, selector) {
  return el[matcherFn](selector);
}

function setupMatcherFn() {
  matcherFn = ['matches', 'webkitMatchesSelector', 'msMatchesSelector'].reduce(function (fn, name) {
    return fn ? fn : name in docElem ? name : fn;
  }, null);
}

function isCheckCustom(selector, elem) {
  var r = parse(selector).reduce(function (results, tokens) {
    var i = 0,
        len = tokens.length,
        status = true;

    while (i < len) {
      var token = tokens[i++];

      if (status && ('attr' === token.type || 'pseudo' === token.type)) {
        status = filterElement(elem, token) ? elem : false;
      }
    }

    return status;
  }, true);
  return !!r;
}

function is(selector, elem) {
  try {
    return matches(elem, selector);
  } catch (e) {
    return isCheckCustom(selector, elem);
  }
}

function filterElement(element, token) {
  if (!isUndefined(token)) {
    switch (token.type) {
      case 'attr':
        return attrHandler(element, token);

      case 'pseudo':
        return pesudoHandler(element, token);
    }
  }

  return true;
}

function filter(selector, elems) {
  return elems.filter(function (elem) {
    return isCheckCustom(selector, elem);
  });
}
/**
 * Tries To Run Native Query Selectors.
 * @param selector
 * @param context
 * @return {boolean|[]}
 */


function nativeQuery(selector, context) {
  var results = [],
      isNativeQuery = true !== nonNativeSelector(selector),
      isNativeQueryData,
      selector_id,
      selector_class,
      nodeType = context ? context.nodeType : 9;
  /**
   * Return False if query is already cached as none native
   */

  if (!isNativeQuery) {
    return false;
  }
  /**
   * If the Selector is simple then just use native query system.
   */


  if (nodeType !== 11) {
    if (isNativeQueryData = rquickExpr.exec(selector)) {
      if ((selector_id = isNativeQueryData[1]) && nodeType === 9) {
        results.push(context.getElementById(selector_id));
        return results;
      } else if (isNativeQueryData[2]) {
        _push.apply(results, context.getElementsByTagName(selector));

        return results;
      } else if (selector_class = isNativeQueryData[3]) {
        _push.apply(results, context.getElementsByClassName(selector_class));

        return results;
      }
    }
  }

  results = queryAll(selector, context);

  if (false === results) {
    nonNativeSelector(selector, true);
    return false;
  }

  return results;
}

function queryAll(selector, context) {
  var results = [];
  /**
   * Try To Use Native QuerySelector All To Find Elements For The Provided Query
   */

  try {
    var scope = context;

    if (!isFunction(context.querySelectorAll)) {
      if (!isUndefined(context.document) && isFunction(context.document.querySelectorAll)) {
        scope = context.document;
      } else if (!isUndefined(context.documentElement) && isFunction(context.documentElement.querySelectorAll)) {
        scope = context.documentElement;
      }
    }

    _push.apply(results, scope.querySelectorAll(selector));

    return results;
  } catch (e) {}

  return false;
}

function child(selector, context, results, nextToken) {
  return results.concat(_filter.call(queryAll(selector, context), function (el) {
    return el.parentNode === context && filterElement(el, nextToken);
  }));
}

function parent$1(selector, context, results, nextToken) {}

function adjacent(selector, context, results) {
  var el = context.nextElementSibling;

  if (el && matches(el, selector)) {
    results.push(el);
  }

  return results;
}

function sibling(selector, context, results) {
  var el = context.nextElementSibling;

  while (el) {
    if (matches(el, selector)) {
      results.push(el);
    }

    el = el.nextElementSibling;
  }

  return results;
}

function descendant(selector, context, results, nextToken) {
  return results.concat(_filter.call(queryAll(selector, context), function (el) {
    return filterElement(el, nextToken);
  }));
}

var combinators = {
  '>': child,
  '<': parent$1,
  '+': adjacent,
  '~': sibling,
  ' ': descendant
};

function nextToken(currentPos, tokens) {
  if (!isUndefined(tokens[currentPos])) {
    if (tokens[currentPos].type === 'pseudo') {
      if (!isMarkedFunction(pesudoHandlers[tokens[currentPos].id])) {
        return {
          token: tokens[currentPos++],
          pos: currentPos
        };
      }
    } else if (tokens[currentPos].type !== 'combinators' && tokens[currentPos].type !== 'descendant') {
      return {
        token: tokens[currentPos++],
        pos: currentPos
      };
    }
  }

  return {
    token: false,
    pos: currentPos
  };
}

function validateToken(tokens) {
  return 'tag' === tokens[0].type || 'attr' === tokens[0].type && ('id' === tokens[0].id || 'class' === tokens[0].id) ? tokens : [{
    type: 'descendant'
  }].concat(tokens);
}

function findAdvanced(selectors, root) {
  selectors = isString(selectors) ? parse(selectors) : selectors;
  root = !_isArray(root) ? [root] : root;
  return selectors.reduce(function (results, tokens) {
    tokens = validateToken(tokens);
    var i = 0,
        len = tokens.length,
        context = root;

    var _loop = function _loop() {
      var token = tokens[i++],
          newToken = void 0,
          combinator_callback = combinators[' '],

      /**
       * having selectors like `body :hidden` is not working since pseudo works only for elements array
       * so had to modify the code know if we found any sort of combinators.
       */
      combinators_found = false;

      if ((token.type === 'combinators' || token.type === 'descendant') && token.action in combinators) {
        combinator_callback = combinators[token.action];
        combinators_found = true;
        token = tokens[i++];
      }

      var _token = token,
          type = _token.type,
          id = _token.id;

      switch (type) {
        case '*':
          newToken = nextToken(i, tokens);
          i = newToken.pos;
          context = context.reduce(function (nodes, el) {
            return combinator_callback('*', el, nodes, newToken.token);
          }, []);
          break;

        case 'tag':
          newToken = nextToken(i, tokens);
          i = newToken.pos;
          context = context.reduce(function (nodes, el) {
            return combinator_callback(id, el, nodes, newToken.token);
          }, []);
          break;

        case 'attr':
          if ('id' === id || 'class' === id) {
            newToken = nextToken(i, tokens);
            i = newToken.pos;

            var _selector = 'id' === id ? '#' : '.';

            context = context.reduce(function (nodes, el) {
              return combinator_callback("" + _selector + token.val, el, nodes, newToken.token);
            }, []);
          } else {
            context = context.filter(function (el) {
              return attrHandler(el, token);
            });
          }

          break;

        case 'pseudo':
          if (context === root || combinators_found) {
            context = context.reduce(function (nodes, el) {
              return combinator_callback("*", el, nodes, false);
            }, []);
          }

          context = pesudoHandler(context, token);
          break;
      }
    };

    while (i < len) {
      _loop();
    }

    context.forEach(function (el) {
      if (!results.includes(el)) {
        results.push(el);
      }
    });
    return results;
  }, []);
}

function engine(selector, context) {
  /**
   * Node Types
   * 1  -- Element Node
   * 9  -- Document Node (document)
   * 11 -- Document FRAGMENT
   */
  var results = false,
      nodeType = context ? context.nodeType : 9;

  if (isString(selector) && (results = selectorResultsCache(selector))) {
    return results;
  }
  /**
   * Checks if selector var is a !string or !empty and also check for given contxt node type (1,9,11)
   */


  if (!selector || nodeType !== 1 && nodeType !== 9 && nodeType !== 11) {
    return results;
  }

  context = context || currentDocument;

  if (isString(selector)) {
    results = nativeQuery(selector, context);
  }

  if (!results) {
    results = findAdvanced(selector, context);
  }

  selectorResultsCache(selector, results);
  return results;
}

DizzleCore.version = '1.0.0';
DizzleCore.parse = parse;
DizzleCore.find = engine;
DizzleCore.cacheLength = 50;
DizzleCore.combinators = combinators;
DizzleCore.pesudo = pesudoHandlers;
DizzleCore.attr = attrHandlers;
DizzleCore.is = is;
DizzleCore.filter = filter;
setupMatcherFn();

function _find (sel, ctx) {
  if (!sel || !isDocument(ctx) && !isElement(ctx)) {
    return [];
  }

  return DizzleCore(sel, ctx);
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
      eles = rhtml.test(selector) ? parseHTML(selector) : _find(selector, ctx);

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

var attrBools = 'checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped'.split('|');

function plainObject () {
  return _obj.create(null);
}

var attrHooks = plainObject();

_each(attrBools, function (i, type) {
  attrHooks[type] = Object.create({
    get: function get(elem) {
      return elem.getAttribute(type) != null ? type.toLowerCase() : null;
    },
    set: function set(elem, name, value) {
      value === false ? elem.removeAttribute(elem, name) : elem.setAttribute(name, name);
      return name;
    }
  });
});

core.hooks = {
  attr: attrHooks,
  css: plainObject(),
  prop: plainObject()
};

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
    return matches$1(ele, comparator);
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
function matches$1(ele, selector) {
  return core.dizzle.is(selector, ele);
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

function hookHandler(hookType, hookname, Type) {
  if (!isUndefined(core.hooks[hookType][hookname]) && Type && !isUndefined(core.hooks[hookType][hookname][Type])) {
    return core.hooks[hookType][hookname][Type];
  }

  return false;
}
function attrHook(hookName, type) {
  return hookHandler('attr', hookName, type);
}
function cssHook(hookName, type) {
  return hookHandler('css', hookName, type);
}
function propHook(hookName, type) {
  return hookHandler('prop', hookName, type);
}

fn.attr = function (name, value) {
  var _this = this;

  if (!name) {
    return;
  }

  if (isString(name)) {
    var ln = name.toLowerCase();

    if (arguments.length < 2) {
      if (!this[0] || !isElement(this[0])) {
        return;
      }

      var _hook = attrHook(ln, 'get'),
          _value = _hook ? _hook(this[0], name) : null;

      _value = isNull(_value) ? this[0].getAttribute(name) : _value;
      return isNull(_value) ? undefined : _value;
    }

    if (isUndefined(value)) {
      return this;
    }

    if (isNull(value)) {
      return this.removeAttr(name);
    }

    var hook = attrHook(ln, 'set');
    return this.each(function (i, ele) {
      if (!isElement(ele)) {
        return;
      }

      hook ? hook(_this[0], name, value) : ele.setAttribute(name, value);
    });
  }

  handleObjectDataLoop.call(this, name, 'attr');
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

function attrHandler$1 (from, to, isMove) {
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
  return attrHandler$1.call(this, from, to);
};

fn.moveAttr = function (from, to) {
  return attrHandler$1.call(this, from, to, true);
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
      if (!this[0]) {
        return false;
      }

      var elem = this[0],
          _hook = propHook(prop, 'get'),
          _value = _hook ? _hook(elem, prop) : null;

      return isNull(_value) ? elem && elem[prop] : _value;
    }

    var hook = propHook(prop, 'set');
    return this.each(function (i, ele) {
      if (hook) {
        hook(ele, prop, value);
      } else {
        ele[prop] = access(value, i, ele);
      }
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
      var hook = cssHook(prop, 'get'),
          _value = hook ? hook(this[0], prop, isVariable) : null;

      return isNull(_value) ? this[0] && computeStyle(this[0], prop, isVariable) : _value;
    }

    if (!prop) {
      return this;
    }

    value = getSuffixedValue(prop, value, isVariable);
    return this.each(function (i, ele) {
      if (!isElement(ele)) {
        return;
      }

      var hook = cssHook(prop, 'set');

      if (hook) {
        hook(ele, prop, value, isVariable);
      } else {
        if (isVariable) {
          ele.style.setProperty(prop, value);
        } else {
          ele.style[prop] = value;
        }
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

          while (!matches$1(target, selector)) {
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
core.plainObject = plainObject;

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
core.dizzle = DizzleCore;
setupExtraEventsFunctions();

export default core;
