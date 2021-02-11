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

/***/ "./assets/data.js":
/*!************************!*\
  !*** ./assets/data.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "participants": () => (/* binding */ participants),
/* harmony export */   "workingDays": () => (/* binding */ workingDays),
/* harmony export */   "workingHours": () => (/* binding */ workingHours)
/* harmony export */ });
var participants = ["John", "Robbert", "Eddard", "Jaime", "Cersei"];
var workingDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
var workingHours = {
  start: 10,
  end: 18
};

/***/ }),

/***/ "./components/calendarComponent/calendarComponent.js":
/*!***********************************************************!*\
  !*** ./components/calendarComponent/calendarComponent.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _calendarComponent_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./calendarComponent.scss */ "./components/calendarComponent/calendarComponent.scss");
/* harmony import */ var _WcMixin_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../WcMixin.js */ "./WcMixin.js");
/* harmony import */ var _plugins_cookies_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../plugins/cookies.js */ "./plugins/cookies.js");
/* harmony import */ var _assets_data_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../assets/data.js */ "./assets/data.js");
/* harmony import */ var _plugins_draggable_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../plugins/draggable.js */ "./plugins/draggable.js");
/* harmony import */ var _plugins_eventBus_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../plugins/eventBus.js */ "./plugins/eventBus.js");
/* harmony import */ var _plugins_eventBus_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_plugins_eventBus_js__WEBPACK_IMPORTED_MODULE_5__);
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







var me = "calendar-component";
var filter = "All members";
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
      _WcMixin_js__WEBPACK_IMPORTED_MODULE_1__.addAdjacentHTML(this, this.createTable(_assets_data_js__WEBPACK_IMPORTED_MODULE_3__.workingHours.start, _assets_data_js__WEBPACK_IMPORTED_MODULE_3__.workingHours.end));

      var _this = this;

      _plugins_eventBus_js__WEBPACK_IMPORTED_MODULE_5__.subscribe("participantFilterChanged", function (value) {
        filter = value;

        _this.fillTable();
      });
      _plugins_eventBus_js__WEBPACK_IMPORTED_MODULE_5__.subscribe("refreshEvents", function () {
        _this.fillTable();
      });

      _this.fillTable();
    }
  }, {
    key: "createTable",
    value: function createTable(startTime, endTime) {
      var table = document.createElement("table");
      var tableHeader = document.createElement("tr");
      var workingDays = _assets_data_js__WEBPACK_IMPORTED_MODULE_3__.workingDays;
      tableHeader.insertAdjacentHTML("afterbegin", "\n      <th>Time</th>\n    ");
      workingDays.forEach(function (item) {
        var th = document.createElement("th");
        th.innerText = item;
        tableHeader.appendChild(th);
      });
      tableHeader.classList.add("table-header");
      table.appendChild(tableHeader);

      var _loop = function _loop() {
        var tr = document.createElement("tr");
        var th = document.createElement("th");
        th.classList.add("row-header");
        th.innerText = "".concat(hour, ":00");
        tr.appendChild(th);
        workingDays.forEach(function (item) {
          var td = document.createElement("td");
          td.dataset.day = item;
          td.dataset.time = hour;
          td.setAttribute("ondragover", "onDragOver(event)");
          td.setAttribute("ondrop", "onDrop(event)");
          tr.appendChild(td);
        });
        table.appendChild(tr);
      };

      for (var hour = startTime; hour <= endTime; hour = hour + 1) {
        _loop();
      }

      return table.outerHTML;
    }
  }, {
    key: "fillTable",
    value: function fillTable() {
      var table = this.querySelector("table");
      var events = this.filterEvents();
      var tableClone = table.cloneNode(true);
      var tableCells = tableClone.querySelectorAll("tr td");
      if (!events.length) throw new Error("No events");
      events.forEach(function (event) {
        tableCells.forEach(function (cell) {
          if (cell.dataset.day === event.day && cell.dataset.time === event.time) {
            var flagElement = document.createElement("div");
            var flagElementName = document.createElement("p");
            var flagElementButton = document.createElement("button");
            flagElement.classList.add("event-flag");
            flagElement.draggable = "true";
            flagElement.setAttribute("ondragstart", "onDragStart(event)");
            flagElement.dataset.day = event.day;
            flagElement.dataset.time = event.time;
            flagElementName.classList.add("event-flag__name");
            flagElementName.innerText = event.name;
            flagElementButton.classList.add("event-flag__button");
            flagElementButton.innerText = "X";
            flagElement.appendChild(flagElementName);
            flagElement.appendChild(flagElementButton);
            cell.insertAdjacentElement('afterbegin', flagElement);
          }
        });
      });
      table.replaceWith(tableClone);
      this.addRemoveEventListeners();
      return table;
    }
  }, {
    key: "clearTable",
    value: function clearTable() {
      var flags = document.querySelectorAll(".event-flag");
      flags.forEach(function (item) {
        item.remove();
      });
    }
  }, {
    key: "showRemoveWindow",
    value: function showRemoveWindow(target) {
      var main = document.querySelector("#main");
      var removeWindow = document.createElement("remove-event");
      var parent = {};
      parent.name = target.parentElement.querySelector(".event-flag__name").textContent;
      parent.day = target.parentElement.dataset.day;
      parent.time = target.parentElement.dataset.time;
      removeWindow.classList.add("remove-event-wrapper");
      removeWindow.dataset.name = parent.name;
      removeWindow.dataset.day = parent.day;
      removeWindow.dataset.time = parent.time;
      console.log(removeWindow);
      main.insertAdjacentElement("afterbegin", removeWindow);
    }
  }, {
    key: "filterEvents",
    value: function filterEvents() {
      var value = filter;
      this.clearTable();
      console.log('filter');
      var cookies = _plugins_cookies_js__WEBPACK_IMPORTED_MODULE_2__.getCookie("calendar");
      var events = cookies !== undefined ? JSON.parse(cookies) : [];
      var result = [];

      if (value !== "All members") {
        if (events && events !== "undefined") {
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

      var buttons = this.querySelectorAll(".event-flag__button");
      buttons.forEach(function (button) {
        button.addEventListener("click", function (e) {
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

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _WcMixin_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../WcMixin.js */ "./WcMixin.js");
/* harmony import */ var _assets_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../assets/data */ "./assets/data.js");
/* harmony import */ var _plugins_eventBus__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../plugins/eventBus */ "./plugins/eventBus.js");
/* harmony import */ var _plugins_eventBus__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_plugins_eventBus__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _calendarHeader_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./calendarHeader.scss */ "./components/calendarHeader/calendarHeader.scss");
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





customElements.define("calendar-header", /*#__PURE__*/function (_HTMLElement) {
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

      _WcMixin_js__WEBPACK_IMPORTED_MODULE_0__.addAdjacentHTML(this, "\n      <h1 class=\"calendar-header__header\">Calendar</h1>\n      <div class=\"calendar-header__options\">\n        <select \n          class=\"calendar-header__filter\"\n          w-id=\"filterParticipant/participant\"    \n        ></select>\n        <button w-id=\"buttonElem/button\" class=\"calendar-header__button\">New Event+</button>\n      </div>\n    ");
      this.filterParticipant.appendChild(this.getParticipants(_assets_data__WEBPACK_IMPORTED_MODULE_1__.participants));

      this.filterParticipant.onchange = function () {
        return (0,_plugins_eventBus__WEBPACK_IMPORTED_MODULE_2__.publish)("participantFilterChanged", _this.participant);
      };

      this.buttonElem.onclick = function () {
        return _this.newEvent();
      };
    }
  }, {
    key: "newEvent",
    value: function newEvent() {
      var main = document.querySelector("#main");
      var containerElement = document.createElement('new-event');
      containerElement.classList.add('new-event-container');
      main.appendChild(containerElement);
    }
  }, {
    key: "getParticipants",
    value: function getParticipants(array) {
      var template = document.createDocumentFragment();
      var allMembersOption = document.createElement('option');
      allMembersOption.innerText = "All members";
      template.appendChild(allMembersOption);
      array.forEach(function (item) {
        var option = document.createElement("option");
        option.dataset.name = item;
        option.innerText = item;
        template.appendChild(option);
      });
      return template;
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

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _WcMixin_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../WcMixin.js */ "./WcMixin.js");
/* harmony import */ var _plugins_cookies_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../plugins/cookies.js */ "./plugins/cookies.js");
/* harmony import */ var _newEvent_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./newEvent.scss */ "./components/newEvent/newEvent.scss");
/* harmony import */ var _assets_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../assets/data */ "./assets/data.js");
/* harmony import */ var _plugins_eventBus__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../plugins/eventBus */ "./plugins/eventBus.js");
/* harmony import */ var _plugins_eventBus__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_plugins_eventBus__WEBPACK_IMPORTED_MODULE_4__);
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






