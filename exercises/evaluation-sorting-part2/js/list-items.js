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