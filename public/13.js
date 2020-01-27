(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[13],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/ProjectsList.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/ProjectsList.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************/
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
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      columns: [{
        label: 'id',
        field: 'id'
      }, {
        label: 'Nom',
        field: 'name'
      }, {
        label: 'Téléphone',
        field: 'phone'
      }, {
        label: 'Email',
        field: 'email'
      }],
      rows: [],
      pagination: {
        perPage: 10,
        currentPage: 1,
        total: 0,
        nextPage: '',
        prevPage: '',
        nextPageId: 2,
        prevPageId: 1,
        firstPage: '',
        lastPage: '',
        from: '',
        to: ''
      },
      query: '',
      order: 'name'
    };
  },
  methods: {
    fetch: function fetch() {
      var _this = this;

      axios.get('/projects?page=' + this.pagination.currentPage + '&paginate=' + this.pagination.perPage + '&q=' + this.query + '&order=' + this.order).then(function (response) {
        _this.rows = response.data.data;
        _this.pagination = {
          perPage: _this.pagination.perPage,
          currentPage: response.data.current_page,
          total: response.data.total,
          nextPage: response.data.next_page_url,
          prevPage: response.data.prev_page_url,
          nextPageId: parseInt(response.data.current_page) + 1,
          prevPageId: parseInt(response.data.current_page) - 1,
          firstPage: response.data.first_page_url,
          lastPage: response.data.last_page_url,
          from: response.data.from,
          to: response.data.to
        };
      });
    },
    changeOrder: function changeOrder(field) {
      this.order = field;
      this.fetch();
    },
    gotoPage: function gotoPage(id) {
      this.pagination.currentPage = id;
      this.fetch();
    },
    convertSeconds: function convertSeconds(seconds) {
      return moment('2000-01-01').add(seconds, 'seconds').format('HH:mm');
    }
  },
  mounted: function mounted() {
    this.fetch();
  },
  created: function created() {},
  filters: {
    seconds: function seconds(time) {
      return Math.floor(time / 3600) + "h" + ("0" + Math.floor(time / 60) % 60).slice(-2);
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/ProjectsList.vue?vue&type=template&id=0d590823&":
/*!***************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/ProjectsList.vue?vue&type=template&id=0d590823& ***!
  \***************************************************************************************************************************************************************************************************************/
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
  return _c(
    "div",
    [
      _c("div", { staticClass: "row mb-3" }, [
        _c("div", { staticClass: "col-md-6" }, [
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
              placeholder: "Rechercher (Client, Nom, Référence)"
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
        _vm._m(0)
      ]),
      _vm._v(" "),
      _vm._l(_vm.rows, function(customer) {
        return _c("div", { staticClass: "card my-3" }, [
          _c("div", { staticClass: "card-header" }, [
            _c("div", { staticClass: "row" }, [
              _c("div", { staticClass: "col" }, [
                _c("h5", [
                  _c(
                    "a",
                    { attrs: { href: "/customers/" + customer.id + "/edit" } },
                    [_vm._v(_vm._s(customer.name))]
                  )
                ])
              ])
            ])
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "card-body" }, [
            _c("div", { staticClass: "table-responsive" }, [
              _c("table", { staticClass: "table table-striped" }, [
                _vm._m(1, true),
                _vm._v(" "),
                _c(
                  "tbody",
                  _vm._l(customer.projects, function(project) {
                    return _c("tr", { staticClass: "pl-2" }, [
                      _c("td", [_vm._v(_vm._s(project.ref))]),
                      _vm._v(" "),
                      _c("td", { attrs: { width: "20%" } }, [
                        _c(
                          "a",
                          {
                            attrs: { href: "/projects/" + project.id + "/edit" }
                          },
                          [_vm._v(_vm._s(project.name))]
                        )
                      ]),
                      _vm._v(" "),
                      _c("td", { attrs: { width: "20%" } }, [
                        _vm._v(_vm._s(project.type.label))
                      ]),
                      _vm._v(" "),
                      _c("td", { attrs: { width: "20%" } }, [
                        _vm._v(_vm._s(project.state.label))
                      ]),
                      _vm._v(" "),
                      _c("td", { attrs: { width: "10%" } }, [
                        _vm._v(_vm._s(project.budget) + " "),
                        project.budget ? _c("span", [_vm._v("€")]) : _vm._e()
                      ]),
                      _vm._v(" "),
                      _c("td", [
                        _vm._v(_vm._s(_vm._f("seconds")(project.total_seconds)))
                      ]),
                      _vm._v(" "),
                      _c("td", { attrs: { width: "10%" } }, [
                        _vm._v(
                          _vm._s(
                            _vm._f("moment")(
                              project.created_at,
                              "DD/MM/Y HH:mm"
                            )
                          )
                        )
                      ]),
                      _vm._v(" "),
                      _c("td", { attrs: { width: "10%" } }, [
                        _vm._v(
                          _vm._s(
                            _vm._f("moment")(
                              project.updated_at,
                              "DD/MM/Y HH:mm"
                            )
                          )
                        )
                      ]),
                      _vm._v(" "),
                      _c("td", [
                        _c(
                          "a",
                          {
                            attrs: {
                              href: "/projects/" + project.id + "/edit",
                              title: "Modifier"
                            }
                          },
                          [_c("i", { staticClass: "far fa-edit" })]
                        )
                      ])
                    ])
                  }),
                  0
                )
              ])
            ])
          ])
        ])
      }),
      _vm._v(" "),
      _vm.pagination.total > _vm.pagination.perPage
        ? _c("nav", [
            _c(
              "ul",
              { staticClass: "pagination" },
              [
                _c(
                  "li",
                  {
                    staticClass: "page-item",
                    attrs: { disabled: _vm.pagination.prevPage ? false : true }
                  },
                  [
                    _c(
                      "a",
                      {
                        staticClass: "page-link",
                        attrs: { href: "#", title: "Précédent" },
                        on: {
                          click: function($event) {
                            return _vm.gotoPage(_vm.pagination.prevPageId)
                          }
                        }
                      },
                      [_c("i", { staticClass: "fas fa-chevron-left" })]
                    )
                  ]
                ),
                _vm._v(" "),
                _vm._l(
                  Math.ceil(_vm.pagination.total / _vm.pagination.perPage),
                  function(i) {
                    return _c(
                      "li",
                      {
                        key: i,
                        staticClass: "page-item",
                        class: { active: i == _vm.pagination.currentPage }
                      },
                      [
                        _c(
                          "a",
                          {
                            staticClass: "page-link",
                            attrs: { href: "#" },
                            on: {
                              click: function($event) {
                                return _vm.gotoPage(i)
                              }
                            }
                          },
                          [_vm._v(_vm._s(i))]
                        )
                      ]
                    )
                  }
                ),
                _vm._v(" "),
                _c(
                  "li",
                  {
                    staticClass: "page-item",
                    attrs: { disabled: _vm.pagination.nextPage ? false : true }
                  },
                  [
                    _c(
                      "a",
                      {
                        staticClass: "page-link",
                        attrs: { href: "#", title: "Suivant" },
                        on: {
                          click: function($event) {
                            return _vm.gotoPage(_vm.pagination.nextPageId)
                          }
                        }
                      },
                      [_c("i", { staticClass: "fas fa-chevron-right" })]
                    )
                  ]
                )
              ],
              2
            )
          ])
        : _vm._e()
    ],
    2
  )
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "col-md-6 text-right" }, [
      _c(
        "a",
        {
          staticClass: "btn btn-success",
          attrs: { href: "/projects/create", title: "Ajouter un projet" }
        },
        [_c("i", { staticClass: "fas fa-plus" }), _vm._v(" Ajouter un projet")]
      )
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("thead", [
      _c("tr", [
        _c("th", [_vm._v("Référence")]),
        _vm._v(" "),
        _c("th", [_vm._v("Nom")]),
        _vm._v(" "),
        _c("th", [_vm._v("Type")]),
        _vm._v(" "),
        _c("th", [_vm._v("Statut")]),
        _vm._v(" "),
        _c("th", [_vm._v("Budget")]),
        _vm._v(" "),
        _c("th", [_vm._v("Heures")]),
        _vm._v(" "),
        _c("th", [_vm._v("Date de création")]),
        _vm._v(" "),
        _c("th", [_vm._v("Modifié le")]),
        _vm._v(" "),
        _c("th")
      ])
    ])
  }
]
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

/***/ "./resources/js/components/ProjectsList.vue":
/*!**************************************************!*\
  !*** ./resources/js/components/ProjectsList.vue ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ProjectsList_vue_vue_type_template_id_0d590823___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ProjectsList.vue?vue&type=template&id=0d590823& */ "./resources/js/components/ProjectsList.vue?vue&type=template&id=0d590823&");
/* harmony import */ var _ProjectsList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ProjectsList.vue?vue&type=script&lang=js& */ "./resources/js/components/ProjectsList.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ProjectsList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ProjectsList_vue_vue_type_template_id_0d590823___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ProjectsList_vue_vue_type_template_id_0d590823___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/ProjectsList.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/ProjectsList.vue?vue&type=script&lang=js&":
/*!***************************************************************************!*\
  !*** ./resources/js/components/ProjectsList.vue?vue&type=script&lang=js& ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ProjectsList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./ProjectsList.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/ProjectsList.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ProjectsList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/ProjectsList.vue?vue&type=template&id=0d590823&":
/*!*********************************************************************************!*\
  !*** ./resources/js/components/ProjectsList.vue?vue&type=template&id=0d590823& ***!
  \*********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ProjectsList_vue_vue_type_template_id_0d590823___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./ProjectsList.vue?vue&type=template&id=0d590823& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/ProjectsList.vue?vue&type=template&id=0d590823&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ProjectsList_vue_vue_type_template_id_0d590823___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ProjectsList_vue_vue_type_template_id_0d590823___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);