customElements.define("new-event", /*#__PURE__*/function (_HTMLElement) {
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

      _WcMixin_js__WEBPACK_IMPORTED_MODULE_0__.addAdjacentHTML(this, "\n    <div class=\"new-event\">\n      <Label class=\"new-event__item\">\n        Name: \n        <input autofocus\n          class=\"new-event__input\"\n          w-id=\"inputName/name\"\n        ></input>\n      </Label>\n\n      <Label \n        class=\"new-event__item\"\n        w-id=\"participantsLabel/participantsLabelValue\"\n      >Members:\n      </Label>\n\n      <Label \n          class=\"new-event__item\" \n      >Day:\n        <select \n          class=\"new-event__input\"\n          w-id=\"inputDay/day\"\n        ></select>\n      </label>\n\n      <Label \n          class=\"new-event__item\" \n        >Time:\n          <select \n            class=\"new-event__input\"\n            w-id=\"inputTime/time\"\n          ></select>\n      </label>\n\n      <div class=\"new-event__button-wrapper\">\n        <button w-id=\"buttonCreate/create\" class=\"new-event__button\">Create</button>\n        <button w-id=\"buttonCancel/buttonCancelValue\" class=\"new-event__button\">Cancel</button>\n      </div>\n    </div>\n  ");
      this.formSetData();

      this.buttonCreate.onclick = function () {
        return _this.createEvent();
      };

      this.buttonCancel.onclick = function () {
        return _this.closeTab();
      };

      window.newEvent = this;
    }
  }, {
    key: "formSetData",
    value: function formSetData() {
      var _this2 = this;

      var participants = document.createElement("select-multiply");
      participants.className = "new-event__input select-multiply";
      participants.id = "select-participants";
      participants.appendChild(this.getParticipants(_assets_data__WEBPACK_IMPORTED_MODULE_3__.participants));
      this.participantsLabel.appendChild(participants);
      _assets_data__WEBPACK_IMPORTED_MODULE_3__.workingDays.forEach(function (item) {
        var option = document.createElement("option");
        option.dataset.value = item;
        option.innerText = item;

        _this2.inputDay.appendChild(option);
      });

      for (var i = _assets_data__WEBPACK_IMPORTED_MODULE_3__.workingHours.start; i <= _assets_data__WEBPACK_IMPORTED_MODULE_3__.workingHours.end; i = i + 1) {
        var option = document.createElement("option");
        option.setAttribute("value", i);
        option.innerText = "".concat(i, ":00");
        this.inputTime.appendChild(option);
      }
    }
  }, {
    key: "getParticipants",
    value: function getParticipants(array) {
      var template = document.createElement("div");
      template.dataset.name = "template";
      array.forEach(function (item) {
        var slot = document.createElement("slot");
        slot.dataset.name = item;
        slot.innerText = item;
        template.appendChild(slot);
      });
      return template;
    }
  }, {
    key: "createEvent",
    value: function createEvent() {
      var object = {};
      object.name = this.name;
      object.day = this.day;
      object.time = this.time;
      object.participants = this.querySelector("#select-participants").selectValueData.split(",");

      if (this.checkFields(object)) {
        var cookies = _plugins_cookies_js__WEBPACK_IMPORTED_MODULE_1__.getCookie("calendar");
        var events = cookies ? JSON.parse(cookies) : [];

        if (!this.checkIfExist(events, object)) {
          if (events && events !== "undefined") {
            events.push(object);
            _plugins_cookies_js__WEBPACK_IMPORTED_MODULE_1__.setCookie("calendar", JSON.stringify(events));
          } else {
            events[0] = object;
            _plugins_cookies_js__WEBPACK_IMPORTED_MODULE_1__.setCookie("calendar", JSON.stringify(events));
          }

          object = {};
          this.closeTab();
        }
      }
    }
  }, {
    key: "checkFields",
    value: function checkFields(data) {
      this.clearErrors();
      var error = 0;

      if (data.name === "") {
        this.showError("Name cannot be empty.");
        error += 1;
      }

      if (data.participants.length === 0 || data.participants[0] === "Choose members") {
        this.showError("Please, choose members");
        error += 1;
      }

      if (error > 0) {
        return false;
      }

      return true;
    }
  }, {
    key: "checkIfExist",
    value: function checkIfExist(data, object) {
      var _this3 = this;

      var result = false;
      data.forEach(function (item) {
        if (item) {
          if (item.day === object.day && item.time === object.time) {
            result = true;

            _this3.showError("This time is already taken.");
          }
        }
      });
      return result;
    }
  }, {
    key: "showError",
    value: function showError(text) {
      var span = document.createElement("span");
      span.classList.add("error-message");
      span.innerText = text;
      this.insertAdjacentElement("afterbegin", span);
    }
  }, {
    key: "clearErrors",
    value: function clearErrors() {
      var errors = this.querySelectorAll(".error-message");
      errors.forEach(function (item) {
        item.remove();
      });
    }
  }, {
    key: "closeTab",
    value: function closeTab() {
      _plugins_eventBus__WEBPACK_IMPORTED_MODULE_4__.publish("refreshEvents");
      _plugins_eventBus__WEBPACK_IMPORTED_MODULE_4__.publish("resetForm");
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

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _WcMixin_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../WcMixin.js */ "./WcMixin.js");
/* harmony import */ var _plugins_cookies_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../plugins/cookies.js */ "./plugins/cookies.js");
/* harmony import */ var _plugins_eventBus_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../plugins/eventBus.js */ "./plugins/eventBus.js");
/* harmony import */ var _plugins_eventBus_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_plugins_eventBus_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _removeEvent_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./removeEvent.scss */ "./components/removeEvent/removeEvent.scss");
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
      var _this2 = this;

      _WcMixin_js__WEBPACK_IMPORTED_MODULE_0__.addAdjacentHTML(this, "\n    <div class=\"remove-event\">\n      <p class=\"remove-event__title\">Are you sure you want to delete \xAB".concat(this.dataset.name, "\xBB event?</p>\n      <div class=\"remove-event__buttons\">\n        <button class=\"remove-event__button\" w-id=\"buttonYes/yes\">Yes</button>\n        <button class=\"remove-event__button\" w-id=\"buttonNo/no\">No</button\n      </div>\n    </div>\n    "));

      this.buttonYes.onclick = function () {
        return _this2.removeEvent();
      };

      this.buttonNo.onclick = function () {
        return _this2.closeTab();
      };
    }
  }, {
    key: "removeEvent",
    value: function removeEvent() {
      var _this = this;

      var cookies = _plugins_cookies_js__WEBPACK_IMPORTED_MODULE_1__.getCookie('calendar');
      var events = cookies ? JSON.parse(cookies) : [];
      var day = this.dataset.day;
      var time = this.dataset.time;
      events.forEach(function (item, index) {
        if (item.day === day && item.time === time) {
          events.splice(index, 1);
        }
      });

      if (events.length > 0) {
        _plugins_cookies_js__WEBPACK_IMPORTED_MODULE_1__.setCookie('calendar', JSON.stringify(events));
      } else {
        _plugins_cookies_js__WEBPACK_IMPORTED_MODULE_1__.deleteCookie('calendar');
      }

      _this.closeTab();

      _plugins_eventBus_js__WEBPACK_IMPORTED_MODULE_2___default().publish("refreshEvents");
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

/***/ "./components/selectComponent/selectComponent.js":
/*!*******************************************************!*\
  !*** ./components/selectComponent/selectComponent.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _WcMixin_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../WcMixin.js */ "./WcMixin.js");
/* harmony import */ var _selectComponent_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./selectComponent.scss */ "./components/selectComponent/selectComponent.scss");
/* harmony import */ var _plugins_eventBus_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../plugins/eventBus.js */ "./plugins/eventBus.js");
/* harmony import */ var _plugins_eventBus_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_plugins_eventBus_js__WEBPACK_IMPORTED_MODULE_2__);
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




