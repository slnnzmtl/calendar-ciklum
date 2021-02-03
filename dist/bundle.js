/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./WcMixin.js":
/*!********************!*\
  !*** ./WcMixin.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addAdjacentHTML": () => (/* binding */ addAdjacentHTML)
/* harmony export */ });
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function addAdjacentHTML(target, html) {
  target.on = on.bind(target);
  target.onAny = onAny.bind(target);
  target.bubbleEvent = bubbleEvent.bind(target);
  target.drownEvent = drownEvent.bind(target);
  target.display = display.bind(target);
  target.generateProps = generateProps.bind(target);
  target.insertAdjacentHTML('beforeend', html);
  target.generateProps();
}

function on(ev_type, listener, fire, options) {
  this.addEventListener(ev_type, listener, options);
  if (fire) listener();
}

function onAny(elements, ev_type, listener, fire, options) {
  var _iterator = _createForOfIteratorHelper(elements),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var el = _step.value;
      el.addEventListener(ev_type, listener, options);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  if (fire) listener();
}

function bubbleEvent(name, val) {
  var ev = new Event(name, {
    "bubbles": true
  });
  ev.val = val;
  this.dispatchEvent(ev);
}

function drownEvent(name, val) {
  var ev = new Event(name, {
    "bubbles": false
  });
  ev.val = val;
  this.dispatchEvent(ev);

  var _iterator2 = _createForOfIteratorHelper(this.querySelectorAll('*')),
      _step2;

  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var el = _step2.value;
      if (el.generateProps) el.dispatchEvent(ev);
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
}

function display(par) {
  if (par === false) {
    par = 'none';
  } else if (par === true || par === null || par === undefined) {
    par = '';
  }

  this.style.display = par;
}

