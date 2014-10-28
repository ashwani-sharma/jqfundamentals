var List = function (dom_element) {
  this.list_items = new ListItems(dom_element.find('.row'));
}

List.prototype.sortingByPriority = function () {
  this.list_items.sortListItemsByPriority();
}

List.prototype.sortingbyAlphabet = function () {
  this.list_items.sortListItemsByAlphabet();
}

List.prototype.displayListItems = function() {
  this.list_items.displayListItem();
}

List.prototype.displayInitialCount = function () {
  var counter = this.list_items.container.attr('initial-items-count') - 1;
  this.list_items.displayInitialListItems(counter);
}

List.prototype.showAllListItems = function () {
  this.list_items.showAllListItems();
}