var selectedItems = [];
customElements.define("select-multiply", /*#__PURE__*/function (_HTMLElement) {
  _inherits(_class, _HTMLElement);

  var _super = _createSuper(_class);

  function _class() {
    _classCallCheck(this, _class);

    return _super.apply(this, arguments);
  }

  _createClass(_class, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      var _this2 = this;

      _WcMixin_js__WEBPACK_IMPORTED_MODULE_0__.addAdjacentHTML(this, "\n      <p class=\"select-multiply__value\" \n        w-id=\"selectValue/selectValueData\"\n        >Choose members\n      </p>\n      <div class=\"select-multiply__dropdown\" \n        w-id=\"dropdownList/dropdownListValue\">\n          <p class=\"select-multiply__dropdown-item\" \n            w-id=\"selectAll/selectAllValue\" \n            data-value=\"all\"\n            >Select All\n          </p>\n      </div>\n    ");
      this.dropdownList.appendChild(this.getList(this));

      document.querySelector(".new-event").onclick = function () {
        return _this2.showDropDown(_this2);
      };

      this.querySelectorAll(".select-multiply__dropdown-item").forEach(function (elem) {
        elem.onclick = function () {
          return _this2.choose(elem);
        };
      });
      (0,_plugins_eventBus_js__WEBPACK_IMPORTED_MODULE_2__.subscribe)("resetForm", function () {
        selectedItems = [];
      });
    }
  }, {
    key: "getList",
    value: function getList(_this) {
      var template = _this.querySelector("div[data-name=template]");

      var list = document.createDocumentFragment();

      if (template) {
        var slots = Array.from(template.children);
        slots.forEach(function (slot, index) {
          var elem = document.createElement("p");
          elem.innerHTML = slot.innerHTML;
          elem.dataset.name = slot.name;
          elem.dataset.value = slot.innerHTML;
          elem.className = _this.tagName.toLowerCase() + "__dropdown-item";
          list.appendChild(elem);
        });
        template.remove();
      }

      return list;
    }
  }, {
    key: "choose",
    value: function choose(elem) {
      var value = elem.dataset.value;
      var selected = elem.classList.contains("selected");

      if (value !== "all") {
        if (!selected) {
          elem.classList.add("selected");
          selectedItems.push(value);
        } else {
          elem.classList.remove("selected");
          this.selectAll.classList.remove("selected");
          selectedItems.forEach(function (item, index) {
            if (item === value) {
              selectedItems.splice(index, 1);
            }
          });
        }
      } else {
        var all = Array.from(elem.parentNode.children);

        if (!selected) {
          selectedItems = [];
          all.forEach(function (item, index) {
            if (index > 0) {
              selectedItems.push(item.dataset.value);
            }

            item.classList.add("selected");
          });
        } else {
          all.forEach(function (item) {
            item.classList.remove("selected");
          });
          selectedItems = [];
        }
      }

      this.selectValueData = selectedItems.length ? selectedItems.join(", ") : "Choose members";
    }
  }, {
    key: "showDropDown",
    value: function showDropDown(elem) {
      var classList = event.target.classList;

      if (classList.contains("select-multiply") || classList.contains("select-multiply__value")) {
        elem.classList.toggle("open");
      } else if (classList.contains("select-multiply__dropdown-item")) {} else {
        elem.classList.remove("open");
      }
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

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_calendarComponent_calendarComponent_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../components/calendarComponent/calendarComponent.js */ "./components/calendarComponent/calendarComponent.js");
/* harmony import */ var _components_calendarHeader_calendarHeader_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../components/calendarHeader/calendarHeader.js */ "./components/calendarHeader/calendarHeader.js");
/* harmony import */ var _components_newEvent_newEvent_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/newEvent/newEvent.js */ "./components/newEvent/newEvent.js");
/* harmony import */ var _components_removeEvent_removeEvent_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../components/removeEvent/removeEvent.js */ "./components/removeEvent/removeEvent.js");
/* harmony import */ var _components_selectComponent_selectComponent_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../components/selectComponent/selectComponent.js */ "./components/selectComponent/selectComponent.js");
/* harmony import */ var _styles_main_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../styles/main.scss */ "./styles/main.scss");






var globalData = {
  participants: ['John', 'Eddard', 'Robbert', 'Jaime', 'Cersei'],
  days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
};

/***/ }),

/***/ "./plugins/cookies.js":
/*!****************************!*\
  !*** ./plugins/cookies.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "setCookie": () => (/* binding */ setCookie),
/* harmony export */   "getCookie": () => (/* binding */ getCookie),
/* harmony export */   "deleteCookie": () => (/* binding */ deleteCookie)
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

/***/ }),

/***/ "./plugins/draggable.js":
/*!******************************!*\
  !*** ./plugins/draggable.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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
  var drop = {};
  var events = JSON.parse(_cookies_js__WEBPACK_IMPORTED_MODULE_0__.getCookie('calendar'));
  element.day = element.dataset.day;
  element.time = element.dataset.time;
  drop.day = dropzone.dataset.day;
  drop.time = dropzone.dataset.time;

  if (dropzoneCheck(events, drop)) {
    dropzone.appendChild(element);
    events.forEach(function (item) {
      if (item.day === element.day && item.time === element.time) {
        item.day = drop.day;
        item.time = drop.time;
      }

      element.dataset.day = drop.day;
      element.dataset.time = drop.time;
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
  _cookies_js__WEBPACK_IMPORTED_MODULE_0__.setCookie('calendar', JSON.stringify(events));
}

window.onDragStart = onDragStart;
window.onDragOver = onDragOver;
window.onDrop = onDrop;

/***/ }),

/***/ "./plugins/eventBus.js":
/*!*****************************!*\
  !*** ./plugins/eventBus.js ***!
  \*****************************/
