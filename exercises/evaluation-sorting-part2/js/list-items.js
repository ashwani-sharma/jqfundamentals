var ListItems = function (list_items_selector) {
  var _this = this;
  _this.container = list_items_selector.closest('.priority-sort');
  _this.items = [];
  
  list_items_selector.each(function (index, list_item) {
    list_item = new ListItem($(list_item));
    _this.items.push(list_item);
  });
}

ListItems.prototype.displayListItem = function (length, condition, textNode, counter) { 
  var _this = this,
      i = 0;
  _this.container.find('li').remove();
  _this.items.forEach(function (item) {
    if(i < condition) {
      _this.container.append(item.getDom());
    }
    i++
  });
  length = i;
  _this.createAndDisplayLastLink(textNode, counter)
}

ListItems.prototype.sortedListItems = function (type, order) {
  if(order) {
    this.items.sort(sorting).reverse();
  } 
  else {
    this.items.sort(sorting);
  }
  function sorting (a, b) {
    var x = a[type], y = b[type];
    if(x < y) {
      return -1;
    } else if (x > y) {
      return 1;
    } else {
      return 0;
    }
  }
}

ListItems.prototype.createAndDisplayLastLink = function (textNode, counter) {
  $('<li/>').attr({'class': 'last', 'id': textNode + counter}).append($('<a/>').attr({'href': 'javascript:', 'class': 'link'}).text(textNode)).appendTo(this.container);
}