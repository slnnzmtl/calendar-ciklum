/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./WcMixin.js":
/*!********************!*\
  !*** ./WcMixin.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _calendarComponent_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./calendarComponent.scss */ "./components/calendarComponent/calendarComponent.scss");
/* harmony import */ var _WcMixin_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../WcMixin.js */ "./WcMixin.js");
/* harmony import */ var _plugins_cookies_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../plugins/cookies.js */ "./plugins/cookies.js");
/* harmony import */ var _plugins_draggable_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../plugins/draggable.js */ "./plugins/draggable.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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





var me = 'calendar-component';
var days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
customElements.define(me, /*#__PURE__*/function (_HTMLElement) {
  _inherits(_class, _HTMLElement);

  var _super = _createSuper(_class);

  function _class() {
    _classCallCheck(this, _class);

    return _super.apply(this, arguments);
  }

  _createClass(_class, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      _WcMixin_js__WEBPACK_IMPORTED_MODULE_1__.addAdjacentHTML(this, this.createCalendar(10, 18));

      var _this = this;

      document.querySelector('#filterParticipant').addEventListener('change', function (ev) {
        _this.fillTable(_this.filterEvents(ev.target.value));
      });

      _this.fillTable(_plugins_cookies_js__WEBPACK_IMPORTED_MODULE_2__.getEvents());
    }
  }, {
    key: "createCalendar",
    value: function createCalendar(start, end) {
      var table = '<table><tr><th class="row-header">Time</th>';
      days.forEach(function (day) {
        table += "<th>".concat(day, "</th>");
      });
      table += '</tr>';

      var _loop = function _loop(i) {
        table += "<tr><th class=\"row-header\">".concat(i, ":00</th>");
        days.forEach(function (day) {
          table += "<td day=\"".concat(day, "\" time=\"").concat(i, "\" ondragover=\"onDragOver(event)\" ondrop=\"onDrop(event)\"></td>");
        });
        table += '</tr>';
      };

      for (var i = start; i <= end; i += 1) {
        _loop(i);
      }

      table += '</table>';
      return table;
    }
  }, {
    key: "fillTable",
    value: function fillTable(events) {
      var elements = this.querySelectorAll('table tr td');
      events.forEach(function (item) {
        elements.forEach(function (elem) {
          if (elem.getAttribute('day') === item.day && elem.getAttribute('time') === item.time) {
            _WcMixin_js__WEBPACK_IMPORTED_MODULE_1__.addAdjacentHTML(elem, "\n            <div class=\"event-flag\" \n              draggable=\"true\" \n              ondragstart=\"onDragStart(event)\" \n              day=\"".concat(item.day, "\" \n              time=\"").concat(item.time, "\"\n            >\n              <p class=\"event-flag__name\">").concat(item.name, "</p>\n              <button class=\"event-flag__button\">X</button>\n            </div>\n          "));
          }
        });
      });
      this.addRemoveEventListeners();
    }
  }, {
    key: "clearTable",
    value: function clearTable() {
      var flags = document.querySelectorAll('.event-flag');
      flags.forEach(function (item) {
        item.remove();
      });
    }
  }, {
    key: "showRemoveWindow",
    value: function showRemoveWindow(target) {
      var main = document.querySelector('#main');
      var parent = {};
      parent.name = target.parentElement.querySelector('.event-flag__name').textContent;
      parent.day = target.parentElement.getAttribute('day');
      parent.time = target.parentElement.getAttribute('time');
      main.insertAdjacentHTML('afterbegin', "\n        <remove-event class=\"remove-event-wrapper\" \n          name=\"".concat(parent.name, "\" \n          day=\"").concat(parent.day, "\" \n          time=\"").concat(parent.time, "\"\n        ></remove-event>\n      "));
    }
  }, {
    key: "filterEvents",
    value: function filterEvents(value) {
      this.clearTable();
      var events = _plugins_cookies_js__WEBPACK_IMPORTED_MODULE_2__.getEvents();
      var result = [];

      if (value !== '') {
        if (events && events !== 'undefined') {
          events.forEach(function (item) {
            if (item.participants.includes(value)) {
              result.push(item);
            }
          });
        }
      } else {
        result = events;
      }

      return result;
    }
  }, {
    key: "addRemoveEventListeners",
    value: function addRemoveEventListeners() {
      var _this = this;

      var buttons = this.querySelectorAll('.event-flag__button');
      buttons.forEach(function (button) {
        button.addEventListener('click', function (e) {
          _this.showRemoveWindow(e.target);
        });
      });
    }
  }]);

  return _class;
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement)));

/***/ }),

/***/ "./components/calendarHeader/calendarHeader.js":
/*!*****************************************************!*\
  !*** ./components/calendarHeader/calendarHeader.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _WcMixin_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../WcMixin.js */ "./WcMixin.js");
/* harmony import */ var _calendarHeader_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./calendarHeader.scss */ "./components/calendarHeader/calendarHeader.scss");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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



var me = 'calendar-header';
customElements.define(me, /*#__PURE__*/function (_HTMLElement) {
  _inherits(_class, _HTMLElement);

  var _super = _createSuper(_class);

  function _class() {
    _classCallCheck(this, _class);

    return _super.apply(this, arguments);
  }

  _createClass(_class, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      var _this = this;

      _WcMixin_js__WEBPACK_IMPORTED_MODULE_0__.addAdjacentHTML(this, "\n      <h1 class=\"calendar-header__header\">Calendar</h1>\n      <div class=\"calendar-header__options\">\n        <select \n          class=\"calendar-header__filter\"\n          w-id=\"filterParticipant/participant\"    \n        >\n          <option value=\"\" selected>All members</option>\n          <option value=\"John\">John</option>\n          <option value=\"Eddard\">Eddard</option>\n          <option value=\"Robbert\">Robbert</option>\n          <option value=\"Jaime\">Jaime</option>\n          <option value=\"Cersei\">Cersei</option>\n        </select>\n        <button w-id=\"buttonElem/button\" class=\"calendar-header__button\">New Event+</button>\n      </div>\n    ");

      this.buttonElem.onclick = function () {
        return _this.newEvent();
      };
    }
  }, {
    key: "newEvent",
    value: function newEvent() {
      var main = document.querySelector('#main');
      main.insertAdjacentHTML('afterbegin', "\n      <new-event class=\"new-event-container\"></new-event>\n    ");
    }
  }]);

  return _class;
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement)));

/***/ }),

/***/ "./components/newEvent/newEvent.js":
/*!*****************************************!*\
  !*** ./components/newEvent/newEvent.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _WcMixin_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../WcMixin.js */ "./WcMixin.js");