function generateProps() {
  var _this = this;

  var winput = function winput(ev) {
    var el = ev.target;
    var ev1 = new Event('w-input', {
      "bubbles": true
    });
    ev1.val = el._getVal();
    el.dispatchEvent(ev1);
  };

  var wchange = function wchange(ev) {
    var el = ev.target;
    var ev1 = new Event('w-change', {
      "bubbles": true
    });
    ev1.val = el._getVal();
    el.dispatchEvent(ev1);
  };

  var generate = function generate(el) {
    if (el._getVal !== undefined) return;

    var _el$getAttribute$spli = el.getAttribute('w-id').split('/'),
        _el$getAttribute$spli2 = _slicedToArray(_el$getAttribute$spli, 3),
        wid = _el$getAttribute$spli2[0],
        wval = _el$getAttribute$spli2[1],
        wsource = _el$getAttribute$spli2[2];

    if (wsource) {
      el._getVal = function () {
        return el[wsource];
      };

      el._setVal = function (v) {
        return el[wsource] = v;
      };

      el.addEventListener('input', function (ev) {
        return winput(ev);
      });
      el.addEventListener('change', function (ev) {
        return wchange(ev);
      });
    } else {
      if (el.tagName === 'INPUT') {
        if (el.type == 'number') {
          el._getVal = function () {
            return Number(el.value);
          };

          el._setVal = function (v) {
            return el.value = v;
          };
        } else if (el.type == 'date') {
          el._getVal = function () {
            return Date.parse(el.value);
          };

          el._setVal = function (v) {
            return el.value = v;
          };
        } else if (el.type == 'checkbox') {
          el._getVal = function () {
            return el.checked;
          };

          el._setVal = function (v) {
            return el.checked = v;
          };
        } else if (el.type == 'radio') {
          el._getVal = function () {
            return el.checked ? el.value : false;
          };

          el._setVal = function (v) {
            return el.checked = v;
          };
        } else {
          el._getVal = function () {
            return el.value;
          };

          el._setVal = function (v) {
            return el.value = v;
          };
        }

        el.addEventListener('input', function (ev) {
          return winput(ev);
        });
        el.addEventListener('change', function (ev) {
          return wchange(ev);
        });
      } else if (el.tagName === 'SELECT') {
        if (!el.multiple) {
          el._getVal = function () {
            return el.value;
          };

          el._setVal = function (v) {
            return el.value = v;
          };
        } else {
          el._getVal = function () {
            var res = [];

            var _iterator3 = _createForOfIteratorHelper(el.selectedOptions),
                _step3;

            try {
              for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                var op = _step3.value;
                res.push(op.value);
              }
            } catch (err) {
              _iterator3.e(err);
            } finally {
              _iterator3.f();
            }

            return res;
          };

          el._setVal = function (vv) {
            var _iterator4 = _createForOfIteratorHelper(el.querySelectorAll('option')),
                _step4;

            try {
              for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
                var op = _step4.value;
                op.selected = vv.includes(op.value);
              }
            } catch (err) {
              _iterator4.e(err);
            } finally {
              _iterator4.f();
            }
          };
        }

        el.addEventListener('input', function (ev) {
          return winput(ev);
        });
        el.addEventListener('change', function (ev) {
          return wchange(ev);
        });
      } else if (el.tagName === 'TEXTAREA') {
        el._getVal = function () {
          return el.value;
        };

        el._setVal = function (v) {
          return el.value = v;
        };

        el.addEventListener('input', function (ev) {
          return winput(ev);
        });
        el.addEventListener('blur', function (ev) {
          return wchange(ev);
        });
      } else if (el.tagName === 'BUTTON') {
        el._val = false;

        el._getVal = function () {
          return el._val;
        };

        el._setVal = function (v) {
          return el._val = v;
        };

        el.addEventListener('click', function (ev) {
          el._val = !el._val;
          winput(ev);
          wchange(ev);
        });
      } else if (el.tagName === 'TEMPLATE') {
        el._getVal = function () {
          return el.content;
        };

        el._setVal = function (v) {
          return el.content = v;
        };

        el.addEventListener('input', function (ev) {
          return winput(ev);
        });
        el.addEventListener('blur', function (ev) {
          return wchange(ev);
        });
      } else {
        el._getVal = function () {
          return el.innerHTML;
        };

        el._setVal = function (v) {
          return el.innerHTML = v;
        };

        el.addEventListener('input', function (ev) {
          return winput(ev);
        });
        el.addEventListener('blur', function (ev) {
          return wchange(ev);
        });
      }
    }

    if (!('val' in el)) {
      Object.defineProperty(el, 'val', {
        get: function get() {
          return el._getVal();
        },
        set: function set(v) {
          el._setVal(v);

          var ev1 = new Event('w-input', {
            "bubbles": true
          });
          ev1.val = el._getVal();
          el.dispatchEvent(ev1);
          ev1 = new Event('w-change', {
            "bubbles": true
          });
          ev1.val = el._getVal();
          el.dispatchEvent(ev1);
        }
      });
    }

    if (wid && !(wid in _this)) {
      Object.defineProperty(_this, wid, {
        get: function get() {
          return el;
        }
      });
      if (!el.id) el.id = wid;
      if (el.on === undefined) el.on = on.bind(el);
      if (el.display === undefined) el.display = display.bind(el);
    }

    if (wval && !(wval in _this)) {
      Object.defineProperty(_this, wval, {
        get: function get() {
          return el.val;
        },
        set: function set(v) {
          return el.val = v;
        }
      });
    }
  };

  var _iterator5 = _createForOfIteratorHelper(this.querySelectorAll('[w-id]')),
      _step5;

  try {
    for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
      var el = _step5.value;
      generate(el);

      if (el.tagName === 'TEMPLATE') {
        var _iterator6 = _createForOfIteratorHelper(el.content.querySelectorAll('[w-id]')),
            _step6;

        try {
          for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
            var el1 = _step6.value;
            generate(el1);
          }
        } catch (err) {
          _iterator6.e(err);
        } finally {
          _iterator6.f();
        }
      }
    }
  } catch (err) {
    _iterator5.e(err);
  } finally {
    _iterator5.f();
  }
}

/***/ }),

/***/ "./components/calendarComponent/calendarComponent.js":
/*!***********************************************************!*\
  !*** ./components/calendarComponent/calendarComponent.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_calendarComponent_calendarComponent_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../components/calendarComponent/calendarComponent.scss */ "./components/calendarComponent/calendarComponent.scss");
