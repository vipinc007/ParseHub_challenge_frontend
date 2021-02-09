/* globals Chart:false, feather:false */

// (function () {
//   "use strict";

//   feather.replace();
// })();

function ProcessFeatherPlugins() {
  feather.replace();
}

function OpenTheModal(id) {
  $("#" + id).modal({ backdrop: "static", keyboard: false });
}

function ProcessToolTips() {
  $('[data-toggle="tooltip"]').tooltip();
}