/* harmony import */ var _plugins_cookies_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../plugins/cookies.js */ "./plugins/cookies.js");
/* harmony import */ var _newEvent_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./newEvent.scss */ "./components/newEvent/newEvent.scss");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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




var me = 'new-event';
customElements.define(me, /*#__PURE__*/function (_HTMLElement) {
  _inherits(_class, _HTMLElement);

  var _super = _createSuper(_class);

  function _class() {
    _classCallCheck(this, _class);

    return _super.apply(this, arguments);
  }

  _createClass(_class, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      var _this = this;

      _WcMixin_js__WEBPACK_IMPORTED_MODULE_0__.addAdjacentHTML(this, "\n      <div class=\"new-event\">\n        <Label \n          class=\"new-event__item\" \n        >Name: \n          <input autofocus\n            class=\"new-event__input\"\n            w-id=\"inputName/name\"\n          ></input>\n        </Label>\n        <Label \n          class=\"new-event__item\" \n        >Members: \n          <select \n            class=\"new-event__input\"\n            w-id=\"selectParticipant/participants\"\n            multiple\n          >\n            <option value=\"John\" selected>John</option>\n            <option value=\"Eddard\">Eddard</option>\n            <option value=\"Robbert\">Robbert</option>\n            <option value=\"Jaime\">Jaime</option>\n            <option value=\"Cersei\">Cersei</option>\n          </select>\n        </Label>\n        <Label \n          class=\"new-event__item\" \n        >Day:\n          <select \n            class=\"new-event__input\"\n            w-id=\"inputDay/day\"\n          >\n            <option value=\"Monday\" selected>Monday</option>\n            <option value=\"Tuesday\">Tuesday</option>\n            <option value=\"Wednesday\">Wednesday</option>\n            <option value=\"Thursday\">Thursday</option>\n            <option value=\"Friday\">Friday</option>\n          </select>\n        </Label>\n        <Label \n          class=\"new-event__item\" \n        >Time:\n          <select \n            class=\"new-event__input\"\n            w-id=\"inputTime/time\"\n          >\n            <option value=\"10\">10:00</option>\n            <option value=\"11\">11:00</option>\n            <option value=\"12\">12:00</option>\n            <option value=\"13\">13:00</option>\n            <option value=\"14\">14:00</option>\n            <option value=\"15\">15:00</option>\n            <option value=\"16\">16:00</option>\n            <option value=\"17\">17:00</option>\n            <option value=\"18\">18:00</option>\n          </select>\n        </Label>\n        <div class=\"new-event__button-wrapper\">\n          <button w-id=\"buttonCreate/create\" class=\"new-event__button\">Create</button>\n          <button w-id=\"buttonCancel/cancel\" class=\"new-event__button\">Cancel</button>\n        </div>\n      </div>\n    ");

      this.buttonCreate.onclick = function () {
        return _this.createEvent();
      };

      this.buttonCancel.onclick = function () {
        return _this.cancel();
      };

      window.newEvent = this;
      new vanillaSelectBox('#selectParticipant');
    }
  }, {
    key: "createEvent",
    value: function createEvent() {
      var object = {};
      object.name = this.name;
      object.participants = this.participants;
      object.day = this.day;
      object.time = this.time;

      if (object.name !== '') {
        var cookies = _plugins_cookies_js__WEBPACK_IMPORTED_MODULE_1__.getCookie('calendar');
        var replaced;
        var events;

        if (cookies) {
          replaced = cookies.replaceAll('},', '}},');
        }

        events = replaced && replaced !== 'undefined' ? replaced.split('},') : undefined;

        if (!this.checkIfExist(events, object)) {
          if (events && events !== 'undefined') {
            var data = "".concat(events, ",").concat(JSON.stringify(object));
            _plugins_cookies_js__WEBPACK_IMPORTED_MODULE_1__.setCookie('calendar', data);
          } else {
            _plugins_cookies_js__WEBPACK_IMPORTED_MODULE_1__.setCookie('calendar', JSON.stringify(object));
          }

          location.reload();
        }
      } else {
        this.showError("Name cannot be empty.");
      }
    }
  }, {
    key: "checkIfExist",
    value: function checkIfExist(data, object) {
      var _this2 = this;

      if (data) {
        var result = false;
        data.forEach(function (item) {
          if (item) {
            item = JSON.parse(item);

            if (item.day === object.day && item.time === object.time) {
              result = true;

              _this2.showError('This time is already taken.');
            }
          }
        });
        return result;
      }

      return false;
    }
  }, {
    key: "showError",
    value: function showError(text) {
      this.insertAdjacentHTML('afterbegin', "<span class=\"error-message\">".concat(text, "</span>"));
    }
  }, {
    key: "cancel",
    value: function cancel() {
      this.remove();
    }
  }]);

  return _class;
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement)));

/***/ }),

/***/ "./components/removeEvent/removeEvent.js":
/*!***********************************************!*\
  !*** ./components/removeEvent/removeEvent.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _WcMixin_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../WcMixin.js */ "./WcMixin.js");
/* harmony import */ var _plugins_cookies_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../plugins/cookies.js */ "./plugins/cookies.js");
/* harmony import */ var _removeEvent_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./removeEvent.scss */ "./components/removeEvent/removeEvent.scss");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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




customElements.define('remove-event', /*#__PURE__*/function (_HTMLElement) {
  _inherits(_class, _HTMLElement);

  var _super = _createSuper(_class);

  function _class() {
    _classCallCheck(this, _class);

    return _super.apply(this, arguments);
  }

  _createClass(_class, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      var _this = this;

      _WcMixin_js__WEBPACK_IMPORTED_MODULE_0__.addAdjacentHTML(this, "\n    <div class=\"remove-event\">\n      <p class=\"remove-event__title\">Are you sure you want to delete \xAB".concat(this.getAttribute('name'), "\xBB event?</p>\n      <div class=\"remove-event__buttons\">\n        <button class=\"remove-event__button\" w-id=\"buttonYes/yes\">Yes</button>\n        <button class=\"remove-event__button\" w-id=\"buttonNo/no\">No</button\n      </div>\n    </div>\n    "));

      this.buttonYes.onclick = function () {
        return _this.removeEvent();
      };

      this.buttonNo.onclick = function () {
        return _this.closeTab();
      };
    }
  }, {
    key: "removeEvent",
    value: function removeEvent() {
      var day = this.getAttribute('day');
      var time = this.getAttribute('time');
      var events = _plugins_cookies_js__WEBPACK_IMPORTED_MODULE_1__.getEvents();
      events.forEach(function (item, index) {
        if (item.day === day && item.time === time) {
          events.splice(index, 1);
        }
      });
      var eventString = JSON.stringify(events).replace('[{', '{').replace('}]', '}');

      if (eventString !== '[]') {
        _plugins_cookies_js__WEBPACK_IMPORTED_MODULE_1__.setCookie('calendar', eventString);
      } else {
        _plugins_cookies_js__WEBPACK_IMPORTED_MODULE_1__.deleteCookie('calendar');
      }

      location.reload();
    }
  }, {
    key: "closeTab",
    value: function closeTab() {
      this.remove();
    }
  }]);

  return _class;
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement)));

