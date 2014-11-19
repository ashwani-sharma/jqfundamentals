var Lists = function (list_collection) {
  this.listArray = [];

  var _this = this;
  list_collection.each(function (index, list) {
    var $list = $(list);
    list = new List($list);
    _this.listArray.push(list);
  });
}

Lists.prototype.init = function () {
  this.listArray.forEach(function (list) {
    list.displaySortingButtons();
    list.displaySortedListItems();
    list.bindEvents();
  });
}

$(function () {
  var lists = new Lists($('.priority-sort'));
  lists.init();
});