/* harmony import */ var _WcMixin_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../WcMixin.js */ "./WcMixin.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var me = 'calendar-component';
customElements.define(me, (_temp = /*#__PURE__*/function (_HTMLElement) {
  _inherits(_temp, _HTMLElement);

  var _super = _createSuper(_temp);

  function _temp() {
    var _this2;

    _classCallCheck(this, _temp);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this2 = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this2), "_but", null);

    return _this2;
  }

  _createClass(_temp, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      _WcMixin_js__WEBPACK_IMPORTED_MODULE_1__.addAdjacentHTML(this, this.createCalendar(10, 18));

      var _this = this;

      _this.fillTable(_this.getEvents());

      var buttons = this.querySelectorAll('.event-flag__button');
      buttons.forEach(function (button) {
        button.addEventListener('click', function (e) {
          _this.removeEvent(e.target.getAttribute('day'), e.target.getAttribute('time'));
        });
      });
    }
  }, {
    key: "createCalendar",
    value: function createCalendar(start, end) {
      var table = '<table><tr><th class="row-header">Time</th><th>Monday</th><th>Tuesday</th><th>Wednesday</th><th>Thursday</th><th>Friday</th></tr>';

      for (var i = start; i <= end; i++) {
        table += "<tr><th class=\"row-header\">" + i + ':00' + "</th><td day=\"mon\" time=\"" + i + "\"></td><td day=\"tues\" time=\"" + i + "\"></td><td day=\"wed\" time=\"" + i + "\"></td><td day=\"thu\" time=\"" + i + "\"></td><td day=\"fri\" time=\"" + i + "\"></td></tr>";
      }

      return table;
    }
  }, {
    key: "fillTable",
    value: function fillTable(events) {
      var elements = this.querySelectorAll('table tr td');
      elements.forEach(function (elem) {
        events.forEach(function (item) {
          if (elem.getAttribute('day') === item.day && elem.getAttribute('time') === item.time) {
            _WcMixin_js__WEBPACK_IMPORTED_MODULE_1__.addAdjacentHTML(elem, "\n                        <div class=\"event-flag\">\n                            <p class=\"event-flag__name\">" + item.name + "</p>\n                            <button class=\"event-flag__button\" day=\"" + item.day + "\" time=\"" + item.time + "\">X</button>\n                        </div>\n                    ");
          }
        });
      });
    }
  }, {
    key: "removeEvent",
    value: function removeEvent(day, time) {
      var events = this.getEvents();
      events.forEach(function (item, index) {
        if (item.day === day && item.time === time) {
          events.splice(index, 1);
        }
      });
      this.setCookie('calendar', JSON.stringify(events));
      location.reload();
    }
  }, {
    key: "setCookie",
    value: function setCookie(name, value) {
      var replaced = value.replace('[', '').replace(']', '');
      document.cookie = encodeURIComponent(name) + '=' + encodeURIComponent(replaced);
    }
  }, {
    key: "getEvents",
    value: function getEvents() {
      var replaced = this.getCookie('calendar').replaceAll('},', '}},');
      var events = this.getCookie('calendar');
      var arr = replaced.split('},'); // let arr = JSON.parse(events)

      console.log(arr);
      arr.forEach(function (item, index) {
        if (item) {
          arr[index] = JSON.parse(item);
        }
      });
      return arr;
    }
  }, {
    key: "getCookie",
    value: function getCookie(name) {
      var matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
      return matches ? decodeURIComponent(matches[1]) : undefined;
    }
  }]);

  return _temp;
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement)), _temp));

/***/ }),

/***/ "./components/calendarHeader/calendarHeader.js":
/*!*****************************************************!*\
  !*** ./components/calendarHeader/calendarHeader.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _WcMixin_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../WcMixin.js */ "./WcMixin.js");
/* harmony import */ var _calendarHeader_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./calendarHeader.scss */ "./components/calendarHeader/calendarHeader.scss");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var me = 'calendar-header';
customElements.define(me, (_temp = /*#__PURE__*/function (_HTMLElement) {
  _inherits(_temp, _HTMLElement);

  var _super = _createSuper(_temp);

  function _temp() {
    var _this;

    _classCallCheck(this, _temp);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "_but", null);

    return _this;
  }

  _createClass(_temp, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      var _this2 = this;

      _WcMixin_js__WEBPACK_IMPORTED_MODULE_0__.addAdjacentHTML(this, "\n            <h1 class=\"calendar-header__header\">Calendar</h1>\n            <div class=\"calendar-header__options\">\n                <select \n                    class=\"calendar-header__filter\"\n                    w-id=\"selectParticipant/participant\"    \n                >\n                    <option value=\"\" selected>All members</option>\n                    <option value=\"John\">John</option>\n                    <option value=\"Eddard\">Eddard</option>\n                    <option value=\"Robbert\">Robbert</option>\n                    <option value=\"Jaime\">Jaime</option>\n                    <option value=\"Cersei\">Cersei</option>\n                </select>\n                <button w-id=\"buttonElem/button\" class=\"calendar-header__button\">New Event+</button>\n            </div>\n        ");

      this.buttonElem.onclick = function () {
        return _this2.newEvent();
      };
    }
  }, {
    key: "newEvent",
    value: function newEvent() {
      window.newEvent.style = "display: flex";
    }
  }]);

  return _temp;
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement)), _temp));