/***/ }),

/***/ "./main.js":
/*!*****************!*\
  !*** ./main.js ***!
  \*****************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_calendarComponent_calendarComponent_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../components/calendarComponent/calendarComponent.js */ "./components/calendarComponent/calendarComponent.js");
/* harmony import */ var _components_calendarHeader_calendarHeader_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../components/calendarHeader/calendarHeader.js */ "./components/calendarHeader/calendarHeader.js");
/* harmony import */ var _components_newEvent_newEvent_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/newEvent/newEvent.js */ "./components/newEvent/newEvent.js");
/* harmony import */ var _components_removeEvent_removeEvent_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../components/removeEvent/removeEvent.js */ "./components/removeEvent/removeEvent.js");
/* harmony import */ var _styles_main_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../styles/main.scss */ "./styles/main.scss");






/***/ }),

/***/ "./plugins/cookies.js":
/*!****************************!*\
  !*** ./plugins/cookies.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "setCookie": () => (/* binding */ setCookie),
/* harmony export */   "getCookie": () => (/* binding */ getCookie),
/* harmony export */   "deleteCookie": () => (/* binding */ deleteCookie),
/* harmony export */   "getEvents": () => (/* binding */ getEvents)
/* harmony export */ });
function setCookie(key, value) {
  document.cookie = "".concat(key, "=").concat(encodeURIComponent(value));
}
function getCookie(key) {
  var matches = document.cookie.match(new RegExp("(?:^|; )".concat(key.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1'), "=([^;]*)")));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
function deleteCookie(key) {
  document.cookie = "".concat(key, "=; Max-Age=0");
}
function getEvents() {
  var replaced = getCookie('calendar').replaceAll('},', '}},');
  var events = replaced.split('},');
  events.forEach(function (item, index) {
    events[index] = JSON.parse(item);
  });
  return events;
}

/***/ }),

/***/ "./plugins/draggable.js":
/*!******************************!*\
  !*** ./plugins/draggable.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "onDragStart": () => (/* binding */ onDragStart),
/* harmony export */   "onDragOver": () => (/* binding */ onDragOver),
/* harmony export */   "onDrop": () => (/* binding */ onDrop)
/* harmony export */ });
/* harmony import */ var _cookies_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cookies.js */ "./plugins/cookies.js");

function onDragStart(event) {
  event.target.id = Math.random();
  event.dataTransfer.setData('text/plain', event.target.id);
}
function onDragOver(event) {
  event.preventDefault();
}
function onDrop(event) {
  var id = event.dataTransfer.getData('text');
  event.dataTransfer.clearData();
  var draggableElement = document.getElementById(id);
  var dropzone = event.target;
  putElement(draggableElement, dropzone);
}

function putElement(element, dropzone) {
  // let elem = {};
  var drop = {};
  var events = _cookies_js__WEBPACK_IMPORTED_MODULE_0__.getEvents(); // elem = element.querySelector('.event-flag__button');

  element.day = element.getAttribute('day');
  element.time = element.getAttribute('time');
  drop.day = dropzone.getAttribute('day');
  drop.time = dropzone.getAttribute('time');

  if (dropzoneCheck(events, drop)) {
    dropzone.appendChild(element);
    events.forEach(function (item) {
      if (item.day === element.day && item.time === element.time) {
        item.day = drop.day;
        item.time = drop.time;
      }

      element.setAttribute('day', drop.day);
      element.setAttribute('time', drop.time);
    });
    savePosition(events);
  }
}

function dropzoneCheck(events, drop) {
  if (drop.day) {
    events.forEach(function (item) {
      if (item.day === drop.day && item.time === drop.time) {
        return false;
      }
    });
    return true;
  }

  return false;
}

function savePosition(events) {
  var eventString = JSON.stringify(events).replace('[{', '{').replace('}]', '}');
  _cookies_js__WEBPACK_IMPORTED_MODULE_0__.setCookie('calendar', eventString);
}

