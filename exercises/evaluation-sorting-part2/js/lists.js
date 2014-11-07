var Lists = function (list_collection) {
  this.sortType = {'Alphabetic-Sort': 'text', 'Priority-Sort': 'priority'};
  this.sortOrder = {'Ascending': 0, 'Descending': 1};
  this.listArray = [];

  var _this = this;
  list_collection.each(function (index, list) {
    list = new List($(list));
    _this.listArray.push(list);
  });
}

Lists.prototype.init = function () {
  var _this = this,
      counter = 0;

  _this.listArray.forEach(function (list) {
    var priorityButton = '#Priority-Sort' + counter,
        list = list,
        items = list.list_items.items,
        container = list.list_items.container;

    _this.displayAllSortingButtons(counter, container);
    _this.makeAscendingButtonActive(counter, container);
    _this.displaySortedListItems(container.find(priorityButton), counter, container, list, items);
    _this.bindEvents(items, container, counter, list);
    counter++;
  });
}

Lists.prototype.displayAllSortingButtons = function (counter, container) {
  var _this = this,
      $sortButtonsContainer = $('<div/>').attr({'id': 'buttons' + counter, 'class': 'sort-buttons-container'}).prependTo(container)
      $typeButtons = _this.createSortingButtons('sorting-type', _this.sortType, counter),
      $orderButtons = _this.createSortingButtons('sorting-order', _this.sortOrder, counter);

  $sortButtonsContainer.append($typeButtons, $orderButtons);
}

Lists.prototype.createSortingButtons = function (className, buttons, counter) {
  var sortButtons = [];
  for (var key in buttons) {
    sortButtons.push($('<input>').attr({'class': className + counter, 'id': key + counter, 'type': 'button', 'value': key}));
  }
  return sortButtons;
}

Lists.prototype.makeAscendingButtonActive = function (counter, container) {
  container.find('#Ascending' + counter).addClass('active');
}

Lists.prototype.displaySortedListItems = function (button, counter, container, list, items) {
  var _this = this,
      className = button.attr('class')

  button.addClass('active').siblings('.' + className).removeClass('active');

  var typeSelector = '.sorting-type' + counter + '.active',
      orderSelector = '.sorting-order' + counter + '.active',
      type = _this.sortType[container.find(typeSelector).val()],
      order = Number(_this.sortOrder[container.find(orderSelector).val()]);

  list.sortedListItems(type, order);
  _this.appendCreatedListItems(counter, container, items);
}

Lists.prototype.appendCreatedListItems = function (counter, container, items) {
  var _this = this;

  var initialCount = Number(container.attr('initial-items-count')),
      initialListLength = items.length;

  if (container.find('#see-less' + counter).length) {
    _this.displayListItems(items.length, initialListLength, 'see-less', items, container, counter);
  }
  else {
    _this.displayListItems(initialListLength, initialCount, 'see-all', items, container, counter);
  }
}

Lists.prototype.displayListItems = function (listItemsLength, listCondition, link, items, container, counter) {
  this.appendListItems(listItemsLength, listCondition, items, container);
  this.createAndDisplayLastLink(link, counter, container);
}

Lists.prototype.appendListItems = function (length, condition, items, container) {
  container.find('li').remove();
  for (var i = 0, len = length; i < len; i++) {
    if (i < condition) {
      items[i].domListItem.appendTo(container);
    }
  }
}

Lists.prototype.createAndDisplayLastLink = function (textNode, counter, container) {
  $('<li/>').attr({'class': 'last', 'id': textNode + counter}).append($('<a/>').attr({'href': 'javascript:', 'class': 'link'}).text(textNode)).appendTo(container);
}

Lists.prototype.bindEvents = function (items, container, counter, list) {
  this.bindSeeAllLink(items, container, counter);
  this.bindSeeLessLink(items, container, counter);
  this.bindSortingButtons(items, container, counter, list);
}

Lists.prototype.bindSeeAllLink = function (items, container, counter) {
  var _this = this,
      totalItems = items.length;

  container.on('click', '#see-all' + counter, function () {
    _this.displayListItems(totalItems, totalItems, 'see-less', items, container, counter);
  });
}

Lists.prototype.bindSeeLessLink = function (items, container, counter) {
  var _this = this,
      initialListLength = Number(container.attr('initial-items-count')),
      totalItems = items.length;

  container.on('click', '#see-less' + counter, function () {
    _this.displayListItems(initialListLength, totalItems, 'see-all', items, container, counter);
  });
}

Lists.prototype.bindSortingButtons = function (items, container, counter, list) {
  var _this = this,
      type = '.sorting-type' + counter,
      order = '.sorting-order' + counter;

  container.on('click', type + ',' + order , function () {
    _this.displaySortedListItems($(this), counter, container, list, items);
  });
}

$(function () {
  var lists = new Lists($('.priority-sort'));
  lists.init();
});