/***/ }),

/***/ "./components/newEvent/newEvent.js":
/*!*****************************************!*\
  !*** ./components/newEvent/newEvent.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _WcMixin_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../WcMixin.js */ "./WcMixin.js");
/* harmony import */ var _newEvent_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./newEvent.scss */ "./components/newEvent/newEvent.scss");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var me = 'new-event';
customElements.define(me, (_temp = /*#__PURE__*/function (_HTMLElement) {
  _inherits(_temp, _HTMLElement);

  var _super = _createSuper(_temp);

  function _temp() {
    var _this;

    _classCallCheck(this, _temp);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "_but", null);

    return _this;
  }

  _createClass(_temp, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      var _this2 = this;

      _WcMixin_js__WEBPACK_IMPORTED_MODULE_0__.addAdjacentHTML(this, "\n            <div class=\"new-event\">\n                <Label \n                    class=\"new-event__item\" \n                >Name: \n                    <input \n                        class=\"new-event__input\"\n                        w-id=\"inputName/name\"\n                    ></input>\n                </Label>\n                <Label \n                    class=\"new-event__item\" \n                >Participants: \n                    <select \n                        class=\"new-event__input\"\n                        w-id=\"inputParticipant/participant\"\n                    >\n                        <option value=\"John\" selected>John</option>\n                        <option value=\"Eddard\">Eddard</option>\n                        <option value=\"Robbert\">Robbert</option>\n                        <option value=\"Jaime\">Jaime</option>\n                        <option value=\"Cersei\">Cersei</option>\n                    </select>\n                </Label>\n                <Label \n                    class=\"new-event__item\" \n                >Day\n                    <select \n                        class=\"new-event__input\"\n                        w-id=\"inputDay/day\"\n                    >\n                        <option value=\"mon\" selected>Monday</option>\n                        <option value=\"tue\">Tuesday</option>\n                        <option value=\"wed\">Wednesday</option>\n                        <option value=\"thu\">Thursday</option>\n                        <option value=\"fri\">Friday</option>\n                    </select>\n                </Label>\n                <Label \n                    class=\"new-event__item\" \n                >Time\n                    <select \n                        class=\"new-event__input\"\n                        w-id=\"inputTime/time\"\n                    >\n                        <option value=\"10\">10:00</option>\n                        <option value=\"11\">11:00</option>\n                        <option value=\"12\">12:00</option>\n                        <option value=\"13\">13:00</option>\n                        <option value=\"14\">14:00</option>\n                        <option value=\"15\">15:00</option>\n                        <option value=\"16\">16:00</option>\n                        <option value=\"17\">17:00</option>\n                        <option value=\"18\">18:00</option>\n                    </select>\n                </Label>\n                <div class=\"new-event__button-wrapper\">\n                    <button w-id=\"buttonCreate/create\" class=\"new-event__button\">Create</button>\n                    <button w-id=\"buttonCancel/cancel\" class=\"new-event__button\">Cancel</button>\n                </div>\n            </div>\n            <style>\n                ".concat(me, " {\n                    \n                }\n            </style>\n        "));

      this.buttonCreate.onclick = function () {
        return _this2.createEvent();
      };

      this.buttonCancel.onclick = function () {
        return _this2.cancel();
      };

      window.newEvent = this;
    }
  }, {
    key: "createEvent",
    value: function createEvent() {
      var object = {};
      object.name = this.name;
      object.participants = this.participants;
      object.day = this.day;
      object.time = this.time;
      this.setCookie('calendar', JSON.stringify(object));
      location.reload();
    }
  }, {
    key: "setCookie",
    value: function setCookie(name, value) {
      var events = decodeURIComponent(this.getCookie(name));

      if (events && events !== 'undefined') {
        var data = events += ',' + value;
        document.cookie = encodeURIComponent(name) + '=' + encodeURIComponent(data);
        console.log(encodeURIComponent(data));
      } else {
        document.cookie = name + '=' + encodeURIComponent(value);
      }
    }
  }, {
    key: "getCookie",
    value: function getCookie(name) {
      var matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
      return matches ? decodeURIComponent(matches[1]) : undefined;
    }
  }, {
    key: "cancel",
    value: function cancel() {
      console.log('canceled');
      window.newEvent.style = "display: none";
    }
  }]);

  return _temp;
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement)), _temp));

