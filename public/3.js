(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[3],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/accounts/CreateDoc.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/accounts/CreateDoc.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************/
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
  props: {
    type: {
      "default": "estimate"
    },
    file: {
      "default": false
    },
    doc_ref: {
      "default": ''
    },
    doc: {
      defaut: null
    }
  },
  data: function data() {
    return {
      settings: window.settings,
      customers: [],
      currency: '€',
      invoice: {
        items: []
      }
    };
  },
  mounted: function mounted() {
    var _this = this;

    this.getCustomers();

    if (this.doc) {
      axios.get('/docs/' + this.doc.id).then(function (response) {
        _this.invoice = response.data;
      });
    } else {
      this.invoice = {
        title: this.file.title,
        customer: this.file.project.customer,
        project_id: this.file.project.id,
        project_file_id: this.file.id,
        status_id: 1,
        project_ref: this.file.project.ref,
        type: this.type,
        ref: this.doc_ref,
        comments: "",
        date: moment().format('YYYY-MM-DD'),
        expire_at: moment().add(1, 'M').format('YYYY-MM-DD'),
        total: 0,
        discount: 0,
        tva: 0,
        items: [{
          ref: "",
          unit: "U",
          description: "",
          quantity: 1,
          price: 0,
          tva: "20.00",
          discount: 0
        }]
      };
    }
  },
  computed: {
    total: {
      get: function get() {
        return this.invoice.items.reduce(function (acc, item) {
          return acc + item.price * item.quantity * (1 - item.discount / 100);
        }, 0);
      }
    },
    discount: {
      get: function get() {
        return this.invoice.items.reduce(function (acc, item) {
          return acc + item.price * item.quantity * (item.discount / 100);
        }, 0);
      }
    },
    tva: {
      get: function get() {
        return this.invoice.items.reduce(function (acc, item) {
          return acc + item.price * item.quantity * (1 - item.discount / 100) * (item.tva / 100);
        }, 0);
      }
    }
  },
  watch: {
    total: function total(_total) {
      this.invoice.total = _total;
    },
    discount: function discount(_discount) {
      this.invoice.discount = _discount;
    },
    tva: function tva(_tva) {
      this.invoice.tva = _tva;
    }
  },
  methods: {
    getCustomers: function getCustomers() {
      var _this2 = this;

      var search = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

      if (search == '') {
        axios.get('/customers').then(function (response) {
          _this2.customers = response.data.data;
        });
      } else {
        axios.get('/customers?q=' + search).then(function (response) {
          _this2.customers = response.data.data;
        });
      }
    },
    addItem: function addItem() {
      this.invoice.items.push({
        ref: "",
        unit: "U",
        description: "",
        quantity: 1,
        price: 0,
        tva: "20.00",
        discount: 0
      });
    },
    removeItem: function removeItem(index) {
      this.invoice.items.splice(index, 1);
    },
    updateExpiration: function updateExpiration() {
      this.invoice.expire_at = moment(this.invoice.created_at).add(1, 'M').format('YYYY-MM-DD');
    },
    storeDoc: function storeDoc() {
      axios.post('/docs', this.invoice).then(function (response) {
        var doc = response.data;
        window.location.href = "/docs/" + doc.id + "/edit";
      });
    },
    updateDoc: function updateDoc() {
      axios.patch('/docs/' + this.doc.id, this.invoice).then(function (response) {
        console.log(response.data);
      });
    },
    deleteDoc: function deleteDoc() {
      axios["delete"]('/docs/' + this.doc.id);
      window.location.href = "/accounts";
    }
  },
  filters: {
    rounded: function rounded(value) {
      return value.toFixed(2);
    }
  }
});

