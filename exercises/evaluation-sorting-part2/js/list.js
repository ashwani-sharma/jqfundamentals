var List = function (dom_element) {
  this.list_items = new ListItems(dom_element.find('.row'));
}

List.prototype.displayListItems = function(length, condition, textNode, counter) {
  this.list_items.displayListItem(length, condition, textNode, counter);
}

List.prototype.sortedListItems = function (type, order) {
	this.list_items.sortedListItems(type, order);
}

List.prototype.createAndDisplayLastLink = function (textNode, counter) {
  this.createAndDisplayLastLink(textNode, counter);
}