/***/ }),

/***/ "./eventBus.js":
/*!*********************!*\
  !*** ./eventBus.js ***!
  \*********************/
/***/ (() => {

function EventBus() {
  var eventCallbacksPairs = [];

  this.subscribe = function (eventType, callback) {
    var eventCallbacksPair = findEventCallbacksPair(eventType);
    if (eventCallbacksPair) eventCallbacksPair.callbacks.push(callback);else eventCallbacksPairs.push(new EventCallbacksPair(eventType, callback));
  };

  this.post = function (eventType, args) {
    var eventCallbacksPair = findEventCallbacksPair(eventType);

    if (!eventCallbacksPair) {
      console.error("no subscribers for event " + eventType);
      return;
    }

    eventCallbacksPair.callbacks.forEach(function (callback) {
      return callback(args);
    });
  };

  function findEventCallbacksPair(eventType) {
    return eventCallbacksPairs.find(function (eventObject) {
      return eventObject.eventType === eventType;
    });
  }

  function EventCallbacksPair(eventType, callback) {
    this.eventType = eventType;
    this.callbacks = [callback];
  }
}

/***/ }),

/***/ "./main.js":
/*!*****************!*\
  !*** ./main.js ***!
  \*****************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_calendarComponent_calendarComponent_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../components/calendarComponent/calendarComponent.js */ "./components/calendarComponent/calendarComponent.js");
/* harmony import */ var _components_calendarHeader_calendarHeader_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../components/calendarHeader/calendarHeader.js */ "./components/calendarHeader/calendarHeader.js");
/* harmony import */ var _components_newEvent_newEvent_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/newEvent/newEvent.js */ "./components/newEvent/newEvent.js");
/* harmony import */ var _eventBus_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./eventBus.js */ "./eventBus.js");
/* harmony import */ var _eventBus_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_eventBus_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _styles_main_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../styles/main.scss */ "./styles/main.scss");




 // import CalendarDatePicker from "/components/CalendarDatePicker/CalendarDatePicker.js";