/***/ ((module) => {

var subscriptions = {};
var getNextUniqueId = getIdGenerator();

function subscribe(eventType, callback) {
  var id = getNextUniqueId();
  if (!subscriptions[eventType]) subscriptions[eventType] = {};
  subscriptions[eventType][id] = callback;
  return {
    unsubscribe: function unsubscribe() {
      delete subscriptions[eventType][id];
      if (Object.keys(subscriptions[eventType]).length === 0) delete subscriptions[eventType];
    }
  };
}

function publish(eventType, arg) {
  if (!subscriptions[eventType]) return;
  Object.keys(subscriptions[eventType]).forEach(function (key) {
    return subscriptions[eventType][key](arg);
  });
}

function getIdGenerator() {
  var lastId = 0;
  return function getNextUniqueId() {
    lastId += 1;
    return lastId;
  };
}

module.exports = {
  publish: publish,
  subscribe: subscribe
};

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
___CSS_LOADER_EXPORT___.push([module.id, "@import url(https://fonts.googleapis.com/css2?family=Lora&family=Roboto&display=swap);"]);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "table {\n  -webkit-box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.3);\n  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.3);\n  border-collapse: collapse;\n  width: 100%;\n  margin: auto;\n  height: 90vmin;\n  table-layout: fixed;\n}\ntable .table-header th:first-child {\n  width: 4em;\n}\ntable tr:first-child {\n  height: 2em !important;\n}\ntable td {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  height: 10%;\n  padding: 0;\n  margin: 0;\n}\ntable td .event-flag {\n  cursor: move;\n  cursor: grab;\n  cursor: -webkit-grab;\n  height: 100%;\n  width: 100%;\n  background-color: #f7f6e7;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: justify;\n  -ms-flex-pack: justify;\n  justify-content: space-between;\n  -webkit-box-align: center;\n  -ms-flex-align: center;\n  align-items: center;\n  padding: 10px;\n}\ntable td .event-flag__name {\n  word-wrap: break-word;\n  width: 90%;\n}\ntable td .event-flag:active {\n  cursor: grabbing;\n  cursor: -webkit-grabbing;\n}\ntable td .event-flag__button {\n  background: none;\n  border: none;\n  outline: none;\n  cursor: pointer;\n}\ntable td, table th {\n  border: 2px solid #B9CBC3;\n}\n@media (max-width: 700px) {\n  table td, table th {\n    font-size: 12px;\n  }\n}\n@media (max-width: 400px) {\n  table td, table th {\n    font-size: 10px;\n  }\n}\ntable th {\n  font-weight: bold;\n  font-family: \"Lora\", serif;\n  background-color: #B9CBC3;\n  box-sizing: border-box;\n}", "",{"version":3,"sources":["webpack://./components/calendarComponent/calendarComponent.scss","webpack://./styles/variables.scss"],"names":[],"mappings":"AAEA;EACE,sDAAA;EACQ,8CAAA;EACR,yBAAA;EACA,WAAA;EACA,YAAA;EACA,cAAA;EACA,mBAAA;AAAF;AAEE;EACE,UAAA;AAAJ;AAII;EACE,sBAAA;AAFN;AAME;EACE,8BAAA;EACQ,sBAAA;EACR,WAAA;EACA,UAAA;EACA,SAAA;AAJJ;AAMI;EACE,YAAA;EACA,YAAA;EACA,oBAAA;EAEA,YAAA;EACA,WAAA;EACA,yBChCG;EDiCH,8BAAA;EACQ,sBAAA;EACR,oBAAA;EACA,oBAAA;EACA,aAAA;EACA,yBAAA;EACI,sBAAA;EACI,8BAAA;EACR,yBAAA;EACI,sBAAA;EACI,mBAAA;EACR,aAAA;AALN;AAOM;EACE,qBAAA;EACA,UAAA;AALR;AAQM;EACE,gBAAA;EACA,wBAAA;AANR;AASM;EACE,gBAAA;EACA,YAAA;EACA,aAAA;EACA,eAAA;AAPR;AAYE;EACE,yBAAA;AAVJ;AAWI;EAFF;IAGI,eAAA;EARJ;AACF;AASI;EALF;IAMI,eAAA;EANJ;AACF;AASE;EACE,iBAAA;EACA,0BC1EI;ED2EJ,yBC/EK;EDgFL,sBAAA;AAPJ","sourcesContent":["@import '/styles/variables.scss';\r\n\r\ntable {\r\n  -webkit-box-shadow: 0px 1px 3px 0px rgba(0,0,0,0.3);\r\n          box-shadow: 0px 1px 3px 0px rgba(0,0,0,0.3);\r\n  border-collapse: collapse;\r\n  width: 100%;\r\n  margin: auto;\r\n  height: 90vmin;\r\n  table-layout: fixed;\r\n\r\n  .table-header th:first-child{\r\n    width: 4em;\r\n  }\r\n\r\n  tr {\r\n    &:first-child {\r\n      height: 2em!important;\r\n    }\r\n  }\r\n\r\n  td {\r\n    -webkit-box-sizing: border-box;\r\n            box-sizing: border-box;\r\n    height: 10%;\r\n    padding: 0;\r\n    margin: 0;\r\n  \r\n    .event-flag {\r\n      cursor: move;\r\n      cursor: grab;\r\n      cursor: -webkit-grab;\r\n  \r\n      height: 100%;\r\n      width: 100%;\r\n      background-color: $color2;\r\n      -webkit-box-sizing: border-box;\r\n              box-sizing: border-box;\r\n      display:-webkit-box;\r\n      display:-ms-flexbox;\r\n      display:flex;\r\n      -webkit-box-pack: justify;\r\n          -ms-flex-pack: justify;\r\n              justify-content: space-between;\r\n      -webkit-box-align: center;\r\n          -ms-flex-align: center;\r\n              align-items: center;\r\n      padding: 10px;\r\n  \r\n      &__name {\r\n        word-wrap: break-word;\r\n        width: 90%;\r\n      }\r\n  \r\n      &:active {\r\n        cursor: grabbing;\r\n        cursor: -webkit-grabbing;\r\n      }\r\n  \r\n      &__button {\r\n        background: none;\r\n        border: none;\r\n        outline: none;\r\n        cursor: pointer;\r\n      }\r\n    }\r\n  }\r\n\r\n  td, th {\r\n    border: 2px solid $color1;\r\n    @media (max-width: 700px) {\r\n      font-size: 12px;\r\n    }\r\n    @media (max-width: 400px) {\r\n      font-size: 10px;\r\n    }\r\n  }\r\n\r\n  th {\r\n    font-weight: bold;\r\n    font-family: $font1;\r\n    background-color: $color1;\r\n    box-sizing: border-box;\r\n  }\r\n}\r\n\r\n\r\n","@import url('https://fonts.googleapis.com/css2?family=Lora&family=Roboto&display=swap');\r\n\r\n$color1: #B9CBC3;\r\n$color2: #f7f6e7;\r\n$color3: #314e52;\r\n\r\n$font1: 'Lora', serif;\r\n$font2: 'Roboto', sans-serif;\r\n"],"sourceRoot":""}]);
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
___CSS_LOADER_EXPORT___.push([module.id, "@import url(https://fonts.googleapis.com/css2?family=Lora&family=Roboto&display=swap);"]);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/*\n* Prefixed by https://autoprefixer.github.io\n* PostCSS: v7.0.29,\n* Autoprefixer: v9.7.6\n* Browsers: last 4 version\n*/\n.calendar-header {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  width: 100%;\n  -webkit-box-pack: justify;\n  -ms-flex-pack: justify;\n  justify-content: space-between;\n  -webkit-box-align: center;\n  -ms-flex-align: center;\n  align-items: center;\n}\n.calendar-header__header {\n  font-size: 25px;\n  font-family: \"Lora\", serif;\n}\n.calendar-header__filter {\n  margin-right: 10px;\n  height: 35px;\n  border-radius: 5px;\n  padding: 5px;\n  border: 2px dotted #B9CBC3;\n  outline: none;\n}\n.calendar-header__button {\n  height: 50%;\n  cursor: pointer;\n  background-color: #B9CBC3;\n  color: #000;\n  border: none;\n  border-radius: 5px;\n  padding: 10px;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  outline: none;\n  -webkit-transition: ease 0.1s;\n  -o-transition: ease 0.1s;\n  transition: ease 0.1s;\n  -webkit-box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.3);\n  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.3);\n}\n.calendar-header__button:hover {\n  -webkit-box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.5);\n  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.5);\n}\n.calendar-header__button:active {\n  -webkit-box-shadow: inset 0px 1px 3px 0px rgba(0, 0, 0, 0.3);\n  box-shadow: inset 0px 1px 3px 0px rgba(0, 0, 0, 0.3);\n}", "",{"version":3,"sources":["webpack://./components/calendarHeader/calendarHeader.scss","webpack://./styles/variables.scss"],"names":[],"mappings":"AAAA;;;;;CAAA;AASA;EACE,oBAAA;EACA,oBAAA;EACA,aAAA;EACA,WAAA;EACA,yBAAA;EACI,sBAAA;EACI,8BAAA;EACR,yBAAA;EACI,sBAAA;EACI,mBAAA;AADV;AAGE;EACE,eAAA;EACA,0BCjBI;ADgBR;AAIE;EACE,kBAAA;EACA,YAAA;EACA,kBAAA;EACA,YAAA;EACA,0BAAA;EACA,aAAA;AAFJ;AAKE;EACE,WAAA;EACA,eAAA;EACA,yBCpCK;EDqCL,WAAA;EACA,YAAA;EACA,kBAAA;EACA,aAAA;EACA,8BAAA;EACQ,sBAAA;EACR,aAAA;EACA,6BAAA;EACA,wBAAA;EACA,qBAAA;EACA,sDAAA;EACQ,8CAAA;AAHZ;AAII;EACE,sDAAA;EACQ,8CAAA;AAFd;AAII;EACE,4DAAA;EACQ,oDAAA;AAFd","sourcesContent":["/*\r\n* Prefixed by https://autoprefixer.github.io\r\n* PostCSS: v7.0.29,\r\n* Autoprefixer: v9.7.6\r\n* Browsers: last 4 version\r\n*/\r\n\r\n@import '/styles/variables.scss';\r\n\r\n.calendar-header {\r\n  display: -webkit-box;\r\n  display: -ms-flexbox;\r\n  display: flex;\r\n  width: 100%;\r\n  -webkit-box-pack: justify;\r\n      -ms-flex-pack: justify;\r\n          justify-content: space-between;\r\n  -webkit-box-align: center;\r\n      -ms-flex-align: center;\r\n          align-items: center;\r\n\r\n  &__header {\r\n    font-size: 25px;\r\n    font-family: $font1;\r\n  }\r\n\r\n  &__filter {\r\n    margin-right: 10px;\r\n    height: 35px;\r\n    border-radius: 5px;\r\n    padding: 5px;\r\n    border: 2px dotted $color1;\r\n    outline: none;\r\n  }\r\n\r\n  &__button {\r\n    height: 50%;\r\n    cursor: pointer;\r\n    background-color: $color1;\r\n    color: #000;\r\n    border: none;\r\n    border-radius: 5px;\r\n    padding: 10px;\r\n    -webkit-box-sizing: border-box;\r\n            box-sizing: border-box;\r\n    outline: none;\r\n    -webkit-transition: ease 0.1s;\r\n    -o-transition: ease 0.1s;\r\n    transition: ease 0.1s;\r\n    -webkit-box-shadow: 0px 1px 3px 0px rgba(0,0,0,0.3);\r\n            box-shadow: 0px 1px 3px 0px rgba(0,0,0,0.3);\r\n    &:hover {\r\n      -webkit-box-shadow: 0px 1px 3px 0px rgba(0,0,0,0.5);\r\n              box-shadow: 0px 1px 3px 0px rgba(0,0,0,0.5);\r\n    }\r\n    &:active {\r\n      -webkit-box-shadow: inset  0px 1px 3px 0px rgba(0,0,0,0.3);\r\n              box-shadow: inset  0px 1px 3px 0px rgba(0,0,0,0.3);\r\n    }\r\n  }\r\n}","@import url('https://fonts.googleapis.com/css2?family=Lora&family=Roboto&display=swap');\r\n\r\n$color1: #B9CBC3;\r\n$color2: #f7f6e7;\r\n$color3: #314e52;\r\n\r\n$font1: 'Lora', serif;\r\n$font2: 'Roboto', sans-serif;\r\n"],"sourceRoot":""}]);
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
___CSS_LOADER_EXPORT___.push([module.id, "@import url(https://fonts.googleapis.com/css2?family=Lora&family=Roboto&display=swap);"]);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/*\n* Prefixed by https://autoprefixer.github.io\n* PostCSS: v7.0.29,\n* Autoprefixer: v9.7.6\n* Browsers: last 4 version\n*/\n.new-event-container {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -ms-flex-direction: column;\n  flex-direction: column;\n  position: absolute;\n  -webkit-box-pack: center;\n  -ms-flex-pack: center;\n  justify-content: center;\n  -webkit-box-align: center;\n  -ms-flex-align: center;\n  align-items: center;\n  -ms-flex-line-pack: center;\n  align-content: center;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  background-color: rgba(255, 255, 255, 0.8);\n}\n.new-event-container .error-message {\n  background-color: #fff;\n  border: 2px solid #ff5d5d;\n  border-radius: 5px;\n  color: #ff5d5d;\n  width: 500px;\n  height: 3em;\n  text-align: center;\n  line-height: 3em;\n  margin-bottom: 10px;\n}\n@media (max-width: 500px) {\n  .new-event-container .error-message {\n    width: 90vw;\n  }\n}\n.new-event-container .new-event {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -ms-flex-direction: column;\n  flex-direction: column;\n  width: 500px;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  padding: 40px;\n  background-color: #B9CBC3;\n  border-radius: 5px;\n  -webkit-box-pack: center;\n  -ms-flex-pack: center;\n  justify-content: center;\n  -webkit-box-align: space-between;\n  -ms-flex-align: space-between;\n  align-items: space-between;\n  -webkit-box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.3);\n  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.3);\n}\n@media (max-width: 500px) {\n  .new-event-container .new-event {\n    width: 90vw;\n  }\n}\n.new-event-container .new-event__item {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: justify;\n  -ms-flex-pack: justify;\n  justify-content: space-between;\n  -ms-flex-line-pack: center;\n  align-content: center;\n  -webkit-box-align: center;\n  -ms-flex-align: center;\n  align-items: center;\n  min-height: 55px;\n  font-size: 15px;\n}\n@media (max-width: 500px) {\n  .new-event-container .new-event__item {\n    flex-direction: column;\n    align-items: flex-start;\n    margin-bottom: 10px;\n  }\n}\n.new-event-container .new-event__input {\n  font-size: 13px;\n  background-color: #fff;\n  width: 75%;\n  height: 35px;\n  border-radius: 5px;\n  border: none;\n  padding-left: 10px;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  outline: none;\n}\n@media (max-width: 500px) {\n  .new-event-container .new-event__input {\n    width: 100%;\n    margin-top: 10px;\n  }\n}\n.new-event-container .new-event__input:focus {\n  -webkit-box-shadow: inset 0px 1px 3px 0px rgba(0, 0, 0, 0.3);\n  box-shadow: inset 0px 1px 3px 0px rgba(0, 0, 0, 0.3);\n}\n.new-event-container .new-event__button-wrapper {\n  margin-top: 20px;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: end;\n  -ms-flex-pack: end;\n  justify-content: flex-end;\n  width: 100%;\n}\n.new-event-container .new-event__button {\n  border-radius: 5px;\n  border: none;\n  outline: none;\n  margin-bottom: 10px;\n  width: 30%;\n  height: 30px;\n  margin-left: 10px;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  cursor: pointer;\n  -webkit-transition: ease 0.1s;\n  -o-transition: ease 0.1s;\n  transition: ease 0.1s;\n  -webkit-box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.3);\n  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.3);\n}\n.new-event-container .new-event__button:hover {\n  -webkit-box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.5);\n  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.5);\n}\n.new-event-container .new-event__button:active {\n  -webkit-box-shadow: inset 0px 1px 3px 0px rgba(0, 0, 0, 0.3);\n  box-shadow: inset 0px 1px 3px 0px rgba(0, 0, 0, 0.3);\n}", "",{"version":3,"sources":["webpack://./components/newEvent/newEvent.scss","webpack://./styles/variables.scss"],"names":[],"mappings":"AAAA;;;;;CAAA;AASA;EACE,oBAAA;EACA,oBAAA;EACA,aAAA;EACA,4BAAA;EACA,6BAAA;EACI,0BAAA;EACI,sBAAA;EACR,kBAAA;EACA,wBAAA;EACI,qBAAA;EACI,uBAAA;EACR,yBAAA;EACI,sBAAA;EACI,mBAAA;EACR,0BAAA;EACI,qBAAA;EACJ,OAAA;EACA,MAAA;EACA,WAAA;EACA,YAAA;EACA,0CAAA;AADF;AAGE;EACE,sBAAA;EACA,yBAAA;EACA,kBAAA;EACA,cAAA;EACA,YAAA;EAIA,WAAA;EACA,kBAAA;EACA,gBAAA;EACA,mBAAA;AAJJ;AAFI;EANF;IAOI,WAAA;EAKJ;AACF;AAGE;EACE,oBAAA;EACA,oBAAA;EACA,aAAA;EACA,4BAAA;EACA,6BAAA;EACI,0BAAA;EACI,sBAAA;EACR,YAAA;EAIA,8BAAA;EACQ,sBAAA;EACR,aAAA;EACA,yBC7DK;ED8DL,kBAAA;EACA,wBAAA;EACI,qBAAA;EACI,uBAAA;EACR,gCAAA;EACI,6BAAA;EACI,0BAAA;EACR,sDAAA;EACQ,8CAAA;AAJZ;AAXI;EATF;IAUI,WAAA;EAcJ;AACF;AAEI;EACE,oBAAA;EACA,oBAAA;EACA,aAAA;EAOA,yBAAA;EACI,sBAAA;EACI,8BAAA;EACR,0BAAA;EACI,qBAAA;EACJ,yBAAA;EACI,sBAAA;EACI,mBAAA;EACR,gBAAA;EACA,eAAA;AANN;AARM;EALF;IAMI,sBAAA;IACA,uBAAA;IACA,mBAAA;EAWN;AACF;AAEI;EACI,eAAA;EACA,sBAAA;EACA,UAAA;EAKA,YAAA;EACA,kBAAA;EACA,YAAA;EACA,kBAAA;EACA,8BAAA;EACQ,sBAAA;EACR,aAAA;AAJR;AANQ;EAJJ;IAKM,WAAA;IACA,gBAAA;EASR;AACF;AADQ;EACE,4DAAA;EACQ,oDAAA;AAGlB;AACI;EACE,gBAAA;EACA,oBAAA;EACA,oBAAA;EACA,aAAA;EACA,qBAAA;EACI,kBAAA;EACI,yBAAA;EACR,WAAA;AACN;AAEI;EACE,kBAAA;EACA,YAAA;EACA,aAAA;EACA,mBAAA;EACA,UAAA;EACA,YAAA;EACA,iBAAA;EACA,8BAAA;EACQ,sBAAA;EACR,eAAA;EACA,6BAAA;EACA,wBAAA;EACA,qBAAA;EACA,sDAAA;EACQ,8CAAA;AAAd;AACM;EACE,sDAAA;EACQ,8CAAA;AAChB;AACM;EACE,4DAAA;EACQ,oDAAA;AAChB","sourcesContent":["/*\r\n* Prefixed by https://autoprefixer.github.io\r\n* PostCSS: v7.0.29,\r\n* Autoprefixer: v9.7.6\r\n* Browsers: last 4 version\r\n*/\r\n\r\n@import '/styles/variables.scss';\r\n\r\n.new-event-container {\r\n  display: -webkit-box;\r\n  display: -ms-flexbox;\r\n  display: flex;\r\n  -webkit-box-orient: vertical;\r\n  -webkit-box-direction: normal;\r\n      -ms-flex-direction: column;\r\n          flex-direction: column;\r\n  position: absolute;\r\n  -webkit-box-pack: center;\r\n      -ms-flex-pack: center;\r\n          justify-content: center;\r\n  -webkit-box-align: center;\r\n      -ms-flex-align: center;\r\n          align-items: center;\r\n  -ms-flex-line-pack: center;\r\n      align-content: center;\r\n  left: 0;\r\n  top: 0;\r\n  width: 100%;\r\n  height: 100%;\r\n  background-color: rgba(255,255,255,0.8);\r\n\r\n  .error-message {\r\n    background-color: #fff;\r\n    border: 2px solid rgb(255, 93, 93);\r\n    border-radius: 5px;\r\n    color: rgb(255, 93, 93);\r\n    width: 500px;\r\n    @media (max-width: 500px) {\r\n      width: 90vw;\r\n    }\r\n    height: 3em;\r\n    text-align: center;\r\n    line-height: 3em;\r\n    margin-bottom: 10px;\r\n  }\r\n    \r\n\r\n  .new-event {\r\n    display: -webkit-box;\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n    -webkit-box-orient: vertical;\r\n    -webkit-box-direction: normal;\r\n        -ms-flex-direction: column;\r\n            flex-direction: column;\r\n    width: 500px;\r\n    @media (max-width: 500px) {\r\n      width: 90vw;\r\n    }\r\n    -webkit-box-sizing: border-box;\r\n            box-sizing: border-box;\r\n    padding: 40px;\r\n    background-color: $color1;\r\n    border-radius: 5px;\r\n    -webkit-box-pack: center;\r\n        -ms-flex-pack: center;\r\n            justify-content: center;\r\n    -webkit-box-align: space-between;\r\n        -ms-flex-align: space-between;\r\n            align-items: space-between;\r\n    -webkit-box-shadow: 0px 1px 3px 0px rgba(0,0,0,0.3);\r\n            box-shadow: 0px 1px 3px 0px rgba(0,0,0,0.3);\r\n\r\n    \r\n    &__item {\r\n      display: -webkit-box;\r\n      display: -ms-flexbox;\r\n      display: flex;\r\n\r\n      @media (max-width: 500px) {\r\n        flex-direction: column;\r\n        align-items: flex-start;\r\n        margin-bottom: 10px;    \r\n      }\r\n      -webkit-box-pack: justify;\r\n          -ms-flex-pack: justify;\r\n              justify-content: space-between;\r\n      -ms-flex-line-pack: center;\r\n          align-content: center;\r\n      -webkit-box-align: center;\r\n          -ms-flex-align: center;\r\n              align-items: center;\r\n      min-height: 55px;\r\n      font-size: 15px;\r\n    }\r\n\r\n    &__input {\r\n        font-size: 13px;\r\n        background-color: #fff;\r\n        width: 75%;\r\n        @media (max-width: 500px) {\r\n          width: 100%;\r\n          margin-top: 10px;  \r\n        }\r\n        height: 35px;\r\n        border-radius: 5px;\r\n        border: none; \r\n        padding-left: 10px;\r\n        -webkit-box-sizing: border-box;\r\n                box-sizing: border-box;\r\n        outline: none;\r\n        &:focus {\r\n          -webkit-box-shadow: inset  0px 1px 3px 0px rgba(0,0,0,0.3);\r\n                  box-shadow: inset  0px 1px 3px 0px rgba(0,0,0,0.3);\r\n        }\r\n    }\r\n\r\n    &__button-wrapper {\r\n      margin-top: 20px;\r\n      display: -webkit-box;\r\n      display: -ms-flexbox;\r\n      display: flex;\r\n      -webkit-box-pack: end;\r\n          -ms-flex-pack: end;\r\n              justify-content: flex-end;\r\n      width: 100%;\r\n    }\r\n\r\n    &__button {\r\n      border-radius: 5px;\r\n      border: none;\r\n      outline: none;\r\n      margin-bottom: 10px;\r\n      width: 30%;\r\n      height: 30px;\r\n      margin-left: 10px;\r\n      -webkit-box-sizing: border-box;\r\n              box-sizing: border-box;\r\n      cursor: pointer;\r\n      -webkit-transition: ease 0.1s;\r\n      -o-transition: ease 0.1s;\r\n      transition: ease 0.1s;\r\n      -webkit-box-shadow: 0px 1px 3px 0px rgba(0,0,0,0.3);\r\n              box-shadow: 0px 1px 3px 0px rgba(0,0,0,0.3);\r\n      &:hover {\r\n        -webkit-box-shadow: 0px 1px 3px 0px rgba(0,0,0,0.5);\r\n                box-shadow: 0px 1px 3px 0px rgba(0,0,0,0.5);\r\n      }\r\n      &:active {\r\n        -webkit-box-shadow: inset  0px 1px 3px 0px rgba(0,0,0,0.3);\r\n                box-shadow: inset  0px 1px 3px 0px rgba(0,0,0,0.3);\r\n      }\r\n    }\r\n  }\r\n}","@import url('https://fonts.googleapis.com/css2?family=Lora&family=Roboto&display=swap');\r\n\r\n$color1: #B9CBC3;\r\n$color2: #f7f6e7;\r\n$color3: #314e52;\r\n\r\n$font1: 'Lora', serif;\r\n$font2: 'Roboto', sans-serif;\r\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./components/removeEvent/removeEvent.scss":
/*!******************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./components/removeEvent/removeEvent.scss ***!
  \******************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, "@import url(https://fonts.googleapis.com/css2?family=Lora&family=Roboto&display=swap);"]);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/*\n* Prefixed by https://autoprefixer.github.io\n* PostCSS: v7.0.29,\n* Autoprefixer: v9.7.6\n* Browsers: last 4 version\n*/\n.remove-event-wrapper {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -ms-flex-direction: column;\n  flex-direction: column;\n  position: absolute;\n  -webkit-box-pack: center;\n  -ms-flex-pack: center;\n  justify-content: center;\n  -webkit-box-align: center;\n  -ms-flex-align: center;\n  align-items: center;\n  -ms-flex-line-pack: center;\n  align-content: center;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  background-color: rgba(255, 255, 255, 0.8);\n}\n.remove-event-wrapper .remove-event {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  max-width: 500px;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -ms-flex-direction: column;\n  flex-direction: column;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  padding: 20px;\n  background-color: #B9CBC3;\n  -webkit-box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.3);\n  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.3);\n  border-radius: 5px;\n  -webkit-box-pack: center;\n  -ms-flex-pack: center;\n  justify-content: center;\n  -webkit-box-align: space-between;\n  -ms-flex-align: space-between;\n  align-items: space-between;\n}\n.remove-event-wrapper .remove-event__title {\n  word-wrap: break-word;\n}\n.remove-event-wrapper .remove-event__buttons {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: end;\n  -ms-flex-pack: end;\n  justify-content: flex-end;\n  width: 100%;\n}\n.remove-event-wrapper .remove-event__button {\n  border-radius: 5px;\n  border: none;\n  outline: none;\n  margin-bottom: 10px;\n  width: 30%;\n  height: 30px;\n  margin-left: 10px;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  cursor: pointer;\n  -webkit-transition: ease 0.1s;\n  -o-transition: ease 0.1s;\n  transition: ease 0.1s;\n  -webkit-box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.3);\n  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.3);\n}\n.remove-event-wrapper .remove-event__button:hover {\n  -webkit-box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.5);\n  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.5);\n}\n.remove-event-wrapper .remove-event__button:active {\n  -webkit-box-shadow: inset 0px 1px 3px 0px rgba(0, 0, 0, 0.3);\n  box-shadow: inset 0px 1px 3px 0px rgba(0, 0, 0, 0.3);\n}", "",{"version":3,"sources":["webpack://./components/removeEvent/removeEvent.scss","webpack://./styles/variables.scss"],"names":[],"mappings":"AAAA;;;;;CAAA;AASA;EACI,oBAAA;EACA,oBAAA;EACA,aAAA;EACA,4BAAA;EACA,6BAAA;EACI,0BAAA;EACI,sBAAA;EACR,kBAAA;EACA,wBAAA;EACI,qBAAA;EACI,uBAAA;EACR,yBAAA;EACI,sBAAA;EACI,mBAAA;EACR,0BAAA;EACI,qBAAA;EACJ,OAAA;EACA,MAAA;EACA,WAAA;EACA,YAAA;EACA,0CAAA;AADJ;AAGI;EACI,oBAAA;EACA,oBAAA;EACA,aAAA;EACA,gBAAA;EACA,4BAAA;EACA,6BAAA;EACI,0BAAA;EACI,sBAAA;EACR,8BAAA;EACQ,sBAAA;EACR,aAAA;EACA,yBC1CC;ED2CD,sDAAA;EACQ,8CAAA;EACR,kBAAA;EACA,wBAAA;EACI,qBAAA;EACI,uBAAA;EACR,gCAAA;EACI,6BAAA;EACI,0BAAA;AADhB;AAGQ;EACI,qBAAA;AADZ;AAIQ;EACI,oBAAA;EACA,oBAAA;EACA,aAAA;EACA,qBAAA;EACI,kBAAA;EACI,yBAAA;EACR,WAAA;AAFZ;AAKQ;EACI,kBAAA;EACA,YAAA;EACA,aAAA;EACA,mBAAA;EACA,UAAA;EACA,YAAA;EACA,iBAAA;EACA,8BAAA;EACQ,sBAAA;EACR,eAAA;EACA,6BAAA;EACA,wBAAA;EACA,qBAAA;EACA,sDAAA;EACQ,8CAAA;AAHpB;AAIY;EACE,sDAAA;EACQ,8CAAA;AAFtB;AAIY;EACE,4DAAA;EACQ,oDAAA;AAFtB","sourcesContent":["/*\r\n* Prefixed by https://autoprefixer.github.io\r\n* PostCSS: v7.0.29,\r\n* Autoprefixer: v9.7.6\r\n* Browsers: last 4 version\r\n*/\r\n\r\n@import '/styles/variables.scss';\r\n\r\n.remove-event-wrapper {\r\n    display: -webkit-box;\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n    -webkit-box-orient: vertical;\r\n    -webkit-box-direction: normal;\r\n        -ms-flex-direction: column;\r\n            flex-direction: column;\r\n    position: absolute;\r\n    -webkit-box-pack: center;\r\n        -ms-flex-pack: center;\r\n            justify-content: center;\r\n    -webkit-box-align: center;\r\n        -ms-flex-align: center;\r\n            align-items: center;\r\n    -ms-flex-line-pack: center;\r\n        align-content: center;\r\n    left: 0;\r\n    top: 0;\r\n    width: 100%;\r\n    height: 100%;\r\n    background-color: rgba(255,255,255,0.8);\r\n\r\n    .remove-event {\r\n        display: -webkit-box;\r\n        display: -ms-flexbox;\r\n        display: flex;\r\n        max-width: 500px;\r\n        -webkit-box-orient: vertical;\r\n        -webkit-box-direction: normal;\r\n            -ms-flex-direction: column;\r\n                flex-direction: column;\r\n        -webkit-box-sizing: border-box;\r\n                box-sizing: border-box;\r\n        padding: 20px;\r\n        background-color: $color1;\r\n        -webkit-box-shadow: 0px 1px 3px 0px rgba(0,0,0,0.3);\r\n                box-shadow: 0px 1px 3px 0px rgba(0,0,0,0.3);\r\n        border-radius: 5px;\r\n        -webkit-box-pack: center;\r\n            -ms-flex-pack: center;\r\n                justify-content: center;\r\n        -webkit-box-align: space-between;\r\n            -ms-flex-align: space-between;\r\n                align-items: space-between;\r\n\r\n        &__title {\r\n            word-wrap: break-word;\r\n        }\r\n\r\n        &__buttons {\r\n            display: -webkit-box;\r\n            display: -ms-flexbox;\r\n            display: flex;\r\n            -webkit-box-pack: end;\r\n                -ms-flex-pack: end;\r\n                    justify-content: flex-end;\r\n            width: 100%;\r\n        }\r\n\r\n        &__button {\r\n            border-radius: 5px;\r\n            border: none;\r\n            outline: none;\r\n            margin-bottom: 10px;\r\n            width: 30%;\r\n            height: 30px;\r\n            margin-left: 10px;\r\n            -webkit-box-sizing: border-box;\r\n                    box-sizing: border-box;\r\n            cursor: pointer;\r\n            -webkit-transition: ease 0.1s;\r\n            -o-transition: ease 0.1s;\r\n            transition: ease 0.1s;\r\n            -webkit-box-shadow: 0px 1px 3px 0px rgba(0,0,0,0.3);\r\n                    box-shadow: 0px 1px 3px 0px rgba(0,0,0,0.3);\r\n            &:hover {\r\n              -webkit-box-shadow: 0px 1px 3px 0px rgba(0,0,0,0.5);\r\n                      box-shadow: 0px 1px 3px 0px rgba(0,0,0,0.5);\r\n            }\r\n            &:active {\r\n              -webkit-box-shadow: inset  0px 1px 3px 0px rgba(0,0,0,0.3);\r\n                      box-shadow: inset  0px 1px 3px 0px rgba(0,0,0,0.3);\r\n            }\r\n        }\r\n    }\r\n}","@import url('https://fonts.googleapis.com/css2?family=Lora&family=Roboto&display=swap');\r\n\r\n$color1: #B9CBC3;\r\n$color2: #f7f6e7;\r\n$color3: #314e52;\r\n\r\n$font1: 'Lora', serif;\r\n$font2: 'Roboto', sans-serif;\r\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./components/selectComponent/selectComponent.scss":
/*!**************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./components/selectComponent/selectComponent.scss ***!
  \**************************************************************************************************************************************/
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
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _assets_arrowDown_png__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../assets/arrowDown.png */ "./assets/arrowDown.png");
// Imports




var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
___CSS_LOADER_EXPORT___.push([module.id, "@import url(https://fonts.googleapis.com/css2?family=Lora&family=Roboto&display=swap);"]);
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(_assets_arrowDown_png__WEBPACK_IMPORTED_MODULE_3__.default);
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".select-multiply {\n  z-index: 1;\n  padding: 0 !important;\n  width: 100%;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: justify;\n  -ms-flex-pack: justify;\n  justify-content: space-between;\n}\n.select-multiply.open .select-multiply__dropdown {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n.select-multiply.open .select-multiply__input {\n  border-bottom: none;\n}\n.select-multiply__value {\n  padding-left: 10px;\n  line-height: 1em;\n  margin-top: auto;\n  margin-bottom: auto;\n}\n.select-multiply__dropdown {\n  display: none;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -ms-flex-direction: column;\n  flex-direction: column;\n  position: fixed;\n  border: 1px solid #ccc;\n  border-radius: 5px;\n  width: 315px;\n  margin-top: 35px;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  background-color: #fff;\n  max-height: 200px;\n  overflow-y: auto;\n  -webkit-box-shadow: 2px 3px 5px rgba(0, 0, 0, 0.3);\n  box-shadow: 2px 3px 5px rgba(0, 0, 0, 0.3);\n}\n.select-multiply__dropdown-item {\n  z-index: 100;\n  width: 100%;\n  height: 35px;\n  margin: 0;\n  line-height: 35px;\n  padding-left: 10px;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n}\n.select-multiply__dropdown-item:hover {\n  background-color: #eee;\n  cursor: pointer;\n  -webkit-transition: 0.15s background-color ease-in;\n  -o-transition: 0.15s background-color ease-in;\n  transition: 0.15s background-color ease-in;\n}\n.select-multiply__dropdown-item.selected {\n  background-color: #f7f6e7;\n}\n.select-multiply::after {\n  -ms-flex-item-align: center;\n  -ms-grid-row-align: center;\n  align-self: center;\n  background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");\n  background-size: 10px;\n  background-repeat: no-repeat;\n  display: inline-block;\n  width: 10px;\n  height: 8px;\n  margin-right: 5px;\n  content: \"\";\n}\n.select-multiply slot {\n  display: none;\n}\n.select-multiply li {\n  list-style: none;\n}", "",{"version":3,"sources":["webpack://./components/selectComponent/selectComponent.scss","webpack://./styles/variables.scss"],"names":[],"mappings":"AAEA;EAEE,UAAA;EACA,qBAAA;EAgEE,WAAA;EACA,oBAAA;EACA,oBAAA;EACA,aAAA;EACA,yBAAA;EACA,sBAAA;EACQ,8BAAA;AAhEZ;AAHI;EACE,oBAAA;EACA,oBAAA;EACA,aAAA;AAKN;AAFI;EACE,mBAAA;AAIN;AAAE;EACE,kBAAA;EACA,gBAAA;EACA,gBAAA;EACA,mBAAA;AAEJ;AACE;EACE,aAAA;EACA,4BAAA;EACA,6BAAA;EACI,0BAAA;EACI,sBAAA;EACR,eAAA;EACA,sBAAA;EACA,kBAAA;EACA,YAAA;EACA,gBAAA;EACA,8BAAA;EACQ,sBAAA;EACR,sBAAA;EAEA,iBAAA;EACA,gBAAA;EACA,kDAAA;EACQ,0CAAA;AAAZ;AAEI;EACE,YAAA;EACA,WAAA;EACA,YAAA;EACA,SAAA;EACA,iBAAA;EACA,kBAAA;EACA,8BAAA;EACQ,sBAAA;AAAd;AACM;EACE,sBAAA;EACA,eAAA;EACA,kDAAA;EACA,6CAAA;EACA,0CAAA;AACR;AAEM;EACE,yBC7DC;AD6DT;AAYI;EACE,2BAAA;EACI,0BAAA;EACA,kBAAA;EACJ,yDAAA;EACA,qBAAA;EACA,4BAAA;EACA,qBAAA;EACA,WAAA;EACA,WAAA;EACA,iBAAA;EACA,WAAA;AAVN;AAYI;EACE,aAAA;AAVN;AAaI;EACI,gBAAA;AAXR","sourcesContent":["@import '/styles/variables.scss';\r\n\r\n.select-multiply {\r\n  $root: &;\r\n  z-index: 1;\r\n  padding: 0!important;\r\n\r\n  &.open {\r\n    #{$root}__dropdown {\r\n      display: -webkit-box;      \r\n      display: -ms-flexbox;      \r\n      display: flex;    \r\n    }\r\n\r\n    #{$root}__input {\r\n      border-bottom: none;\r\n    }\r\n  }\r\n\r\n  &__value {\r\n    padding-left: 10px;\r\n    line-height: 1em;\r\n    margin-top: auto;\r\n    margin-bottom: auto;\r\n  }\r\n\r\n  &__dropdown {\r\n    display: none;\r\n    -webkit-box-orient: vertical;\r\n    -webkit-box-direction: normal;\r\n        -ms-flex-direction: column;\r\n            flex-direction: column;\r\n    position: fixed;\r\n    border: 1px solid #ccc;\r\n    border-radius: 5px;\r\n    width: 315px;\r\n    margin-top: 35px;\r\n    -webkit-box-sizing: border-box;\r\n            box-sizing: border-box;\r\n    background-color: #fff;\r\n    \r\n    max-height: 200px;\r\n    overflow-y: auto;\r\n    -webkit-box-shadow: 2px 3px 5px rgba(0, 0, 0, 0.3);\r\n            box-shadow: 2px 3px 5px rgba(0, 0, 0, 0.3);\r\n\r\n    &-item {\r\n      z-index: 100;\r\n      width: 100%;\r\n      height: 35px;\r\n      margin: 0;\r\n      line-height: 35px;\r\n      padding-left: 10px;\r\n      -webkit-box-sizing: border-box;\r\n              box-sizing: border-box;\r\n      &:hover {\r\n        background-color: #eee;\r\n        cursor: pointer;\r\n        -webkit-transition: 0.15s background-color ease-in;\r\n        -o-transition: 0.15s background-color ease-in;\r\n        transition: 0.15s background-color ease-in;\r\n      }\r\n\r\n      &.selected {\r\n        background-color: $color2;\r\n      }\r\n    }\r\n  }\r\n\r\n    width: 100%;\r\n    display: -webkit-box;\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n    -webkit-box-pack: justify;\r\n    -ms-flex-pack: justify;\r\n            justify-content: space-between;\r\n    &::after {\r\n      -ms-flex-item-align: center;\r\n          -ms-grid-row-align: center;\r\n          align-self: center;\r\n      background-image: url('/assets/arrowDown.png');\r\n      background-size: 10px;\r\n      background-repeat: no-repeat;\r\n      display: inline-block;\r\n      width: 10px; \r\n      height: 8px;\r\n      margin-right: 5px;\r\n      content: '';\r\n    }\r\n    slot {\r\n      display: none;\r\n    }\r\n\r\n    li {\r\n        list-style: none;\r\n    }\r\n  }\r\n","@import url('https://fonts.googleapis.com/css2?family=Lora&family=Roboto&display=swap');\r\n\r\n$color1: #B9CBC3;\r\n$color2: #f7f6e7;\r\n$color3: #314e52;\r\n\r\n$font1: 'Lora', serif;\r\n$font2: 'Roboto', sans-serif;\r\n"],"sourceRoot":""}]);
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

