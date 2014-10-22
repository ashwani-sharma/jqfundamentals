var Item = function (attributes) {
	this.name = attributes.name;
	this.className = attributes.className;
	this.priority = attributes.priority;
}

var ListItem = function (collection) {
  collectionArray = [];
  collection.each(function (index, el) {
  	var $el = $(el),
        obj = new Item({'name': $el.text(), 'class': $el.attr('class'), 'priority': Number($el.attr('priority-order'))});

    collectionArray.push(obj);
  });
  return collectionArray;
}

Item.prototype.toHtml = function () {
	return $('<li/>').attr({'class': this.className, 'priority': this.priority}).text(this.name);
}