document.addEventListener("DOMContentLoaded", function () {// CalendarComponent("calendar", new Date().getFullYear(), new Date().getMonth()+1)
});

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./components/calendarComponent/calendarComponent.scss":
/*!******************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./components/calendarComponent/calendarComponent.scss ***!
  \******************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ "./node_modules/css-loader/dist/runtime/cssWithMappingToString.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "table {\n  border-collapse: collapse;\n  width: 100%;\n  margin: auto;\n  height: 90vmin;\n  table-layout: fixed;\n}\ntable tr .row-header {\n  width: 100px;\n}\n\ntable tr:first-child {\n  height: 5vh !important;\n}\n\ntable td {\n  box-sizing: border-box;\n  height: 10%;\n}\ntable td .event-flag {\n  height: 100%;\n  width: 100%;\n  background-color: #B9CFD4;\n  box-sizing: border-box;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 10px;\n}\ntable td .event-flag__button {\n  background: none;\n  border: none;\n  outline: none;\n  cursor: pointer;\n}\n\ntd, th {\n  border: 1px solid black;\n  width: 20%;\n}\n\nth {\n  font-weight: bold;\n  background-color: #CEE0DC;\n}", "",{"version":3,"sources":["webpack://./components/calendarComponent/calendarComponent.scss","webpack://./styles/variables.scss"],"names":[],"mappings":"AAEA;EACI,yBAAA;EACA,WAAA;EACA,YAAA;EACA,cAAA;EACA,mBAAA;AADJ;AAMQ;EACI,YAAA;AAJZ;;AASA;EACQ,sBAAA;AANR;;AASA;EACI,sBAAA;EAEA,WAAA;AAPJ;AAQI;EACI,YAAA;EACA,WAAA;EACA,yBC5BC;ED6BD,sBAAA;EACA,aAAA;EACA,8BAAA;EACA,mBAAA;EACA,aAAA;AANR;AAQQ;EACI,gBAAA;EACA,YAAA;EACA,aAAA;EACA,eAAA;AANZ;;AAYA;EACI,uBAAA;EACA,UAAA;AATJ;;AAYA;EACI,iBAAA;EACA,yBCrDK;AD4CT","sourcesContent":["@import '/styles/variables.scss';\r\n\r\ntable {\r\n    border-collapse: collapse;\r\n    width: 100%;\r\n    margin: auto;\r\n    height: 90vmin;\r\n    table-layout: fixed;\r\n\r\n\r\n    tr {\r\n\r\n        .row-header {\r\n            width: 100px;\r\n        }\r\n    }\r\n}\r\n\r\ntable tr:first-child {\r\n        height: 5vh!important;\r\n}\r\n\r\ntable td {\r\n    box-sizing: border-box;\r\n    \r\n    height: 10%;\r\n    .event-flag {\r\n        height: 100%;\r\n        width: 100%;\r\n        background-color: $color2;\r\n        box-sizing: border-box;\r\n        display:flex;\r\n        justify-content: space-between;\r\n        align-items: center;\r\n        padding: 10px;\r\n\r\n        &__button {\r\n            background: none;\r\n            border: none;\r\n            outline: none;\r\n            cursor: pointer;\r\n        }\r\n    }\r\n}\r\n\r\n\r\ntd, th {\r\n    border: 1px solid black;\r\n    width: 20%;\r\n}\r\n\r\nth {\r\n    font-weight: bold;\r\n    background-color: $color1;\r\n}","$color1: #CEE0DC;\r\n$color2: #B9CFD4;\r\n$color3: #A5243D;"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./components/calendarHeader/calendarHeader.scss":
/*!************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./components/calendarHeader/calendarHeader.scss ***!
  \************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ "./node_modules/css-loader/dist/runtime/cssWithMappingToString.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".calendar-header {\n  display: flex;\n  width: 100%;\n  justify-content: space-between;\n  align-items: center;\n}\n.calendar-header__header {\n  font-size: 22px;\n}\n.calendar-header__filter {\n  margin-right: 10px;\n}\n.calendar-header__button {\n  height: 50%;\n  cursor: pointer;\n  background-color: #CEE0DC;\n  color: #000;\n  border: none;\n  border-radius: 5px;\n  padding: 10px;\n  box-sizing: border-box;\n  outline: none;\n  transition: ease 0.1s;\n  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.3);\n}\n.calendar-header__button:hover {\n  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.5);\n}\n.calendar-header__button:active {\n  box-shadow: inset 0px 1px 3px 0px rgba(0, 0, 0, 0.3);\n}", "",{"version":3,"sources":["webpack://./components/calendarHeader/calendarHeader.scss","webpack://./styles/variables.scss"],"names":[],"mappings":"AAEA;EACI,aAAA;EACA,WAAA;EACA,8BAAA;EACA,mBAAA;AADJ;AAGI;EACI,eAAA;AADR;AAII;EACI,kBAAA;AAFR;AAKI;EACI,WAAA;EACA,eAAA;EACA,yBCnBC;EDoBD,WAAA;EACA,YAAA;EACA,kBAAA;EACA,aAAA;EACA,sBAAA;EACA,aAAA;EACA,qBAAA;EACA,8CAAA;AAHR;AAIQ;EACI,8CAAA;AAFZ;AAIQ;EACI,oDAAA;AAFZ","sourcesContent":["@import '/styles/variables.scss';\r\n\r\n.calendar-header {\r\n    display: flex;\r\n    width: 100%;\r\n    justify-content: space-between;\r\n    align-items: center;\r\n\r\n    &__header {\r\n        font-size: 22px;\r\n    }\r\n\r\n    &__filter {\r\n        margin-right: 10px;\r\n    }\r\n\r\n    &__button {\r\n        height: 50%;\r\n        cursor: pointer;\r\n        background-color: $color1;\r\n        color: #000;\r\n        border: none;\r\n        border-radius: 5px;\r\n        padding: 10px;\r\n        box-sizing: border-box;\r\n        outline: none;\r\n        transition: ease 0.1s;\r\n        box-shadow: 0px 1px 3px 0px rgba(0,0,0,0.3);\r\n        &:hover {\r\n            box-shadow: 0px 1px 3px 0px rgba(0,0,0,0.5);\r\n        }\r\n        &:active {\r\n            box-shadow: inset  0px 1px 3px 0px rgba(0,0,0,0.3);\r\n        }\r\n    }\r\n}","$color1: #CEE0DC;\r\n$color2: #B9CFD4;\r\n$color3: #A5243D;"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./components/newEvent/newEvent.scss":
/*!************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./components/newEvent/newEvent.scss ***!
  \************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ "./node_modules/css-loader/dist/runtime/cssWithMappingToString.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".new-event-container {\n  display: none;\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  background-color: rgba(255, 255, 255, 0.8);\n}\n.new-event-container .new-event {\n  display: flex;\n  flex-direction: column;\n  margin: auto;\n  width: 500px;\n  box-sizing: border-box;\n  padding: 40px;\n  background-color: #CEE0DC;\n  border: 1px solid #000;\n  border-radius: 5px;\n  justify-content: center;\n  align-items: space-between;\n}\n.new-event-container .new-event__item {\n  display: flex;\n  justify-content: space-between;\n}\n.new-event-container .new-event__input {\n  width: 75%;\n  height: 30px;\n  margin-bottom: 10px;\n  border-radius: 5px;\n  border: none;\n  padding-left: 10px;\n  box-sizing: border-box;\n  outline: none;\n}\n.new-event-container .new-event__input:focus {\n  box-shadow: inset 0px 1px 3px 0px rgba(0, 0, 0, 0.3);\n}\n.new-event-container .new-event__button-wrapper {\n  margin-top: 20px;\n  display: flex;\n  justify-content: flex-end;\n  width: 100%;\n}\n.new-event-container .new-event__button {\n  border-radius: 5px;\n  border: none;\n  outline: none;\n  margin-bottom: 10px;\n  width: 30%;\n  height: 30px;\n  margin-left: 10px;\n  box-sizing: border-box;\n  cursor: pointer;\n  transition: ease 0.1s;\n  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.3);\n}\n.new-event-container .new-event__button:hover {\n  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.5);\n}\n.new-event-container .new-event__button:active {\n  box-shadow: inset 0px 1px 3px 0px rgba(0, 0, 0, 0.3);\n}", "",{"version":3,"sources":["webpack://./components/newEvent/newEvent.scss","webpack://./styles/variables.scss"],"names":[],"mappings":"AAEA;EACI,aAAA;EACA,kBAAA;EACA,OAAA;EACA,MAAA;EACA,WAAA;EACA,YAAA;EACA,0CAAA;AADJ;AAGI;EACI,aAAA;EACA,sBAAA;EACA,YAAA;EACA,YAAA;EACA,sBAAA;EAEA,aAAA;EACA,yBCnBC;EDoBD,sBAAA;EACA,kBAAA;EACA,uBAAA;EACA,0BAAA;AAFR;AAIQ;EACI,aAAA;EACA,8BAAA;AAFZ;AAKQ;EACI,UAAA;EACA,YAAA;EACA,mBAAA;EACA,kBAAA;EACA,YAAA;EACA,kBAAA;EACA,sBAAA;EACA,aAAA;AAHZ;AAIY;EACI,oDAAA;AAFhB;AAMQ;EACI,gBAAA;EACA,aAAA;EACA,yBAAA;EACA,WAAA;AAJZ;AAOQ;EACI,kBAAA;EACA,YAAA;EACA,aAAA;EACA,mBAAA;EACA,UAAA;EACA,YAAA;EACA,iBAAA;EACA,sBAAA;EACA,eAAA;EACA,qBAAA;EACA,8CAAA;AALZ;AAMY;EACI,8CAAA;AAJhB;AAMY;EACI,oDAAA;AAJhB","sourcesContent":["@import '/styles/variables.scss';\r\n\r\n.new-event-container {\r\n    display: none;\r\n    position: absolute;\r\n    left: 0;\r\n    top: 0;\r\n    width: 100%;\r\n    height: 100%;\r\n    background-color: rgba(255,255,255,0.8);\r\n\r\n    .new-event {\r\n        display: flex;\r\n        flex-direction: column;\r\n        margin: auto;\r\n        width: 500px;\r\n        box-sizing: border-box;\r\n        // height: 30%;\r\n        padding: 40px;\r\n        background-color: $color1;\r\n        border: 1px solid #000;\r\n        border-radius: 5px;\r\n        justify-content: center;\r\n        align-items: space-between;\r\n\r\n        &__item {\r\n            display: flex;\r\n            justify-content: space-between;\r\n        }\r\n\r\n        &__input {\r\n            width: 75%;\r\n            height: 30px;\r\n            margin-bottom: 10px;\r\n            border-radius: 5px;\r\n            border: none;\r\n            padding-left: 10px;\r\n            box-sizing: border-box;\r\n            outline: none;\r\n            &:focus {\r\n                box-shadow: inset  0px 1px 3px 0px rgba(0,0,0,0.3);\r\n            }\r\n        }\r\n\r\n        &__button-wrapper {\r\n            margin-top: 20px;\r\n            display: flex;\r\n            justify-content: flex-end;\r\n            width: 100%;\r\n        }\r\n\r\n        &__button {\r\n            border-radius: 5px;\r\n            border: none;\r\n            outline: none;\r\n            margin-bottom: 10px;\r\n            width: 30%;\r\n            height: 30px;\r\n            margin-left: 10px;\r\n            box-sizing: border-box;\r\n            cursor: pointer;\r\n            transition: ease 0.1s;\r\n            box-shadow: 0px 1px 3px 0px rgba(0,0,0,0.3);\r\n            &:hover {\r\n                box-shadow: 0px 1px 3px 0px rgba(0,0,0,0.5);\r\n            }\r\n            &:active {\r\n                box-shadow: inset  0px 1px 3px 0px rgba(0,0,0,0.3);\r\n            }\r\n\r\n        }\r\n    }\r\n}","$color1: #CEE0DC;\r\n$color2: #B9CFD4;\r\n$color3: #A5243D;"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./styles/main.scss":
/*!*******************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./styles/main.scss ***!
  \*******************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ "./node_modules/css-loader/dist/runtime/cssWithMappingToString.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "#main {\n  width: 90vw;\n  margin: auto;\n}", "",{"version":3,"sources":["webpack://./styles/main.scss"],"names":[],"mappings":"AAAA;EACI,WAAA;EACA,YAAA;AACJ","sourcesContent":["#main {\r\n    width: 90vw;\r\n    margin: auto;\r\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/cssWithMappingToString.js":
/*!************************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/cssWithMappingToString.js ***!
  \************************************************************************/
