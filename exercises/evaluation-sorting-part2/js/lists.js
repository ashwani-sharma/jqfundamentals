var Lists = function (list_collection) {
  this.listArray = [];

  var _this = this;
  list_collection.each(function (index, list) {
    var $list = $(list);
    list = new List($list, $list.find('.row'));
    _this.listArray.push(list);
  });
}

Lists.prototype.init = function () {
  this.listArray.forEach(function (list) {
    var list = list,
        items = list.items,
        container = list.container;

    list.buttons();
    list.displaySortedListItems(container.find($('input[data-id="priority-sort"]')), list, items);
    list.bindEvents(items, list);
  });
}

$(function () {
  var lists = new Lists($('.priority-sort'));
  lists.init();
});