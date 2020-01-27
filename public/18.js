(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[18],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Board.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Board.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vuedraggable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vuedraggable */ "./node_modules/vuedraggable/dist/vuedraggable.common.js");
/* harmony import */ var vuedraggable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vuedraggable__WEBPACK_IMPORTED_MODULE_0__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  props: ['type'],
  components: {
    draggable: vuedraggable__WEBPACK_IMPORTED_MODULE_0___default.a
  },
  data: function data() {
    return {
      ajaxUrl: this.type == 'user' ? '/user/board' : '/boards',
      drag: null,
      boards: [],
      projects: [],
      task: null,
      editingTask: null,
      creatingTask: null,
      newTaskName: '',
      newTaskProject: null
    };
  },
  methods: {
    fetch: function fetch() {
      var _this = this;

      axios.get(this.ajaxUrl).then(function (response) {
        _this.boards = response.data.boards;
        _this.projects = response.data.projects;
      });
    },
    createTask: function createTask(event, board) {
      this.creatingTask = board; // Scroll to bottom (to fix)

      var list = $(event.target).parent().parent().find('.list-cards');
      list.scrollTop(list.height());
    },
    storeTask: function storeTask() {
      var _this2 = this;

      if (this.newTaskName !== "") {
        var board = this.creatingTask;
        var name = this.newTaskName;
        var order = board.tasks.length + 100;
        var board_id = board.id;
        var project_id = this.newTaskProject ? this.newTaskProject.id : null;
        axios.post('/task', {
          name: name,
          order: order,
          board_id: board_id,
          project_id: project_id
        }).then(function (response) {
          board.tasks.push(response.data.data);
          _this2.creatingTask = null;
          _this2.newTaskName = '';

          _this2.fetch();
        });
      } else {
        this.creatingTask = null;
      }
    },
    changeOrder: function changeOrder(data) {
      var _this3 = this;

      var task_id = data.item.id;
      var board_id = data.to.id;
      var order = data.newIndex;
      axios.patch("/task/".concat(task_id), {
        order: order,
        board_id: board_id
      }).then(function (response) {
        _this3.fetch();
      });
    },
    endEditing: function endEditing() {
      var _this4 = this;

      axios.patch("/task/".concat(this.editingTask.id), this.editingTask).then(function (response) {
        _this4.fetch();
      });
    },
    editTitle: function editTitle(event) {
      var src = event.target.innerText;
      this.editingTask.name = src;
      this.endEditing();
    },
    archiveTask: function archiveTask() {
      var _this5 = this;

      if (confirm("Voulez-vous vraiment archiver cette carte ?")) {
        axios.get('/task/archive/' + this.editingTask.id).then(function (resp) {
          _this5.fetch();

          $('#editTaskModal').modal('hide');
          _this5.editingTask = null;
        })["catch"](function (error) {
          console.log(error);
        });
      }
    },
    deleteTask: function deleteTask() {
      var _this6 = this;

      if (confirm("Voulez-vous supprimer définitivement cette carte ?")) {
        axios["delete"]('/task/' + this.editingTask.id).then(function (resp) {
          _this6.fetch();

          $('#editTaskModal').modal('hide');
          _this6.editingTask = null;
        })["catch"](function (error) {
          console.log(error);
        });
      }
    },
    updateTag: function updateTag($event) {
      this.editingTask = $event;
      $('#tagsModal').modal('hide');
      this.fetch();
    },
    updateChecklist: function updateChecklist($event) {
      this.fetch();
    }
  },
  mounted: function mounted() {
    this.fetch();
  },
  computed: {
    dragOptions: function dragOptions() {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost"
      };
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Board.vue?vue&type=template&id=7299848b&":
/*!********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Board.vue?vue&type=template&id=7299848b& ***!
  \********************************************************************************************************************************************************************************************************/
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
    _c(
      "div",
      { staticClass: "board" },
      _vm._l(_vm.boards, function(board) {
        return _c("div", { key: board.id, staticClass: "list-wrapper" }, [
          _c("div", { staticClass: "list" }, [
            _c("div", { staticClass: "list-header" }, [
              _vm._v(
                "\n                    " +
                  _vm._s(board.name) +
                  "\n                "
              )
            ]),
            _vm._v(" "),
            _c(
              "div",
              { staticClass: "list-cards" },
              [
                _c(
                  "draggable",
                  _vm._b(
                    {
                      attrs: { tag: "div" },
                      on: {
                        start: function($event) {
                          _vm.drag = true
                        },
                        end: _vm.changeOrder
                      },
                      model: {
                        value: _vm.task,
                        callback: function($$v) {
                          _vm.task = $$v
                        },
                        expression: "task"
                      }
                    },
                    "draggable",
                    _vm.dragOptions,
                    false
                  ),
                  [
                    _c(
                      "transition-group",
                      {
                        attrs: {
                          type: "transition",
                          id: board.id,
                          name: !_vm.drag ? "flip-list" : null
                        }
                      },
                      _vm._l(board.tasks, function(task) {
                        return task
                          ? _c(
                              "a",
                              {
                                key: task.id,
                                staticClass: "list-card",
                                attrs: {
                                  id: task.id,
                                  "data-toggle": "modal",
                                  "data-target": "#editTaskModal"
                                },
                                on: {
                                  click: function($event) {
                                    _vm.editingTask = task
                                  }
                                }
                              },
                              [
                                _c(
                                  "div",
                                  { staticClass: "list-card-details" },
                                  [
                                    _c(
                                      "div",
                                      { staticClass: "list-card-labels" },
                                      [
                                        task.project
                                          ? _c(
                                              "span",
                                              {
                                                staticClass:
                                                  "card-label tag card-label-null"
                                              },
                                              [
                                                _vm._v(
                                                  _vm._s(
                                                    task.project.customer.name
                                                  ) +
                                                    " - " +
                                                    _vm._s(task.project.name)
                                                )
                                              ]
                                            )
                                          : _vm._e(),
                                        _vm._v(" "),
                                        _vm._l(task.tags, function(tag) {
                                          return _c(
                                            "div",
                                            {
                                              staticClass: "card-label tag",
                                              class: "card-label-" + tag.color
                                            },
                                            [_vm._v(_vm._s(tag.label))]
                                          )
                                        })
                                      ],
                                      2
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "div",
                                      { staticClass: "list-card-title" },
                                      [
                                        _vm._v(
                                          "\n                                        " +
                                            _vm._s(task.name) +
                                            "\n                                    "
                                        )
                                      ]
                                    ),
                                    _vm._v(" "),
                                    _c("div", { staticClass: "badges" }, [
                                      task.checklist_total_count
                                        ? _c(
                                            "div",
                                            {
                                              staticClass: "badge badge-success"
                                            },
                                            [
                                              _c("i", {
                                                staticClass:
                                                  "far fa-check-square"
                                              }),
                                              _vm._v(
                                                " " +
                                                  _vm._s(
                                                    task.checklist_checked_count
                                                  ) +
                                                  " / " +
                                                  _vm._s(
                                                    task.checklist_total_count
                                                  ) +
                                                  "\n                                        "
                                              )
                                            ]
                                          )
                                        : _vm._e(),
                                      _vm._v(" "),
                                      task.due_date
                                        ? _c(
                                            "div",
                                            {
                                              staticClass:
                                                "badge badge-default",
                                              attrs: {
                                                title: _vm._f("moment")(
                                                  task.due_date,
                                                  "from",
                                                  "now"
                                                )
                                              }
                                            },
                                            [
                                              _c("i", {
                                                staticClass: "far fa-clock"
                                              }),
                                              _vm._v(
                                                " " +
                                                  _vm._s(
                                                    _vm._f("moment")(
                                                      task.due_date,
                                                      "calendar"
                                                    )
                                                  ) +
                                                  "\n                                        "
                                              )
                                            ]
                                          )
                                        : _vm._e()
                                    ])
                                  ]
                                )
                              ]
                            )
                          : _c(
                              "a",
                              {
                                staticClass: "list-card",
                                staticStyle: { "min-height": "1rem" }
                              },
                              [_c("div", { staticClass: "list-card-details" })]
                            )
                      }),
                      0
                    )
                  ],
                  1
                ),
                _vm._v(" "),
                _vm.creatingTask && _vm.creatingTask.id == board.id
                  ? _c("div", { staticClass: "card-composer" }, [
                      _c("div", { staticClass: "list-card" }, [
                        _c(
                          "div",
                          { staticClass: "list-card-details" },
                          [
                            _c("textarea", {
                              directives: [
                                { name: "focus", rawName: "v-focus" },
                                {
                                  name: "model",
                                  rawName: "v-model",
                                  value: _vm.newTaskName,
                                  expression: "newTaskName"
                                }
                              ],
                              staticClass: "list-card-composer-textarea",
                              attrs: {
                                placeholder:
                                  "Saisissez un titre pour cette carte..."
                              },
                              domProps: { value: _vm.newTaskName },
                              on: {
                                keyup: function($event) {
                                  if (
                                    !$event.type.indexOf("key") &&
                                    _vm._k(
                                      $event.keyCode,
                                      "enter",
                                      13,
                                      $event.key,
                                      "Enter"
                                    )
                                  ) {
                                    return null
                                  }
                                  return _vm.storeTask($event)
                                },
                                input: function($event) {
                                  if ($event.target.composing) {
                                    return
                                  }
                                  _vm.newTaskName = $event.target.value
                                }
                              }
                            }),
                            _vm._v(" "),
                            _c("v-select", {
                              staticClass: "mb-2",
                              attrs: {
                                options: _vm.projects,
                                label: "name",
                                placeholder: "Choisir un projet"
                              },
                              model: {
                                value: _vm.newTaskProject,
                                callback: function($$v) {
                                  _vm.newTaskProject = $$v
                                },
                                expression: "newTaskProject"
                              }
                            }),
                            _vm._v(" "),
                            _c(
                              "button",
                              {
                                staticClass: "btn btn-success mb-2",
                                on: { click: _vm.storeTask }
                              },
                              [_vm._v("Ajouter une carte")]
                            ),
                            _vm._v(" "),
                            _c(
                              "button",
                              {
                                staticClass: "btn btn-secondary mb-2",
                                on: {
                                  click: function($event) {
                                    _vm.creatingTask = null
                                  }
                                }
                              },
                              [_c("i", { staticClass: "fas fa-times" })]
                            )
                          ],
                          1
                        )
                      ])
                    ])
                  : _vm._e()
              ],
              1
            ),
            _vm._v(" "),
            !_vm.creatingTask || _vm.creatingTask.id !== board.id
              ? _c("div", { staticClass: "card-composer-container" }, [
                  _c(
                    "button",
                    {
                      staticClass: "btn btn-board btn-sm",
                      on: {
                        click: function($event) {
                          return _vm.createTask($event, board)
                        }
                      }
                    },
                    [
                      _c("i", { staticClass: "fas fa-plus" }),
                      _vm._v(" Ajouter une autre carte")
                    ]
                  )
                ])
              : _vm._e()
          ])
        ])
      }),
      0
    ),
    _vm._v(" "),
    _vm.editingTask
      ? _c(
          "div",
          {
            staticClass: "modal fade",
            attrs: {
              id: "editTaskModal",
              tabindex: "-1",
              role: "dialog",
              "aria-labelledby": "exampleModalLabel",
              "aria-hidden": "true"
            }
          },
          [
            _c(
              "div",
              {
                staticClass: "modal-dialog modal-md",
                attrs: { role: "document" }
              },
              [
                _c("div", { staticClass: "modal-content" }, [
                  _c("div", { staticClass: "modal-header" }, [
                    _c("h5", {
                      staticClass: "modal-title",
                      attrs: { contenteditable: "" },
                      domProps: { textContent: _vm._s(_vm.editingTask.name) },
                      on: {
                        keydown: function($event) {
                          if (
                            !$event.type.indexOf("key") &&
                            _vm._k(
                              $event.keyCode,
                              "enter",
                              13,
                              $event.key,
                              "Enter"
                            )
                          ) {
                            return null
                          }
                          $event.preventDefault()
                          return _vm.editTitle($event)
                        },
                        blur: _vm.editTitle
                      }
                    }),
                    _vm._v(" "),
                    _vm._m(0)
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "modal-body" }, [
                    _c("div", { staticClass: "row" }, [
                      _c(
                        "div",
                        { staticClass: "col-md-8 mb-3" },
                        [
                          _vm._m(1),
                          _vm._v(" "),
                          _c("v-select", {
                            staticClass: "mb-2",
                            attrs: {
                              options: _vm.projects,
                              reduce: function(name) {
                                return name.id
                              },
                              label: "name",
                              placeholder: "Choisir un projet"
                            },
                            on: { input: _vm.endEditing },
                            model: {
                              value: _vm.editingTask.project_id,
                              callback: function($$v) {
                                _vm.$set(_vm.editingTask, "project_id", $$v)
                              },
                              expression: "editingTask.project_id"
                            }
                          }),
                          _vm._v(" "),
                          _vm._m(2),
                          _vm._v(" "),
                          _c(
                            "textarea-autosize",
                            {
                              staticClass: "form-control description-content",
                              attrs: {
                                placeholder:
                                  "Ajouter une description plus détaillée..."
                              },
                              nativeOn: {
                                blur: function($event) {
                                  return _vm.endEditing($event)
                                }
                              },
                              model: {
                                value: _vm.editingTask.description,
                                callback: function($$v) {
                                  _vm.$set(_vm.editingTask, "description", $$v)
                                },
                                expression: "editingTask.description"
                              }
                            },
                            [_vm._v(_vm._s(_vm.editingTask.description))]
                          ),
                          _vm._v(" "),
                          _vm._m(3),
                          _vm._v(" "),
                          _c("task-checklists", {
                            key: _vm.editingTask.id,
                            attrs: { task: _vm.editingTask },
                            on: { "update:checklist": _vm.updateChecklist }
                          })
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "div",
                        { staticClass: "col-md-4" },
                        [
                          _vm._m(4),
                          _vm._v(" "),
                          _vm._l(_vm.editingTask.tags, function(tag) {
                            return _c(
                              "button",
                              {
                                staticClass: "btn btn-block card-label",
                                class: "card-label-" + tag.color,
                                attrs: {
                                  "data-toggle": "modal",
                                  "data-target": "#tagsModal"
                                }
                              },
                              [
                                _vm._v(
                                  "\n                        " +
                                    _vm._s(tag.label) +
                                    "\n                    "
                                )
                              ]
                            )
                          }),
                          _vm._v(" "),
                          _c("hr"),
                          _vm._v(" "),
                          _c("h6", [_vm._v("Date limite")]),
                          _vm._v(" "),
                          _c("datetime", {
                            attrs: {
                              type: "datetime",
                              "minute-interval": "15",
                              "no-weekends-days": "",
                              noLabel: "",
                              format: "YYYY-MM-DD HH:mm:ss"
                            },
                            on: { validate: _vm.endEditing },
                            model: {
                              value: _vm.editingTask.due_date,
                              callback: function($$v) {
                                _vm.$set(_vm.editingTask, "due_date", $$v)
                              },
                              expression: "editingTask.due_date"
                            }
                          }),
                          _vm._v(" "),
                          _vm.editingTask.project
                            ? [
                                _c("hr"),
                                _vm._v(" "),
                                _c("h6", [_vm._v("Chronomètre")]),
                                _vm._v(" "),
                                _c("chronometer", {
                                  key: _vm.editingTask.id,
                                  attrs: { task: _vm.editingTask }
                                })
                              ]
                            : _vm._e(),
                          _vm._v(" "),
                          _c("hr"),
                          _vm._v(" "),
                          _c(
                            "button",
                            {
                              staticClass:
                                "btn btn-block text-left btn-secondary",
                              on: { click: _vm.archiveTask }
                            },
                            [
                              _c("i", { staticClass: "fas fa-archive" }),
                              _vm._v(" Archiver")
                            ]
                          ),
                          _vm._v(" "),
                          _c(
                            "button",
                            {
                              staticClass: "btn btn-block text-left btn-danger",
                              on: { click: _vm.deleteTask }
                            },
                            [
                              _c("i", { staticClass: "fas fa-trash" }),
                              _vm._v(" Supprimer")
                            ]
                          )
                        ],
                        2
                      )
                    ])
                  ])
                ])
              ]
            )
          ]
        )
      : _vm._e(),
    _vm._v(" "),
    _vm.editingTask
      ? _c(
          "div",
          {
            staticClass: "modal",
            attrs: {
              id: "tagsModal",
              tabindex: "-1",
              role: "dialog",
              "aria-hidden": "true",
              "data-backdrop": "false"
            }
          },
          [
            _c(
              "div",
              {
                staticClass: "modal-dialog modal-sm",
                attrs: { role: "document" }
              },
              [
                _c(
                  "div",
                  { staticClass: "modal-content" },
                  [
                    _c("tags", {
                      attrs: { task: _vm.editingTask },
                      on: { "update:task": _vm.updateTag }
                    })
                  ],
                  1
                )
              ]
            )
          ]
        )
      : _vm._e()
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "button",
      {
        staticClass: "close",
        attrs: {
          type: "button",
          "data-dismiss": "modal",
          "aria-label": "Close"
        }
      },
      [_c("span", { attrs: { "aria-hidden": "true" } }, [_vm._v("×")])]
    )
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("h4", [
      _c("i", { staticClass: "far fa-folder-open" }),
      _vm._v(" Projet")
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("h4", [
      _c("i", { staticClass: "fas fa-align-left" }),
      _vm._v(" Description")
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("h4", [
      _c("i", { staticClass: "fas fa-tasks" }),
      _vm._v(" Checklist")
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "button",
      {
        staticClass: "btn btn-block text-left btn-secondary",
        attrs: { "data-toggle": "modal", "data-target": "#tagsModal" }
      },
      [_c("i", { staticClass: "fas fa-tag" }), _vm._v(" Étiquettes")]
    )
  }
]
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/Board.vue":
/*!*******************************************!*\
  !*** ./resources/js/components/Board.vue ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Board_vue_vue_type_template_id_7299848b___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Board.vue?vue&type=template&id=7299848b& */ "./resources/js/components/Board.vue?vue&type=template&id=7299848b&");
/* harmony import */ var _Board_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Board.vue?vue&type=script&lang=js& */ "./resources/js/components/Board.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Board_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Board_vue_vue_type_template_id_7299848b___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Board_vue_vue_type_template_id_7299848b___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/Board.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/Board.vue?vue&type=script&lang=js&":
/*!********************************************************************!*\
  !*** ./resources/js/components/Board.vue?vue&type=script&lang=js& ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Board_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./Board.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Board.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Board_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/Board.vue?vue&type=template&id=7299848b&":
/*!**************************************************************************!*\
  !*** ./resources/js/components/Board.vue?vue&type=template&id=7299848b& ***!
  \**************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Board_vue_vue_type_template_id_7299848b___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./Board.vue?vue&type=template&id=7299848b& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Board.vue?vue&type=template&id=7299848b&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Board_vue_vue_type_template_id_7299848b___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Board_vue_vue_type_template_id_7299848b___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);