/***/ "./node_modules/css-loader/dist/runtime/getUrl.js":
/*!********************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/getUrl.js ***!
  \********************************************************/
/***/ ((module) => {

"use strict";


module.exports = function (url, options) {
  if (!options) {
    // eslint-disable-next-line no-param-reassign
    options = {};
  } // eslint-disable-next-line no-underscore-dangle, no-param-reassign


  url = url && url.__esModule ? url.default : url;

  if (typeof url !== 'string') {
    return url;
  } // If url is already wrapped in quotes, remove them


  if (/^['"].*['"]$/.test(url)) {
    // eslint-disable-next-line no-param-reassign
    url = url.slice(1, -1);
  }

  if (options.hash) {
    // eslint-disable-next-line no-param-reassign
    url += options.hash;
  } // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls


  if (/["'() \t\n]/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, '\\n'), "\"");
  }

  return url;
};

/***/ }),

/***/ "./assets/arrowDown.png":
/*!******************************!*\
  !*** ./assets/arrowDown.png ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "assets/arrowDown.png");

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

/***/ "./components/removeEvent/removeEvent.scss":
/*!*************************************************!*\
  !*** ./components/removeEvent/removeEvent.scss ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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

/***/ "./components/selectComponent/selectComponent.scss":
/*!*********************************************************!*\
  !*** ./components/selectComponent/selectComponent.scss ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_selectComponent_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./selectComponent.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./components/selectComponent/selectComponent.scss");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_selectComponent_scss__WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_selectComponent_scss__WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

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
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
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
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
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