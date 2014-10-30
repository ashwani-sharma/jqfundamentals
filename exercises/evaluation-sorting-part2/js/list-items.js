var ListItems = function (list_items_selector) {
  var _this = this;
  _this.container = list_items_selector.closest('.priority-sort');
  _this.items = [];
  
  list_items_selector.each(function (index, list_item) {
    list_item = new ListItem($(list_item));
    _this.items.push(list_item);
  });
}

ListItems.prototype.displayListItem = function () { 
  var _this = this;
  _this.container.find('li').remove();
  _this.items.forEach(function (item) {
    _this.container.append(item.getDom());
  });
}

ListItems.prototype.sortListItemsByPriority = function () {
  this.items.sort(function (a, b) {
    return a.priority - b.priority;
  });
}

ListItems.prototype.sortListItemsByPriorityDescending = function () {
  this.items.sort(function (a, b) {
    return a.priority - b.priority;
  }).reverse();
}

ListItems.prototype.sortListItemsByAlphabet = function () {
  this.items.sort(function (a, b) {
    return a.text < b.text ? -1 : 1;
  });
}

ListItems.prototype.sortListItemsByAlphabetDescending = function () {
  this.items.sort(function (a, b) {
    return a.text < b.text ? -1 : 1;
  }).reverse();
}

ListItems.prototype.displayInitialListItems = function (count) {
  this.container.find('.row:gt('+ count +')').hide();
  // this.createLink('see-all', 'see all');
}

ListItems.prototype.showAllListItems = function () {
  var _this = this;
  this.container.find('.row:hidden').show();
  this.createLink('see-less', 'see less');
}

ListItems.prototype.createLink = function (className, textNode) {
  $('<li/>').append($('<a/>').attr({'href': 'javascript:', 'class': className }).text(textNode)).appendTo(this.container);
}