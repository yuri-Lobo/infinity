$(document).ready(function() {
  $("#basicTree").jstree({
    core: { themes: { responsive: !1 } },
    types: { default: { icon: "mdi mdi-folder-star text-warning" }, file: { icon: "mdi mdi-file text-primary" } },
    plugins: ["types"]
  }),
    $("#checkTree").jstree({
      core: { themes: { responsive: !1 } },
      types: { default: { icon: "fa fa-folder text-warning" }, file: { icon: "fa fa-file text-primary" } },
      plugins: ["types", "checkbox"]
    }),
    $("#dragTree").jstree({
      core: { check_callback: !0, themes: { responsive: !1 } },
      types: { default: { icon: "fa fa-folder text-warning" }, file: { icon: "fa fa-file text-primary" } },
      plugins: ["types", "dnd"]
    }),
    $("#ajaxTree").jstree({
      core: {
        check_callback: !0,
        themes: { responsive: !1 },
        data: {
          url: function(e) {
            return "#" === e.id ? "assets/data/ajax_roots.json" : "assets/data/ajax_children.json";
          },
          data: function(e) {
            return { id: e.id };
          }
        }
      },
      types: { default: { icon: "fa fa-folder text-warning" }, file: { icon: "fa fa-file text-primary" } },
      plugins: ["contextmenu", "dnd", "search", "state", "types", "wholerow"]
    })
});
