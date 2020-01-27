(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[8],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Chronometer.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Chronometer.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  props: ['task'],
  created: function created() {},
  data: function data() {
    return {
      time: '00:00:00',
      timeBegan: null,
      timeStopped: null,
      stoppedDuration: 0,
      started: null,
      running: false,
      done: false,
      doneTime: null
    };
  },
  methods: {
    store: function store() {
      var _this = this;

      if (this.time !== '00:00:00') {
        this.done = false;
        var post = {
          date: moment().format('YYYY-MM-DD'),
          time: this.time,
          project_id: this.task.project.id,
          comment: this.task.name
        };
        axios.post('/hours', post).then(function (response) {
          var seconds = moment(post.time, 'HH:mm:ss').diff(moment().startOf('day'), 'seconds');
          _this.doneTime = moment.duration(seconds, "seconds").humanize();
          _this.done = true;

          _this.reset();
        })["catch"](function (errors) {
          console.log(errors);
        });
      }
    },
    start: function start() {
      this.done = false;
      if (this.running) return;

      if (this.timeBegan === null) {
        this.reset();
        this.timeBegan = new Date();
      }

      if (this.timeStopped !== null) {
        this.stoppedDuration += new Date() - this.timeStopped;
      }

      this.started = setInterval(this.clockRunning, 10);
      this.running = true;
    },
    stop: function stop() {
      this.running = false;
      this.timeStopped = new Date();
      clearInterval(this.started);
    },
    reset: function reset() {
      this.running = false;
      clearInterval(this.started);
      this.stoppedDuration = 0;
      this.timeBegan = null;
      this.timeStopped = null;
      this.time = "00:00:00";
    },
    clockRunning: function clockRunning() {
      var currentTime = new Date(),
          timeElapsed = new Date(currentTime - this.timeBegan - this.stoppedDuration),
          hour = timeElapsed.getUTCHours(),
          min = timeElapsed.getUTCMinutes(),
          sec = timeElapsed.getUTCSeconds(),
          ms = timeElapsed.getUTCMilliseconds();
      this.time = this.zeroPrefix(hour, 2) + ":" + this.zeroPrefix(min, 2) + ":" + this.zeroPrefix(sec, 2);
    },
    zeroPrefix: function zeroPrefix(num, digit) {
      var zero = '';

      for (var i = 0; i < digit; i++) {
        zero += '0';
      }

      return (zero + num).slice(-digit);
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Chronometer.vue?vue&type=template&id=b1bfa2aa&":
/*!**************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Chronometer.vue?vue&type=template&id=b1bfa2aa& ***!
  \**************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { attrs: { id: "clock" } }, [
    _vm.done
      ? _c(
          "div",
          { staticClass: "alert alert-info", attrs: { role: "alert" } },
          [
            _vm._v(
              "\n\t  " +
                _vm._s(_vm.doneTime) +
                " ont été ajouté au projet " +
                _vm._s(_vm.task.project.name) +
                ".\n\t"
            )
          ]
        )
      : _vm._e(),
    _vm._v(" "),
    _c(
      "button",
      { staticClass: "btn btn-block btn-outline-primary time mb-1" },
      [_vm._v(_vm._s(_vm.time))]
    ),
    _vm._v(" "),
    _c("div", { staticClass: "btn-group w-100", attrs: { role: "group" } }, [
      !_vm.running
        ? _c(
            "button",
            {
              staticClass: "btn btn-secondary",
              class: { "btn-success": _vm.running },
              attrs: { type: "button" },
              on: {
                click: function($event) {
                  return _vm.start()
                }
              }
            },
            [_c("i", { staticClass: "fas fa-play" })]
          )
        : _vm._e(),
      _vm._v(" "),
      _vm.running
        ? _c(
            "button",
            {
              staticClass: "btn btn-secondary",
              class: { active: _vm.timeStopped && !_vm.running },
              attrs: { type: "button" },
              on: {
                click: function($event) {
                  return _vm.stop()
                }
              }
            },
            [_c("i", { staticClass: "fas fa-pause" })]
          )
        : _vm._e(),
      _vm._v(" "),
      _c(
        "button",
        {
          staticClass: "btn btn-secondary",
          attrs: { type: "button" },
          on: {
            click: function($event) {
              return _vm.reset()
            }
          }
        },
        [_c("i", { staticClass: "fas fa-stop" })]
      ),
      _vm._v(" "),
      _c(
        "button",
        {
          staticClass: "btn btn-success",
          attrs: { type: "button" },
          on: { click: _vm.store }
        },
        [
          _c("i", { staticClass: "fas fa-stop" }),
          _vm._v(" "),
          _c("i", { staticClass: "fas fa-save" })
        ]
      )
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js":
/*!********************************************************************!*\
  !*** ./node_modules/vue-loader/lib/runtime/componentNormalizer.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ "./resources/js/components/Chronometer.vue":
/*!*************************************************!*\
  !*** ./resources/js/components/Chronometer.vue ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Chronometer_vue_vue_type_template_id_b1bfa2aa___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Chronometer.vue?vue&type=template&id=b1bfa2aa& */ "./resources/js/components/Chronometer.vue?vue&type=template&id=b1bfa2aa&");
/* harmony import */ var _Chronometer_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Chronometer.vue?vue&type=script&lang=js& */ "./resources/js/components/Chronometer.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Chronometer_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Chronometer_vue_vue_type_template_id_b1bfa2aa___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Chronometer_vue_vue_type_template_id_b1bfa2aa___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/Chronometer.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/Chronometer.vue?vue&type=script&lang=js&":
/*!**************************************************************************!*\
  !*** ./resources/js/components/Chronometer.vue?vue&type=script&lang=js& ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Chronometer_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./Chronometer.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Chronometer.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Chronometer_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/Chronometer.vue?vue&type=template&id=b1bfa2aa&":
/*!********************************************************************************!*\
  !*** ./resources/js/components/Chronometer.vue?vue&type=template&id=b1bfa2aa& ***!
  \********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Chronometer_vue_vue_type_template_id_b1bfa2aa___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./Chronometer.vue?vue&type=template&id=b1bfa2aa& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Chronometer.vue?vue&type=template&id=b1bfa2aa&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Chronometer_vue_vue_type_template_id_b1bfa2aa___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Chronometer_vue_vue_type_template_id_b1bfa2aa___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);