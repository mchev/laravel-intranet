(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[11],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/HoursList.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/HoursList.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************/
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
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  props: ['project'],
  data: function data() {
    return {
      users: [],
      project_id: this.project ? this.project.id : null,
      rows: [],
      query: '',
      order: 'date',
      range: {
        start: moment().subtract(1, "month").format('YYYY-MM-DD'),
        end: moment().format('YYYY-MM-DD')
      },
      shortcuts: [{
        key: 'thisWeek',
        label: 'Cette semaine',
        value: 'isoWeek'
      }, {
        key: 'lastWeek',
        label: 'Sem. dernière',
        value: '-isoWeek'
      }, {
        key: 'last7Days',
        label: '-7 jours',
        value: 7
      }, {
        key: 'last30Days',
        label: '-30 jours',
        value: 30
      }, {
        key: 'thisMonth',
        label: 'Mois en cours',
        value: 'month'
      }, {
        key: 'lastMonth',
        label: 'Le mois dernier',
        value: '-month'
      }, {
        key: 'thisYear',
        label: 'Cette année',
        value: 'year'
      } //{ key: 'lastYear', label: 'L\'année dernière', value: '-year' }
      ],
      maxDate: moment().format('YYYY-MM-DD')
    };
  },
  methods: {
    fetch: function fetch() {
      var _this = this;

      axios.get('/hours?project=' + this.project_id + '&q=' + this.query + '&order=' + this.order + '&start=' + this.range.start + '&end=' + this.range.end).then(function (response) {
        _this.rows = response.data;
      });
    },
    changeOrder: function changeOrder(field) {
      this.order = field;
      this.fetch();
    },
    updateHour: function updateHour(event, hour) {
      var _this2 = this;

      event.preventDefault();
      event.target.setAttribute('readonly', 'readonly');
      axios.patch('/hours/' + hour.id, hour).then(function (response) {
        _this2.fetch();
      });
    },
    deleteHour: function deleteHour(hour) {
      var _this3 = this;

      axios["delete"]('/hours/' + hour.id).then(function (response) {
        _this3.fetch();
      });
    },
    print: function print() {
      window.print();
    },
    groupBy: function groupBy(array, key) {
      var result = {};
      array.forEach(function (item) {
        if (!result[item[key]]) {
          result[item[key]] = [];
        }

        result[item[key]].push(item);
      });
      return result;
    }
  },
  mounted: function mounted() {
    this.fetch();
  },
  computed: {
    total: function total() {
      return this.rows.reduce(function (total, item) {
        var time = moment.duration(item.time).asSeconds();
        return total + time;
      }, 0);
    },
    groups: function groups() {
      return this.groupBy(this.rows, 'user_id');
    }
  },
  filters: {
    seconds: function seconds(time) {
      return Math.floor(time / 3600) + "h" + ("0" + Math.floor(time / 60) % 60).slice(-2);
    },
    totalseconds: function totalseconds(rows) {
      return rows.reduce(function (total, item) {
        var time = moment.duration(item.time).asSeconds();
        return total + time;
      }, 0);
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/HoursList.vue?vue&type=template&id=2d0387f2&":
/*!************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/HoursList.vue?vue&type=template&id=2d0387f2& ***!
  \************************************************************************************************************************************************************************************************************/
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
  return _c("div", [
    _c("div", { staticClass: "row mb-3" }, [
      _c("div", { staticClass: "col" }, [
        _c("input", {
          directives: [
            {
              name: "model",
              rawName: "v-model",
              value: _vm.query,
              expression: "query"
            }
          ],
          staticClass: "form-control",
          attrs: {
            type: "text",
            placeholder: "Rechercher (Nom, Projet, Client)"
          },
          domProps: { value: _vm.query },
          on: {
            keyup: _vm.fetch,
            input: function($event) {
              if ($event.target.composing) {
                return
              }
              _vm.query = $event.target.value
            }
          }
        })
      ]),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "col" },
        [
          _c("datetime", {
            staticClass: "w-100",
            attrs: {
              range: "",
              "max-date": _vm.maxDate,
              format: "YYYY-MM-DD",
              formatted: "DD/MM/YYYY",
              "custom-shortcuts": _vm.shortcuts,
              label: "Sélectionner une plage de dates"
            },
            on: { validate: _vm.fetch },
            model: {
              value: _vm.range,
              callback: function($$v) {
                _vm.range = $$v
              },
              expression: "range"
            }
          })
        ],
        1
      ),
      _vm._v(" "),
      _c("div", { staticClass: "col text-right" }, [
        _c(
          "button",
          {
            staticClass: "btn btn-info d-print-none",
            attrs: { title: "Imprimer" },
            on: { click: _vm.print }
          },
          [_c("i", { staticClass: "fas fa-print" })]
        ),
        _vm._v(" "),
        _c("div", { staticClass: "btn btn-info" }, [
          _c("i", { staticClass: "far fa-clock" }),
          _vm._v(" " + _vm._s(_vm._f("seconds")(_vm.total)))
        ]),
        _vm._v(" "),
        _c(
          "a",
          {
            staticClass: "btn btn-success d-print-none",
            attrs: {
              href: "#",
              "data-toggle": "modal",
              "data-target": "#createHoursModal",
              title: "Ajouter un client"
            }
          },
          [
            _c("i", { staticClass: "fas fa-plus" }),
            _vm._v(" "),
            !_vm.project ? _c("span", [_vm._v("Ajouter des heures")]) : _vm._e()
          ]
        )
      ])
    ]),
    _vm._v(" "),
    _c(
      "div",
      { staticClass: "row mb-3" },
      _vm._l(_vm.groups, function(group) {
        return _c("div", { staticClass: "col" }, [
          _c("div", { staticClass: "card" }, [
            _c("div", { staticClass: "card-header" }, [
              _vm._v(
                "\n                        " +
                  _vm._s(group[0].user.name) +
                  "\n                    "
              )
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "card-body" }, [
              _vm._v(
                "\n                        " +
                  _vm._s(_vm._f("seconds")(_vm._f("totalseconds")(group))) +
                  "\n                    "
              )
            ])
          ])
        ])
      }),
      0
    ),
    _vm._v(" "),
    _c("div", { staticClass: "table-responsive" }, [
      _c(
        "table",
        { staticClass: "table bg-white table-bordered table-striped" },
        [
          _c("thead", [
            _c("tr", [
              _c("th", [_vm._v("Nom")]),
              _vm._v(" "),
              !_vm.project ? _c("th", [_vm._v("Projet")]) : _vm._e(),
              _vm._v(" "),
              _c("th", [_vm._v("Date")]),
              _vm._v(" "),
              _c("th", [_vm._v("Temps")]),
              _vm._v(" "),
              _c("th", [_vm._v("Commentaire")]),
              _vm._v(" "),
              _c("th")
            ])
          ]),
          _vm._v(" "),
          _c(
            "tbody",
            _vm._l(_vm.rows, function(row) {
              return _c("tr", [
                _c("td", [_vm._v(_vm._s(row.user.name))]),
                _vm._v(" "),
                !_vm.project
                  ? _c("td", [
                      _vm._v(
                        _vm._s(row.project.customer.name) +
                          " - " +
                          _vm._s(row.project.name)
                      )
                    ])
                  : _vm._e(),
                _vm._v(" "),
                _c("td", [
                  _vm._v(_vm._s(_vm._f("moment")(row.date, "DD/MM/Y")))
                ]),
                _vm._v(" "),
                _c("td", [_vm._v(_vm._s(row.time))]),
                _vm._v(" "),
                _c("td", [_vm._v(_vm._s(row.comment))]),
                _vm._v(" "),
                _c("td", [
                  _c(
                    "button",
                    {
                      staticClass: "btn btn-default text-danger",
                      on: {
                        click: function($event) {
                          return _vm.deleteHour(row)
                        }
                      }
                    },
                    [_c("i", { staticClass: "far fa-trash-alt" })]
                  )
                ])
              ])
            }),
            0
          )
        ]
      )
    ]),
    _vm._v(" "),
    _c(
      "div",
      {
        staticClass: "modal fade",
        attrs: {
          id: "createHoursModal",
          tabindex: "-1",
          role: "dialog",
          "aria-hidden": "true"
        }
      },
      [
        _c(
          "div",
          { staticClass: "modal-dialog", attrs: { role: "document" } },
          [_c("div", { staticClass: "modal-content" }, [_c("add-hours")], 1)]
        )
      ]
    )
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

/***/ "./resources/js/components/HoursList.vue":
/*!***********************************************!*\
  !*** ./resources/js/components/HoursList.vue ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HoursList_vue_vue_type_template_id_2d0387f2___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./HoursList.vue?vue&type=template&id=2d0387f2& */ "./resources/js/components/HoursList.vue?vue&type=template&id=2d0387f2&");
/* harmony import */ var _HoursList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./HoursList.vue?vue&type=script&lang=js& */ "./resources/js/components/HoursList.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _HoursList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _HoursList_vue_vue_type_template_id_2d0387f2___WEBPACK_IMPORTED_MODULE_0__["render"],
  _HoursList_vue_vue_type_template_id_2d0387f2___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/HoursList.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/HoursList.vue?vue&type=script&lang=js&":
/*!************************************************************************!*\
  !*** ./resources/js/components/HoursList.vue?vue&type=script&lang=js& ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_HoursList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./HoursList.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/HoursList.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_HoursList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/HoursList.vue?vue&type=template&id=2d0387f2&":
/*!******************************************************************************!*\
  !*** ./resources/js/components/HoursList.vue?vue&type=template&id=2d0387f2& ***!
  \******************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_HoursList_vue_vue_type_template_id_2d0387f2___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./HoursList.vue?vue&type=template&id=2d0387f2& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/HoursList.vue?vue&type=template&id=2d0387f2&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_HoursList_vue_vue_type_template_id_2d0387f2___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_HoursList_vue_vue_type_template_id_2d0387f2___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);