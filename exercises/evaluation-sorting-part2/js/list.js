var List = function (dom_element) {
  this.list_items = new ListItems(dom_element.find('.row'));
}

List.prototype.displayListItems = function() {
  this.list_items.displayListItem();
}

List.prototype.sortedListItems = function (type, order) {
	this.list_items.sortedListItems(type, order);
}