/***/ ((module) => {

"use strict";


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

module.exports = function cssWithMappingToString(item) {
  var _item = _slicedToArray(item, 4),
      content = _item[1],
      cssMapping = _item[3];

  if (typeof btoa === 'function') {
    // eslint-disable-next-line no-undef
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || '').concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
};

/***/ }),

/***/ "./components/calendarComponent/calendarComponent.scss":
/*!*************************************************************!*\
  !*** ./components/calendarComponent/calendarComponent.scss ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_calendarComponent_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./calendarComponent.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./components/calendarComponent/calendarComponent.scss");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_calendarComponent_scss__WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_calendarComponent_scss__WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

/***/ }),

/***/ "./components/calendarHeader/calendarHeader.scss":
/*!*******************************************************!*\
  !*** ./components/calendarHeader/calendarHeader.scss ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_calendarHeader_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./calendarHeader.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./components/calendarHeader/calendarHeader.scss");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_calendarHeader_scss__WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_calendarHeader_scss__WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

/***/ }),

/***/ "./components/newEvent/newEvent.scss":
/*!*******************************************!*\
  !*** ./components/newEvent/newEvent.scss ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_newEvent_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./newEvent.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./components/newEvent/newEvent.scss");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_newEvent_scss__WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_newEvent_scss__WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

/***/ }),

/***/ "./styles/main.scss":
/*!**************************!*\
  !*** ./styles/main.scss ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/dist/cjs.js!./main.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./styles/main.scss");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : 0;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./main.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
//# sourceMappingURL=bundle.js.map