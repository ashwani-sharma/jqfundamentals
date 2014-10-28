var Lists = function (list_collection) {
  var _this = this;
  _this.listArray = [];
  list_collection.each(function (index, list) {
    list = new List($(list));
    _this.listArray.push(list);
  });
}

Lists.prototype.init = function () {
  this.displayInitiallySortedListItems();
  this.bindEvents();
}

Lists.prototype.displayInitiallySortedListItems = function () {
  this.listArray.forEach(function (list) {
    list.sortingByPriority();
    list.displayListItems();
    list.displayInitialCount();
  });
}

Lists.prototype.bindEvents = function () {
  this.bindSeeAllLink();
  this.bindSeeLessLink();
}

Lists.prototype.bindSeeAllLink = function () {
  this.listArray.forEach(function (list) {
    list.list_items.container.on('click', '.see-all', function () {
      list.sortingbyAlphabet();
      list.displayListItems();
      list.showAllListItems();
      $(this).remove();
    });
  });
}

Lists.prototype.bindSeeLessLink = function () {
  this.listArray.forEach(function (list) {
    list.list_items.container.on('click', '.see-less', function () {
      list.sortingByPriority();
      list.displayListItems();
      list.displayInitialCount();
      $(this).remove();
    });
  });
}

$(function () {
  var lists = new Lists($('.priority-sort'));
  lists.init();
});