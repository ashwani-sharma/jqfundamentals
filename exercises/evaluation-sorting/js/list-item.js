var ListItem = function (list_item_element) {
  this.className = list_item_element.attr('class');
  this.priority = Number(list_item_element.attr('priority-order'));
  this.text = list_item_element.text();
}

ListItem.prototype.getDom = function () {
  return $('<li />').attr({'class': this.className, 'priority-order': this.priority}).text(this.text);
}