/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/accounts/CreateDoc.vue?vue&type=style&index=0&id=b4bca0c4&scoped=true&lang=css&":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/accounts/CreateDoc.vue?vue&type=style&index=0&id=b4bca0c4&scoped=true&lang=css& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\ntextarea[data-v-b4bca0c4] {\n\twidth: 100%;\n\tpadding: 8px 13px;\n\ttext-align: left;\n\tbackground: transparent;\n\tborder: none;\n\tbox-sizing: border-box;\n\tborder-radius: 5px;\n\tfont-style: normal;\n\tfont-weight: 500;\n\tfont-size: 14px;\n\tline-height: 21px;\n\tresize: none;\n}\n\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/accounts/CreateDoc.vue?vue&type=style&index=0&id=b4bca0c4&scoped=true&lang=css&":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/accounts/CreateDoc.vue?vue&type=style&index=0&id=b4bca0c4&scoped=true&lang=css& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../node_modules/css-loader??ref--6-1!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--6-2!../../../../node_modules/vue-loader/lib??vue-loader-options!./CreateDoc.vue?vue&type=style&index=0&id=b4bca0c4&scoped=true&lang=css& */ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/accounts/CreateDoc.vue?vue&type=style&index=0&id=b4bca0c4&scoped=true&lang=css&");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/accounts/CreateDoc.vue?vue&type=template&id=b4bca0c4&scoped=true&":
/*!*********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/accounts/CreateDoc.vue?vue&type=template&id=b4bca0c4&scoped=true& ***!
  \*********************************************************************************************************************************************************************************************************************************/
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
      _c("div", { staticClass: "col-md-6" }, [
        _vm.invoice.project_ref
          ? _c(
              "a",
              {
                staticClass: "btn btn-primary",
                attrs: { href: "/projects/" + _vm.invoice.project_id + "/edit" }
              },
              [
                _c("i", { staticClass: "fas fa-chevron-left" }),
                _vm._v(" Retour au projet")
              ]
            )
          : _vm._e(),
        _vm._v(" "),
        _c(
          "a",
          { staticClass: "btn btn-primary", attrs: { href: "/accounts" } },
          [_vm._v("Retour à la comptabilité")]
        )
      ]),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "col-md-6 text-right" },
        [
          _vm.doc
            ? [
                _c(
                  "button",
                  {
                    staticClass: "btn btn-primary",
                    on: { click: _vm.updateDoc }
                  },
                  [
                    _c("i", { staticClass: "fas fa-save" }),
                    _vm._v(" Mettre à jour")
                  ]
                ),
                _vm._v(" "),
                _c(
                  "a",
                  {
                    staticClass: "btn btn-primary",
                    attrs: { href: "/docs/" + _vm.invoice.id }
                  },
                  [
                    _c("i", { staticClass: "fas fa-eye" }),
                    _vm._v(" Visualiser")
                  ]
                ),
                _vm._v(" "),
                _c(
                  "button",
                  {
                    staticClass: "btn btn-success",
                    on: { click: _vm.updateDoc }
                  },
                  [
                    _c("i", { staticClass: "fas fa-lock" }),
                    _vm._v(" Valider pour envoi")
                  ]
                ),
                _vm._v(" "),
                _c(
                  "button",
                  {
                    staticClass: "btn btn-danger",
                    on: { click: _vm.deleteDoc }
                  },
                  [
                    _c("i", { staticClass: "fas fa-trash" }),
                    _vm._v(" Supprimer")
                  ]
                )
              ]
            : [
                _c(
                  "button",
                  {
                    staticClass: "btn btn-primary",
                    on: { click: _vm.storeDoc }
                  },
                  [
                    _c("i", { staticClass: "fas fa-save" }),
                    _vm._v(" Enregistrer")
                  ]
                )
              ]
        ],
        2
      )
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "card p-4 mb-3" }, [
      _c("div", { staticClass: "row mb-3 d-flex align-items-center" }, [
        _c(
          "div",
          { staticClass: "col-md-6 p-4" },
          [
            _vm.type === "invoice"
              ? _c(
                  "button",
                  { staticClass: "btn btn-block btn-secondary mb-4" },
                  [_vm._v("FACTURE")]
                )
              : _c(
                  "button",
                  { staticClass: "btn btn-block btn-secondary mb-4" },
                  [_vm._v("DEVIS")]
                ),
            _vm._v(" "),
            _vm.invoice.customer
              ? _c("div", { staticClass: "row" }, [
                  _c("div", { staticClass: "col-1" }, [
                    _c(
                      "button",
                      {
                        staticClass: "btn btn-sm btn-secondary",
                        on: {
                          click: function($event) {
                            _vm.invoice.customer = null
                          }
                        }
                      },
                      [_c("i", { staticClass: "fas fa-times" })]
                    )
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "col-11" }, [
                    _vm._v(
                      "\n            \t\t\t" + _vm._s(_vm.invoice.customer.name)
                    ),
                    _c("br"),
                    _vm._v(
                      "\n\t            \t\t" +
                        _vm._s(_vm.invoice.customer.street)
                    ),
                    _c("br"),
                    _vm._v(
                      "\n\t            \t\t" +
                        _vm._s(_vm.invoice.customer.zip_code) +
                        " " +
                        _vm._s(_vm.invoice.customer.city) +
                        "\n\t            \t"
                    )
                  ])
                ])
              : _c("v-select", {
                  staticClass: "btn btn-block btn-lg p-4 btn-secondary",
                  attrs: {
                    options: _vm.customers,
                    label: "name",
                    placeholder: "Sélectionner un client"
                  },
                  on: { search: _vm.getCustomers },
                  model: {
                    value: _vm.invoice.customer,
                    callback: function($$v) {
                      _vm.$set(_vm.invoice, "customer", $$v)
                    },
                    expression: "invoice.customer"
                  }
                })
          ],
          1
        ),
        _vm._v(" "),
        _c("div", { staticClass: "col-md-6" }, [
          _c("div", { staticClass: "row mb-3" }, [
            _c("div", { staticClass: "col-md-6" }, [
              _c("label", { staticClass: "mr-2" }, [_vm._v("Date : ")]),
              _vm._v(" "),
              _c("div", { staticClass: "input-group" }, [
                _vm._m(0),
                _vm._v(" "),
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.invoice.date,
                      expression: "invoice.date"
                    }
                  ],
                  staticClass: "form-control",
                  attrs: { type: "date" },
                  domProps: { value: _vm.invoice.date },
                  on: {
                    change: _vm.updateExpiration,
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.$set(_vm.invoice, "date", $event.target.value)
                    }
                  }
                })
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "col-md-6" }, [
              _c("label", { staticClass: "mr-2" }, [_vm._v("Date limite : ")]),
              _vm._v(" "),
              _c("div", { staticClass: "input-group" }, [
                _vm._m(1),
                _vm._v(" "),
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.invoice.expire_at,
                      expression: "invoice.expire_at"
                    }
                  ],
                  staticClass: "form-control",
                  attrs: { type: "date" },
                  domProps: { value: _vm.invoice.expire_at },
                  on: {
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.$set(_vm.invoice, "expire_at", $event.target.value)
                    }
                  }
                })
              ])
            ])
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "row mb-3" }, [
            _c("div", { staticClass: "col-md-6" }, [
              _c("label", { staticClass: "mr-2" }, [
                _vm._v("Numéro de facture : ")
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "input-group" }, [
                _vm._m(2),
                _vm._v(" "),
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.invoice.ref,
                      expression: "invoice.ref"
                    }
                  ],
                  staticClass: "form-control",
                  attrs: { type: "text" },
                  domProps: { value: _vm.invoice.ref },
                  on: {
                    change: _vm.updateExpiration,
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.$set(_vm.invoice, "ref", $event.target.value)
                    }
                  }
                })
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "col-md-6" }, [
              _c("label", { staticClass: "mr-2" }, [
                _vm._v("Référence projet : ")
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "input-group" }, [
                _vm._m(3),
                _vm._v(" "),
                _vm.invoice.project_ref
                  ? _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.invoice.project_ref,
                          expression: "invoice.project_ref"
                        }
                      ],
                      staticClass: "form-control",
                      attrs: { type: "text" },
                      domProps: { value: _vm.invoice.project_ref },
                      on: {
                        input: function($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.$set(
                            _vm.invoice,
                            "project_ref",
                            $event.target.value
                          )
                        }
                      }
                    })
                  : _c("input", {
                      staticClass: "form-control",
                      attrs: { type: "text", readonly: "" }
                    })
              ])
            ])
          ])
        ])
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "row" }, [
        _c("div", { staticClass: "col-md-12" }, [
          _c("div", { staticClass: "input-group mb-3" }, [
            _vm._m(4),
            _vm._v(" "),
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.invoice.title,
                  expression: "invoice.title"
                }
              ],
              staticClass: "form-control",
              attrs: { required: "" },
              domProps: { value: _vm.invoice.title },
              on: {
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.$set(_vm.invoice, "title", $event.target.value)
                }
              }
            })
          ])
        ])
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "table-responsive" }, [
        _c("table", { staticClass: "table table-striped" }, [
          _vm._m(5),
          _vm._v(" "),
          _vm._m(6),
          _vm._v(" "),
          _c(
            "tbody",
            _vm._l(_vm.invoice.items, function(item, index) {
              return _c("tr", [
                _c("td", [
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: item.ref,
                        expression: "item.ref"
                      }
                    ],
                    staticClass: "form-control mb-2",
                    attrs: {
                      placeholder: "Référence du produit",
                      required: ""
                    },
                    domProps: { value: item.ref },
                    on: {
                      input: function($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.$set(item, "ref", $event.target.value)
                      }
                    }
                  }),
                  _vm._v(" "),
                  _c("textarea", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: item.description,
                        expression: "item.description"
                      }
                    ],
                    staticClass: "form-control",
                    attrs: {
                      placeholder: "Description du produit (facultatif)"
                    },
                    domProps: { value: item.description },
                    on: {
                      input: function($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.$set(item, "description", $event.target.value)
                      }
                    }
                  })
                ]),
                _vm._v(" "),
                _c("td", [
                  _c(
                    "select",
                    {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: item.unit,
                          expression: "item.unit"
                        }
                      ],
                      staticClass: "form-control",
                      on: {
                        change: function($event) {
                          var $$selectedVal = Array.prototype.filter
                            .call($event.target.options, function(o) {
                              return o.selected
                            })
                            .map(function(o) {
                              var val = "_value" in o ? o._value : o.value
                              return val
                            })
                          _vm.$set(
                            item,
                            "unit",
                            $event.target.multiple
                              ? $$selectedVal
                              : $$selectedVal[0]
                          )
                        }
                      }
                    },
                    [
                      _c("option", { attrs: { value: "H" } }, [
                        _vm._v("Heure")
                      ]),
                      _vm._v(" "),
                      _c("option", { attrs: { value: "J" } }, [_vm._v("Jour")]),
                      _vm._v(" "),
                      _c("option", { attrs: { value: "F" } }, [
                        _vm._v("Forfait")
                      ]),
                      _vm._v(" "),
                      _c("option", { attrs: { value: "U" } }, [
                        _vm._v("Unité")
                      ]),
                      _vm._v(" "),
                      _c("option", { attrs: { value: "Kg" } }, [_vm._v("Kg")])
                    ]
                  )
                ]),
                _vm._v(" "),
                _c("td", [
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: item.quantity,
                        expression: "item.quantity"
                      }
                    ],
                    staticClass: "form-control",
                    attrs: { type: "number", step: "any" },
                    domProps: { value: item.quantity },
                    on: {
                      input: function($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.$set(item, "quantity", $event.target.value)
                      }
                    }
                  })
                ]),
                _vm._v(" "),
                _c("td", [
                  _c("div", { staticClass: "input-group" }, [
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: item.price,
                          expression: "item.price"
                        }
                      ],
                      staticClass: "form-control",
                      attrs: { type: "number", step: "any" },
                      domProps: { value: item.price },
                      on: {
                        input: function($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.$set(item, "price", $event.target.value)
                        }
                      }
                    }),
                    _vm._v(" "),
                    _c("div", { staticClass: "input-group-append" }, [
                      _c("span", { staticClass: "input-group-text" }, [
                        _vm._v(_vm._s(_vm.currency))
                      ])
                    ])
                  ])
                ]),
                _vm._v(" "),
                _c("td", [
                  _c(
                    "select",
                    {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: item.tva,
                          expression: "item.tva"
                        }
                      ],
                      staticClass: "form-control",
                      on: {
                        change: function($event) {
                          var $$selectedVal = Array.prototype.filter
                            .call($event.target.options, function(o) {
                              return o.selected
                            })
                            .map(function(o) {
                              var val = "_value" in o ? o._value : o.value
                              return val
                            })
                          _vm.$set(
                            item,
                            "tva",
                            $event.target.multiple
                              ? $$selectedVal
                              : $$selectedVal[0]
                          )
                        }
                      }
                    },
                    [
                      _c("option", { attrs: { value: "20.00" } }, [
                        _vm._v("20%")
                      ]),
                      _vm._v(" "),
                      _c("option", { attrs: { value: "10.00" } }, [
                        _vm._v("10%")
                      ]),
                      _vm._v(" "),
                      _c("option", { attrs: { value: "5.50" } }, [
                        _vm._v("5,5%")
                      ]),
                      _vm._v(" "),
                      _c("option", { attrs: { value: "00.00" } }, [
                        _vm._v("0%")
                      ])
                    ]
                  )
                ]),
                _vm._v(" "),
                _c("td", [
                  _c("div", { staticClass: "input-group" }, [
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: item.discount,
                          expression: "item.discount"
                        }
                      ],
                      staticClass: "form-control",
                      attrs: { type: "number" },
                      domProps: { value: item.discount },
                      on: {
                        input: function($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.$set(item, "discount", $event.target.value)
                        }
                      }
                    }),
                    _vm._v(" "),
                    _vm._m(7, true)
                  ])
                ]),
                _vm._v(" "),
                _c("td", [
                  _c("strong", [
                    _vm._v(
                      _vm._s(
                        _vm._f("rounded")(
                          item.price * item.quantity * (1 - item.discount / 100)
                        )
                      ) +
                        " " +
                        _vm._s(_vm.currency)
                    )
                  ]),
                  _c("br"),
                  _vm._v(" "),
                  _c("small", [
                    _vm._v(
                      _vm._s(
                        _vm._f("rounded")(
                          item.price *
                            item.quantity *
                            (1 - item.discount / 100) +
                            (item.price *
                              item.quantity *
                              (1 - item.discount / 100) *
                              item.tva) /
                              100
                        )
                      ) +
                        " " +
                        _vm._s(_vm.currency) +
                        " TTC"
                    )
                  ])
                ]),
                _vm._v(" "),
                _c("td", [
                  _c(
                    "button",
                    {
                      staticClass: "btn btn-default",
                      on: {
                        click: function($event) {
                          return _vm.removeItem(index)
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
        ])
      ]),
      _vm._v(" "),
      _c(
        "button",
        { staticClass: "btn btn-block btn-info", on: { click: _vm.addItem } },
        [_c("i", { staticClass: "fas fa-plus" }), _vm._v(" Ajouter une ligne")]
      ),
      _vm._v(" "),
      _c("div", { staticClass: "row mt-5 mb-3 d-flex align-items-center" }, [
        _c("div", { staticClass: "col-md-8" }, [
          _c("textarea", {
            directives: [
              {
                name: "model",
                rawName: "v-model",
                value: _vm.invoice.comments,
                expression: "invoice.comments"
              }
            ],
            staticClass: "form-control",
            attrs: { placeholder: "Ajouter une note" },
            domProps: { value: _vm.invoice.comments },
            on: {
              input: function($event) {
                if ($event.target.composing) {
                  return
                }
                _vm.$set(_vm.invoice, "comments", $event.target.value)
              }
            }
          })
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "col-md-4" }, [
          _c("table", { staticClass: "table" }, [
            _c("tr", [
              _c("td", [
                _vm._v(
                  "Total HT : " +
                    _vm._s(_vm._f("rounded")(_vm.total + _vm.discount)) +
                    " " +
                    _vm._s(_vm.currency)
                )
              ])
            ]),
            _vm._v(" "),
            _vm.discount
              ? _c("tr", [
                  _c("td", [
                    _vm._v(
                      "Remise : " +
                        _vm._s(_vm._f("rounded")(_vm.discount)) +
                        " " +
                        _vm._s(_vm.currency)
                    )
                  ])
                ])
              : _vm._e(),
            _vm._v(" "),
            _vm.discount
              ? _c("tr", [
                  _c("td", [
                    _vm._v(
                      "Total HT avec remise : " +
                        _vm._s(_vm._f("rounded")(_vm.total)) +
                        " " +
                        _vm._s(_vm.currency)
                    )
                  ])
                ])
              : _vm._e(),
            _vm._v(" "),
            _c("tr", [
              _c("td", [
                _vm._v(
                  "Total TVA : " +
                    _vm._s(_vm._f("rounded")(_vm.tva)) +
                    " " +
                    _vm._s(_vm.currency)
                )
              ])
            ]),
            _vm._v(" "),
            _c("tr", [
              _c("th", [
                _vm._v(
                  "TOTAL TTC en euros : " +
                    _vm._s(_vm._f("rounded")(_vm.total + _vm.tva)) +
                    " " +
                    _vm._s(_vm.currency)
                )
              ])
            ])
          ])
        ])
      ])
    ])
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "input-group-prepend" }, [
      _c(
        "span",
        { staticClass: "input-group-text", attrs: { id: "basic-addon1" } },
        [_c("i", { staticClass: "far fa-calendar-alt" })]
      )
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "input-group-prepend" }, [
      _c(
        "span",
        { staticClass: "input-group-text", attrs: { id: "basic-addon1" } },
        [_c("i", { staticClass: "far fa-calendar-alt" })]
      )
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "input-group-prepend" }, [
      _c(
        "span",
        { staticClass: "input-group-text", attrs: { id: "basic-addon1" } },
        [_c("i", { staticClass: "fas fa-hashtag" })]
      )
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "input-group-prepend" }, [
      _c(
        "span",
        { staticClass: "input-group-text", attrs: { id: "basic-addon1" } },
        [_c("i", { staticClass: "far fa-user" })]
      )
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "input-group-prepend" }, [
      _c("span", { staticClass: "input-group-text" }, [_vm._v("Objet")])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("colgroup", [
      _c("col", { staticStyle: { width: "35%" } }),
      _vm._v(" "),
      _c("col", { staticStyle: { width: "10%" } }),
      _vm._v(" "),
      _c("col", { staticStyle: { width: "10%" } }),
      _vm._v(" "),
      _c("col", { staticStyle: { width: "15%" } }),
      _vm._v(" "),
      _c("col", { staticStyle: { width: "10%" } }),
      _vm._v(" "),
      _c("col", { staticStyle: { width: "10%" } }),
      _vm._v(" "),
      _c("col", { staticStyle: { width: "10%" } })
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("thead", [
      _c("tr", [
        _c("th", [_vm._v("Produit")]),
        _vm._v(" "),
        _c("th", [_vm._v("Unité")]),
        _vm._v(" "),
        _c("th", [_vm._v("Qté")]),
        _vm._v(" "),
        _c("th", [_vm._v("Prix")]),
        _vm._v(" "),
        _c("th", [_vm._v("TVA")]),
        _vm._v(" "),
        _c("th", [_vm._v("Remise")]),
        _vm._v(" "),
        _c("th", [_vm._v("Total H.T")]),
        _vm._v(" "),
        _c("th")
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "input-group-append" }, [
      _c("span", { staticClass: "input-group-text" }, [_vm._v("%")])
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

/***/ "./resources/js/components/accounts/CreateDoc.vue":
/*!********************************************************!*\
  !*** ./resources/js/components/accounts/CreateDoc.vue ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _CreateDoc_vue_vue_type_template_id_b4bca0c4_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CreateDoc.vue?vue&type=template&id=b4bca0c4&scoped=true& */ "./resources/js/components/accounts/CreateDoc.vue?vue&type=template&id=b4bca0c4&scoped=true&");
/* harmony import */ var _CreateDoc_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CreateDoc.vue?vue&type=script&lang=js& */ "./resources/js/components/accounts/CreateDoc.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _CreateDoc_vue_vue_type_style_index_0_id_b4bca0c4_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CreateDoc.vue?vue&type=style&index=0&id=b4bca0c4&scoped=true&lang=css& */ "./resources/js/components/accounts/CreateDoc.vue?vue&type=style&index=0&id=b4bca0c4&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _CreateDoc_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _CreateDoc_vue_vue_type_template_id_b4bca0c4_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _CreateDoc_vue_vue_type_template_id_b4bca0c4_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "b4bca0c4",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/accounts/CreateDoc.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/accounts/CreateDoc.vue?vue&type=script&lang=js&":
/*!*********************************************************************************!*\
  !*** ./resources/js/components/accounts/CreateDoc.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CreateDoc_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./CreateDoc.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/accounts/CreateDoc.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CreateDoc_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/accounts/CreateDoc.vue?vue&type=style&index=0&id=b4bca0c4&scoped=true&lang=css&":
/*!*****************************************************************************************************************!*\
  !*** ./resources/js/components/accounts/CreateDoc.vue?vue&type=style&index=0&id=b4bca0c4&scoped=true&lang=css& ***!
  \*****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_CreateDoc_vue_vue_type_style_index_0_id_b4bca0c4_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader!../../../../node_modules/css-loader??ref--6-1!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--6-2!../../../../node_modules/vue-loader/lib??vue-loader-options!./CreateDoc.vue?vue&type=style&index=0&id=b4bca0c4&scoped=true&lang=css& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/accounts/CreateDoc.vue?vue&type=style&index=0&id=b4bca0c4&scoped=true&lang=css&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_CreateDoc_vue_vue_type_style_index_0_id_b4bca0c4_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_CreateDoc_vue_vue_type_style_index_0_id_b4bca0c4_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_CreateDoc_vue_vue_type_style_index_0_id_b4bca0c4_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_CreateDoc_vue_vue_type_style_index_0_id_b4bca0c4_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_CreateDoc_vue_vue_type_style_index_0_id_b4bca0c4_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./resources/js/components/accounts/CreateDoc.vue?vue&type=template&id=b4bca0c4&scoped=true&":
/*!***************************************************************************************************!*\
  !*** ./resources/js/components/accounts/CreateDoc.vue?vue&type=template&id=b4bca0c4&scoped=true& ***!
  \***************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CreateDoc_vue_vue_type_template_id_b4bca0c4_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./CreateDoc.vue?vue&type=template&id=b4bca0c4&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/accounts/CreateDoc.vue?vue&type=template&id=b4bca0c4&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CreateDoc_vue_vue_type_template_id_b4bca0c4_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CreateDoc_vue_vue_type_template_id_b4bca0c4_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);