window.onDragStart = onDragStart;
window.onDragOver = onDragOver;
window.onDrop = onDrop;

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./components/calendarComponent/calendarComponent.scss":
/*!******************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./components/calendarComponent/calendarComponent.scss ***!
  \******************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

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
___CSS_LOADER_EXPORT___.push([module.id, "@import url(https://fonts.googleapis.com/css2?family=Lora&family=Roboto&display=swap);"]);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "table {\n  -webkit-box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.3);\n  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.3);\n  border-collapse: collapse;\n  width: 100%;\n  margin: auto;\n  height: 90vmin;\n  table-layout: fixed;\n}\ntable tr .row-header {\n  width: 100px;\n}\n\ntable tr:first-child {\n  height: 5vh !important;\n}\n\ntable td {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  height: 10%;\n  padding: 0;\n  margin: 0;\n}\ntable td .event-flag {\n  cursor: move;\n  cursor: grab;\n  cursor: -webkit-grab;\n  height: 100%;\n  width: 100%;\n  background-color: #f7f6e7;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: justify;\n  -ms-flex-pack: justify;\n  justify-content: space-between;\n  -webkit-box-align: center;\n  -ms-flex-align: center;\n  align-items: center;\n  padding: 10px;\n}\ntable td .event-flag__name {\n  word-wrap: break-word;\n  width: 90%;\n}\ntable td .event-flag:active {\n  cursor: grabbing;\n  cursor: -webkit-grabbing;\n}\ntable td .event-flag__button {\n  background: none;\n  border: none;\n  outline: none;\n  cursor: pointer;\n}\n\ntd, th {\n  border: 2px solid #B9CBC3;\n  width: 20%;\n}\n\nth {\n  font-weight: bold;\n  background-color: #B9CBC3;\n  font-family: \"Lora\", serif;\n}", "",{"version":3,"sources":["webpack://./components/calendarComponent/calendarComponent.scss","webpack://./styles/variables.scss"],"names":[],"mappings":"AAEA;EACE,sDAAA;EACQ,8CAAA;EACR,yBAAA;EACA,WAAA;EACA,YAAA;EACA,cAAA;EACA,mBAAA;AAAF;AAGI;EACI,YAAA;AADR;;AAMA;EACE,sBAAA;AAHF;;AAMA;EACE,8BAAA;EACQ,sBAAA;EACR,WAAA;EACA,UAAA;EACA,SAAA;AAHF;AAKE;EACE,YAAA;EACA,YAAA;EACA,oBAAA;EAEA,YAAA;EACA,WAAA;EACA,yBCjCK;EDkCL,8BAAA;EACQ,sBAAA;EACR,oBAAA;EACA,oBAAA;EACA,aAAA;EACA,yBAAA;EACI,sBAAA;EACI,8BAAA;EACR,yBAAA;EACI,sBAAA;EACI,mBAAA;EACR,aAAA;AAJJ;AAMI;EACE,qBAAA;EACA,UAAA;AAJN;AAOI;EACE,gBAAA;EACA,wBAAA;AALN;AAQI;EACE,gBAAA;EACA,YAAA;EACA,aAAA;EACA,eAAA;AANN;;AAYA;EACE,yBAAA;EACA,UAAA;AATF;;AAYA;EACE,iBAAA;EACA,yBC3EO;ED4EP,0BCxEM;AD+DR","sourcesContent":["@import '/styles/variables.scss';\r\n\r\ntable {\r\n  -webkit-box-shadow: 0px 1px 3px 0px rgba(0,0,0,0.3);\r\n          box-shadow: 0px 1px 3px 0px rgba(0,0,0,0.3);\r\n  border-collapse: collapse;\r\n  width: 100%;\r\n  margin: auto;\r\n  height: 90vmin;\r\n  table-layout: fixed;\r\n\r\n  tr {\r\n    .row-header {\r\n        width: 100px;\r\n    }\r\n  }\r\n}\r\n\r\ntable tr:first-child {\r\n  height: 5vh!important;\r\n}\r\n\r\ntable td {\r\n  -webkit-box-sizing: border-box;\r\n          box-sizing: border-box;\r\n  height: 10%;\r\n  padding: 0;\r\n  margin: 0;\r\n\r\n  .event-flag {\r\n    cursor: move;\r\n    cursor: grab;\r\n    cursor: -webkit-grab;\r\n\r\n    height: 100%;\r\n    width: 100%;\r\n    background-color: $color2;\r\n    -webkit-box-sizing: border-box;\r\n            box-sizing: border-box;\r\n    display:-webkit-box;\r\n    display:-ms-flexbox;\r\n    display:flex;\r\n    -webkit-box-pack: justify;\r\n        -ms-flex-pack: justify;\r\n            justify-content: space-between;\r\n    -webkit-box-align: center;\r\n        -ms-flex-align: center;\r\n            align-items: center;\r\n    padding: 10px;\r\n\r\n    &__name {\r\n      word-wrap: break-word;\r\n      width: 90%;\r\n    }\r\n\r\n    &:active {\r\n      cursor: grabbing;\r\n      cursor: -webkit-grabbing;\r\n    }\r\n\r\n    &__button {\r\n      background: none;\r\n      border: none;\r\n      outline: none;\r\n      cursor: pointer;\r\n    }\r\n  }\r\n}\r\n\r\n\r\ntd, th {\r\n  border: 2px solid $color1;\r\n  width: 20%;\r\n}\r\n\r\nth {\r\n  font-weight: bold;\r\n  background-color: $color1;\r\n  font-family: $font1;\r\n}","@import url('https://fonts.googleapis.com/css2?family=Lora&family=Roboto&display=swap');\r\n\r\n$color1: #B9CBC3;\r\n$color2: #f7f6e7;\r\n$color3: #314e52;\r\n\r\n$font1: 'Lora', serif;\r\n$font2: 'Roboto', sans-serif;\r\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./components/calendarHeader/calendarHeader.scss":
/*!************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./components/calendarHeader/calendarHeader.scss ***!
  \************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

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
___CSS_LOADER_EXPORT___.push([module.id, "@import url(https://fonts.googleapis.com/css2?family=Lora&family=Roboto&display=swap);"]);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/*\n* Prefixed by https://autoprefixer.github.io\n* PostCSS: v7.0.29,\n* Autoprefixer: v9.7.6\n* Browsers: last 4 version\n*/\n.calendar-header {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  width: 100%;\n  -webkit-box-pack: justify;\n  -ms-flex-pack: justify;\n  justify-content: space-between;\n  -webkit-box-align: center;\n  -ms-flex-align: center;\n  align-items: center;\n}\n.calendar-header__header {\n  font-size: 25px;\n  font-family: \"Lora\", serif;\n}\n.calendar-header__filter {\n  margin-right: 10px;\n  height: 35px;\n  border-radius: 5px;\n  padding: 5px;\n  border: 2px dotted #B9CBC3;\n}\n.calendar-header__button {\n  height: 50%;\n  cursor: pointer;\n  background-color: #B9CBC3;\n  color: #000;\n  border: none;\n  border-radius: 5px;\n  padding: 10px;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  outline: none;\n  -webkit-transition: ease 0.1s;\n  -o-transition: ease 0.1s;\n  transition: ease 0.1s;\n  -webkit-box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.3);\n  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.3);\n}\n.calendar-header__button:hover {\n  -webkit-box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.5);\n  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.5);\n}\n.calendar-header__button:active {\n  -webkit-box-shadow: inset 0px 1px 3px 0px rgba(0, 0, 0, 0.3);\n  box-shadow: inset 0px 1px 3px 0px rgba(0, 0, 0, 0.3);\n}", "",{"version":3,"sources":["webpack://./components/calendarHeader/calendarHeader.scss","webpack://./styles/variables.scss"],"names":[],"mappings":"AAAA;;;;;CAAA;AASA;EACE,oBAAA;EACA,oBAAA;EACA,aAAA;EACA,WAAA;EACA,yBAAA;EACI,sBAAA;EACI,8BAAA;EACR,yBAAA;EACI,sBAAA;EACI,mBAAA;AADV;AAGE;EACE,eAAA;EACA,0BCjBI;ADgBR;AAIE;EACE,kBAAA;EACA,YAAA;EACA,kBAAA;EACA,YAAA;EACA,0BAAA;AAFJ;AAKE;EACE,WAAA;EACA,eAAA;EACA,yBCnCK;EDoCL,WAAA;EACA,YAAA;EACA,kBAAA;EACA,aAAA;EACA,8BAAA;EACQ,sBAAA;EACR,aAAA;EACA,6BAAA;EACA,wBAAA;EACA,qBAAA;EACA,sDAAA;EACQ,8CAAA;AAHZ;AAII;EACE,sDAAA;EACQ,8CAAA;AAFd;AAII;EACE,4DAAA;EACQ,oDAAA;AAFd","sourcesContent":["/*\r\n* Prefixed by https://autoprefixer.github.io\r\n* PostCSS: v7.0.29,\r\n* Autoprefixer: v9.7.6\r\n* Browsers: last 4 version\r\n*/\r\n\r\n@import '/styles/variables.scss';\r\n\r\n.calendar-header {\r\n  display: -webkit-box;\r\n  display: -ms-flexbox;\r\n  display: flex;\r\n  width: 100%;\r\n  -webkit-box-pack: justify;\r\n      -ms-flex-pack: justify;\r\n          justify-content: space-between;\r\n  -webkit-box-align: center;\r\n      -ms-flex-align: center;\r\n          align-items: center;\r\n\r\n  &__header {\r\n    font-size: 25px;\r\n    font-family: $font1;\r\n  }\r\n\r\n  &__filter {\r\n    margin-right: 10px;\r\n    height: 35px;\r\n    border-radius: 5px;\r\n    padding: 5px;\r\n    border: 2px dotted $color1;\r\n  }\r\n\r\n  &__button {\r\n    height: 50%;\r\n    cursor: pointer;\r\n    background-color: $color1;\r\n    color: #000;\r\n    border: none;\r\n    border-radius: 5px;\r\n    padding: 10px;\r\n    -webkit-box-sizing: border-box;\r\n            box-sizing: border-box;\r\n    outline: none;\r\n    -webkit-transition: ease 0.1s;\r\n    -o-transition: ease 0.1s;\r\n    transition: ease 0.1s;\r\n    -webkit-box-shadow: 0px 1px 3px 0px rgba(0,0,0,0.3);\r\n            box-shadow: 0px 1px 3px 0px rgba(0,0,0,0.3);\r\n    &:hover {\r\n      -webkit-box-shadow: 0px 1px 3px 0px rgba(0,0,0,0.5);\r\n              box-shadow: 0px 1px 3px 0px rgba(0,0,0,0.5);\r\n    }\r\n    &:active {\r\n      -webkit-box-shadow: inset  0px 1px 3px 0px rgba(0,0,0,0.3);\r\n              box-shadow: inset  0px 1px 3px 0px rgba(0,0,0,0.3);\r\n    }\r\n  }\r\n}","@import url('https://fonts.googleapis.com/css2?family=Lora&family=Roboto&display=swap');\r\n\r\n$color1: #B9CBC3;\r\n$color2: #f7f6e7;\r\n$color3: #314e52;\r\n\r\n$font1: 'Lora', serif;\r\n$font2: 'Roboto', sans-serif;\r\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./components/newEvent/newEvent.scss":
/*!************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./components/newEvent/newEvent.scss ***!
  \************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

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
___CSS_LOADER_EXPORT___.push([module.id, "@import url(https://fonts.googleapis.com/css2?family=Lora&family=Roboto&display=swap);"]);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/*\n* Prefixed by https://autoprefixer.github.io\n* PostCSS: v7.0.29,\n* Autoprefixer: v9.7.6\n* Browsers: last 4 version\n*/\n.new-event-container {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -ms-flex-direction: column;\n  flex-direction: column;\n  position: absolute;\n  -webkit-box-pack: center;\n  -ms-flex-pack: center;\n  justify-content: center;\n  -webkit-box-align: center;\n  -ms-flex-align: center;\n  align-items: center;\n  -ms-flex-line-pack: center;\n  align-content: center;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  background-color: rgba(255, 255, 255, 0.8);\n}\n.new-event-container .error-message {\n  background-color: #fff;\n  border: 2px solid #ff5d5d;\n  border-radius: 5px;\n  color: #ff5d5d;\n  width: 500px;\n  height: 3em;\n  text-align: center;\n  line-height: 3em;\n  margin-bottom: 10px;\n}\n.new-event-container .new-event {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -ms-flex-direction: column;\n  flex-direction: column;\n  width: 500px;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  padding: 40px;\n  background-color: #B9CBC3;\n  border-radius: 5px;\n  -webkit-box-pack: center;\n  -ms-flex-pack: center;\n  justify-content: center;\n  -webkit-box-align: space-between;\n  -ms-flex-align: space-between;\n  align-items: space-between;\n  -webkit-box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.3);\n  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.3);\n}\n.new-event-container .new-event .vsb-main {\n  width: 75%;\n  border-radius: 5px;\n  -ms-flex-item-align: center;\n  -ms-grid-row-align: center;\n  align-self: center;\n  border: none;\n}\n.new-event-container .new-event .vsb-main button {\n  border-radius: 5px !important;\n  border: none !important;\n  -webkit-box-shadow: none;\n  box-shadow: none;\n  outline: none;\n}\n.new-event-container .new-event .vsb-menu {\n  width: 100% !important;\n}\n.new-event-container .new-event__item {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: justify;\n  -ms-flex-pack: justify;\n  justify-content: space-between;\n  -ms-flex-line-pack: center;\n  align-content: center;\n  -webkit-box-align: center;\n  -ms-flex-align: center;\n  align-items: center;\n  height: 45px;\n  font-size: 15px;\n}\n.new-event-container .new-event__input {\n  width: 75%;\n  height: 30px;\n  border-radius: 5px;\n  border: none;\n  padding-left: 10px;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  outline: none;\n}\n.new-event-container .new-event__input:focus {\n  -webkit-box-shadow: inset 0px 1px 3px 0px rgba(0, 0, 0, 0.3);\n  box-shadow: inset 0px 1px 3px 0px rgba(0, 0, 0, 0.3);\n}\n.new-event-container .new-event__button-wrapper {\n  margin-top: 20px;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: end;\n  -ms-flex-pack: end;\n  justify-content: flex-end;\n  width: 100%;\n}\n.new-event-container .new-event__button {\n  border-radius: 5px;\n  border: none;\n  outline: none;\n  margin-bottom: 10px;\n  width: 30%;\n  height: 30px;\n  margin-left: 10px;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  cursor: pointer;\n  -webkit-transition: ease 0.1s;\n  -o-transition: ease 0.1s;\n  transition: ease 0.1s;\n  -webkit-box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.3);\n  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.3);\n}\n.new-event-container .new-event__button:hover {\n  -webkit-box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.5);\n  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.5);\n}\n.new-event-container .new-event__button:active {\n  -webkit-box-shadow: inset 0px 1px 3px 0px rgba(0, 0, 0, 0.3);\n  box-shadow: inset 0px 1px 3px 0px rgba(0, 0, 0, 0.3);\n}", "",{"version":3,"sources":["webpack://./components/newEvent/newEvent.scss","webpack://./styles/variables.scss"],"names":[],"mappings":"AAAA;;;;;CAAA;AASA;EACE,oBAAA;EACA,oBAAA;EACA,aAAA;EACA,4BAAA;EACA,6BAAA;EACI,0BAAA;EACI,sBAAA;EACR,kBAAA;EACA,wBAAA;EACI,qBAAA;EACI,uBAAA;EACR,yBAAA;EACI,sBAAA;EACI,mBAAA;EACR,0BAAA;EACI,qBAAA;EACJ,OAAA;EACA,MAAA;EACA,WAAA;EACA,YAAA;EACA,0CAAA;AADF;AAGE;EACE,sBAAA;EACA,yBAAA;EACA,kBAAA;EACA,cAAA;EACA,YAAA;EACA,WAAA;EACA,kBAAA;EACA,gBAAA;EACA,mBAAA;AADJ;AAKE;EACE,oBAAA;EACA,oBAAA;EACA,aAAA;EACA,4BAAA;EACA,6BAAA;EACI,0BAAA;EACI,sBAAA;EACR,YAAA;EACA,8BAAA;EACQ,sBAAA;EACR,aAAA;EACA,yBCvDK;EDwDL,kBAAA;EACA,wBAAA;EACI,qBAAA;EACI,uBAAA;EACR,gCAAA;EACI,6BAAA;EACI,0BAAA;EACR,sDAAA;EACQ,8CAAA;AAHZ;AAKI;EACE,UAAA;EACA,kBAAA;EACA,2BAAA;EACI,0BAAA;EACA,kBAAA;EACJ,YAAA;AAHN;AAIM;EACE,6BAAA;EACA,uBAAA;EACA,wBAAA;EACQ,gBAAA;EACR,aAAA;AAFR;AAMI;EACE,sBAAA;AAJN;AAOI;EACE,oBAAA;EACA,oBAAA;EACA,aAAA;EACA,yBAAA;EACI,sBAAA;EACI,8BAAA;EACR,0BAAA;EACI,qBAAA;EACJ,yBAAA;EACI,sBAAA;EACI,mBAAA;EACR,YAAA;EACA,eAAA;AALN;AAQI;EACI,UAAA;EACA,YAAA;EACA,kBAAA;EACA,YAAA;EACA,kBAAA;EACA,8BAAA;EACQ,sBAAA;EACR,aAAA;AANR;AAOQ;EACE,4DAAA;EACQ,oDAAA;AALlB;AASI;EACE,gBAAA;EACA,oBAAA;EACA,oBAAA;EACA,aAAA;EACA,qBAAA;EACI,kBAAA;EACI,yBAAA;EACR,WAAA;AAPN;AAUI;EACE,kBAAA;EACA,YAAA;EACA,aAAA;EACA,mBAAA;EACA,UAAA;EACA,YAAA;EACA,iBAAA;EACA,8BAAA;EACQ,sBAAA;EACR,eAAA;EACA,6BAAA;EACA,wBAAA;EACA,qBAAA;EACA,sDAAA;EACQ,8CAAA;AARd;AASM;EACE,sDAAA;EACQ,8CAAA;AAPhB;AASM;EACE,4DAAA;EACQ,oDAAA;AAPhB","sourcesContent":["/*\r\n* Prefixed by https://autoprefixer.github.io\r\n* PostCSS: v7.0.29,\r\n* Autoprefixer: v9.7.6\r\n* Browsers: last 4 version\r\n*/\r\n\r\n@import '/styles/variables.scss';\r\n\r\n.new-event-container {\r\n  display: -webkit-box;\r\n  display: -ms-flexbox;\r\n  display: flex;\r\n  -webkit-box-orient: vertical;\r\n  -webkit-box-direction: normal;\r\n      -ms-flex-direction: column;\r\n          flex-direction: column;\r\n  position: absolute;\r\n  -webkit-box-pack: center;\r\n      -ms-flex-pack: center;\r\n          justify-content: center;\r\n  -webkit-box-align: center;\r\n      -ms-flex-align: center;\r\n          align-items: center;\r\n  -ms-flex-line-pack: center;\r\n      align-content: center;\r\n  left: 0;\r\n  top: 0;\r\n  width: 100%;\r\n  height: 100%;\r\n  background-color: rgba(255,255,255,0.8);\r\n\r\n  .error-message {\r\n    background-color: #fff;\r\n    border: 2px solid rgb(255, 93, 93);\r\n    border-radius: 5px;\r\n    color: rgb(255, 93, 93);\r\n    width: 500px;\r\n    height: 3em;\r\n    text-align: center;\r\n    line-height: 3em;\r\n    margin-bottom: 10px;\r\n  }\r\n    \r\n\r\n  .new-event {\r\n    display: -webkit-box;\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n    -webkit-box-orient: vertical;\r\n    -webkit-box-direction: normal;\r\n        -ms-flex-direction: column;\r\n            flex-direction: column;\r\n    width: 500px;\r\n    -webkit-box-sizing: border-box;\r\n            box-sizing: border-box;\r\n    padding: 40px;\r\n    background-color: $color1;\r\n    border-radius: 5px;\r\n    -webkit-box-pack: center;\r\n        -ms-flex-pack: center;\r\n            justify-content: center;\r\n    -webkit-box-align: space-between;\r\n        -ms-flex-align: space-between;\r\n            align-items: space-between;\r\n    -webkit-box-shadow: 0px 1px 3px 0px rgba(0,0,0,0.3);\r\n            box-shadow: 0px 1px 3px 0px rgba(0,0,0,0.3);\r\n\r\n    .vsb-main {\r\n      width: 75%;\r\n      border-radius: 5px;\r\n      -ms-flex-item-align: center;\r\n          -ms-grid-row-align: center;\r\n          align-self: center;\r\n      border: none;\r\n      button {\r\n        border-radius: 5px!important;\r\n        border: none!important;\r\n        -webkit-box-shadow: none;\r\n                box-shadow: none;\r\n        outline: none;\r\n      }\r\n    }\r\n\r\n    .vsb-menu {\r\n      width: 100%!important;\r\n    }\r\n\r\n    &__item {\r\n      display: -webkit-box;\r\n      display: -ms-flexbox;\r\n      display: flex;\r\n      -webkit-box-pack: justify;\r\n          -ms-flex-pack: justify;\r\n              justify-content: space-between;\r\n      -ms-flex-line-pack: center;\r\n          align-content: center;\r\n      -webkit-box-align: center;\r\n          -ms-flex-align: center;\r\n              align-items: center;\r\n      height: 45px;\r\n      font-size: 15px;\r\n    }\r\n\r\n    &__input {\r\n        width: 75%;\r\n        height: 30px;\r\n        border-radius: 5px;\r\n        border: none; \r\n        padding-left: 10px;\r\n        -webkit-box-sizing: border-box;\r\n                box-sizing: border-box;\r\n        outline: none;\r\n        &:focus {\r\n          -webkit-box-shadow: inset  0px 1px 3px 0px rgba(0,0,0,0.3);\r\n                  box-shadow: inset  0px 1px 3px 0px rgba(0,0,0,0.3);\r\n        }\r\n    }\r\n\r\n    &__button-wrapper {\r\n      margin-top: 20px;\r\n      display: -webkit-box;\r\n      display: -ms-flexbox;\r\n      display: flex;\r\n      -webkit-box-pack: end;\r\n          -ms-flex-pack: end;\r\n              justify-content: flex-end;\r\n      width: 100%;\r\n    }\r\n\r\n    &__button {\r\n      border-radius: 5px;\r\n      border: none;\r\n      outline: none;\r\n      margin-bottom: 10px;\r\n      width: 30%;\r\n      height: 30px;\r\n      margin-left: 10px;\r\n      -webkit-box-sizing: border-box;\r\n              box-sizing: border-box;\r\n      cursor: pointer;\r\n      -webkit-transition: ease 0.1s;\r\n      -o-transition: ease 0.1s;\r\n      transition: ease 0.1s;\r\n      -webkit-box-shadow: 0px 1px 3px 0px rgba(0,0,0,0.3);\r\n              box-shadow: 0px 1px 3px 0px rgba(0,0,0,0.3);\r\n      &:hover {\r\n        -webkit-box-shadow: 0px 1px 3px 0px rgba(0,0,0,0.5);\r\n                box-shadow: 0px 1px 3px 0px rgba(0,0,0,0.5);\r\n      }\r\n      &:active {\r\n        -webkit-box-shadow: inset  0px 1px 3px 0px rgba(0,0,0,0.3);\r\n                box-shadow: inset  0px 1px 3px 0px rgba(0,0,0,0.3);\r\n      }\r\n    }\r\n  }\r\n}","@import url('https://fonts.googleapis.com/css2?family=Lora&family=Roboto&display=swap');\r\n\r\n$color1: #B9CBC3;\r\n$color2: #f7f6e7;\r\n$color3: #314e52;\r\n\r\n$font1: 'Lora', serif;\r\n$font2: 'Roboto', sans-serif;\r\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./components/removeEvent/removeEvent.scss":
/*!******************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./components/removeEvent/removeEvent.scss ***!
  \******************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

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
___CSS_LOADER_EXPORT___.push([module.id, "@import url(https://fonts.googleapis.com/css2?family=Lora&family=Roboto&display=swap);"]);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/*\n* Prefixed by https://autoprefixer.github.io\n* PostCSS: v7.0.29,\n* Autoprefixer: v9.7.6\n* Browsers: last 4 version\n*/\n.remove-event-wrapper {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -ms-flex-direction: column;\n  flex-direction: column;\n  position: absolute;\n  -webkit-box-pack: center;\n  -ms-flex-pack: center;\n  justify-content: center;\n  -webkit-box-align: center;\n  -ms-flex-align: center;\n  align-items: center;\n  -ms-flex-line-pack: center;\n  align-content: center;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  background-color: rgba(255, 255, 255, 0.8);\n}\n.remove-event-wrapper .remove-event {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  max-width: 500px;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -ms-flex-direction: column;\n  flex-direction: column;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  padding: 20px;\n  background-color: #B9CBC3;\n  -webkit-box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.3);\n  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.3);\n  border-radius: 5px;\n  -webkit-box-pack: center;\n  -ms-flex-pack: center;\n  justify-content: center;\n  -webkit-box-align: space-between;\n  -ms-flex-align: space-between;\n  align-items: space-between;\n}\n.remove-event-wrapper .remove-event__title {\n  word-wrap: break-word;\n}\n.remove-event-wrapper .remove-event__buttons {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: end;\n  -ms-flex-pack: end;\n  justify-content: flex-end;\n  width: 100%;\n}\n.remove-event-wrapper .remove-event__button {\n  border-radius: 5px;\n  border: none;\n  outline: none;\n  margin-bottom: 10px;\n  width: 30%;\n  height: 30px;\n  margin-left: 10px;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  cursor: pointer;\n  -webkit-transition: ease 0.1s;\n  -o-transition: ease 0.1s;\n  transition: ease 0.1s;\n  -webkit-box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.3);\n  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.3);\n}\n.remove-event-wrapper .remove-event__button:hover {\n  -webkit-box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.5);\n  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.5);\n}\n.remove-event-wrapper .remove-event__button:active {\n  -webkit-box-shadow: inset 0px 1px 3px 0px rgba(0, 0, 0, 0.3);\n  box-shadow: inset 0px 1px 3px 0px rgba(0, 0, 0, 0.3);\n}", "",{"version":3,"sources":["webpack://./components/removeEvent/removeEvent.scss","webpack://./styles/variables.scss"],"names":[],"mappings":"AAAA;;;;;CAAA;AASA;EACI,oBAAA;EACA,oBAAA;EACA,aAAA;EACA,4BAAA;EACA,6BAAA;EACI,0BAAA;EACI,sBAAA;EACR,kBAAA;EACA,wBAAA;EACI,qBAAA;EACI,uBAAA;EACR,yBAAA;EACI,sBAAA;EACI,mBAAA;EACR,0BAAA;EACI,qBAAA;EACJ,OAAA;EACA,MAAA;EACA,WAAA;EACA,YAAA;EACA,0CAAA;AADJ;AAGI;EACI,oBAAA;EACA,oBAAA;EACA,aAAA;EACA,gBAAA;EACA,4BAAA;EACA,6BAAA;EACI,0BAAA;EACI,sBAAA;EACR,8BAAA;EACQ,sBAAA;EACR,aAAA;EACA,yBC1CC;ED2CD,sDAAA;EACQ,8CAAA;EACR,kBAAA;EACA,wBAAA;EACI,qBAAA;EACI,uBAAA;EACR,gCAAA;EACI,6BAAA;EACI,0BAAA;AADhB;AAGQ;EACI,qBAAA;AADZ;AAIQ;EACI,oBAAA;EACA,oBAAA;EACA,aAAA;EACA,qBAAA;EACI,kBAAA;EACI,yBAAA;EACR,WAAA;AAFZ;AAKQ;EACI,kBAAA;EACA,YAAA;EACA,aAAA;EACA,mBAAA;EACA,UAAA;EACA,YAAA;EACA,iBAAA;EACA,8BAAA;EACQ,sBAAA;EACR,eAAA;EACA,6BAAA;EACA,wBAAA;EACA,qBAAA;EACA,sDAAA;EACQ,8CAAA;AAHpB;AAIY;EACE,sDAAA;EACQ,8CAAA;AAFtB;AAIY;EACE,4DAAA;EACQ,oDAAA;AAFtB","sourcesContent":["/*\r\n* Prefixed by https://autoprefixer.github.io\r\n* PostCSS: v7.0.29,\r\n* Autoprefixer: v9.7.6\r\n* Browsers: last 4 version\r\n*/\r\n\r\n@import '/styles/variables.scss';\r\n\r\n.remove-event-wrapper {\r\n    display: -webkit-box;\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n    -webkit-box-orient: vertical;\r\n    -webkit-box-direction: normal;\r\n        -ms-flex-direction: column;\r\n            flex-direction: column;\r\n    position: absolute;\r\n    -webkit-box-pack: center;\r\n        -ms-flex-pack: center;\r\n            justify-content: center;\r\n    -webkit-box-align: center;\r\n        -ms-flex-align: center;\r\n            align-items: center;\r\n    -ms-flex-line-pack: center;\r\n        align-content: center;\r\n    left: 0;\r\n    top: 0;\r\n    width: 100%;\r\n    height: 100%;\r\n    background-color: rgba(255,255,255,0.8);\r\n\r\n    .remove-event {\r\n        display: -webkit-box;\r\n        display: -ms-flexbox;\r\n        display: flex;\r\n        max-width: 500px;\r\n        -webkit-box-orient: vertical;\r\n        -webkit-box-direction: normal;\r\n            -ms-flex-direction: column;\r\n                flex-direction: column;\r\n        -webkit-box-sizing: border-box;\r\n                box-sizing: border-box;\r\n        padding: 20px;\r\n        background-color: $color1;\r\n        -webkit-box-shadow: 0px 1px 3px 0px rgba(0,0,0,0.3);\r\n                box-shadow: 0px 1px 3px 0px rgba(0,0,0,0.3);\r\n        border-radius: 5px;\r\n        -webkit-box-pack: center;\r\n            -ms-flex-pack: center;\r\n                justify-content: center;\r\n        -webkit-box-align: space-between;\r\n            -ms-flex-align: space-between;\r\n                align-items: space-between;\r\n\r\n        &__title {\r\n            word-wrap: break-word;\r\n        }\r\n\r\n        &__buttons {\r\n            display: -webkit-box;\r\n            display: -ms-flexbox;\r\n            display: flex;\r\n            -webkit-box-pack: end;\r\n                -ms-flex-pack: end;\r\n                    justify-content: flex-end;\r\n            width: 100%;\r\n        }\r\n\r\n        &__button {\r\n            border-radius: 5px;\r\n            border: none;\r\n            outline: none;\r\n            margin-bottom: 10px;\r\n            width: 30%;\r\n            height: 30px;\r\n            margin-left: 10px;\r\n            -webkit-box-sizing: border-box;\r\n                    box-sizing: border-box;\r\n            cursor: pointer;\r\n            -webkit-transition: ease 0.1s;\r\n            -o-transition: ease 0.1s;\r\n            transition: ease 0.1s;\r\n            -webkit-box-shadow: 0px 1px 3px 0px rgba(0,0,0,0.3);\r\n                    box-shadow: 0px 1px 3px 0px rgba(0,0,0,0.3);\r\n            &:hover {\r\n              -webkit-box-shadow: 0px 1px 3px 0px rgba(0,0,0,0.5);\r\n                      box-shadow: 0px 1px 3px 0px rgba(0,0,0,0.5);\r\n            }\r\n            &:active {\r\n              -webkit-box-shadow: inset  0px 1px 3px 0px rgba(0,0,0,0.3);\r\n                      box-shadow: inset  0px 1px 3px 0px rgba(0,0,0,0.3);\r\n            }\r\n        }\r\n    }\r\n}","@import url('https://fonts.googleapis.com/css2?family=Lora&family=Roboto&display=swap');\r\n\r\n$color1: #B9CBC3;\r\n$color2: #f7f6e7;\r\n$color3: #314e52;\r\n\r\n$font1: 'Lora', serif;\r\n$font2: 'Roboto', sans-serif;\r\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./styles/main.scss":
/*!*******************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./styles/main.scss ***!
  \*******************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

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
___CSS_LOADER_EXPORT___.push([module.id, "@import url(https://fonts.googleapis.com/css2?family=Lora&family=Roboto&display=swap);"]);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "#main {\n  width: 90vw;\n  margin: auto;\n  font-family: \"Roboto\", sans-serif;\n}", "",{"version":3,"sources":["webpack://./styles/main.scss","webpack://./styles/variables.scss"],"names":[],"mappings":"AAEA;EACI,WAAA;EACA,YAAA;EACA,iCCEI;ADFR","sourcesContent":["@import './variables.scss';\r\n\r\n#main {\r\n    width: 90vw;\r\n    margin: auto;\r\n    font-family: $font2;\r\n}","@import url('https://fonts.googleapis.com/css2?family=Lora&family=Roboto&display=swap');\r\n\r\n$color1: #B9CBC3;\r\n$color2: #f7f6e7;\r\n$color3: #314e52;\r\n\r\n$font1: 'Lora', serif;\r\n$font2: 'Roboto', sans-serif;\r\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



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

/***/ "./components/removeEvent/removeEvent.scss":
/*!*************************************************!*\
  !*** ./components/removeEvent/removeEvent.scss ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_removeEvent_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./removeEvent.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./components/removeEvent/removeEvent.scss");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_removeEvent_scss__WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_removeEvent_scss__WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

/***/ }),

/***/ "./styles/main.scss":
/*!**************************!*\
  !*** ./styles/main.scss ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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