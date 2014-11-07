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
      className = button.attr('class');

  button.addClass('active').siblings('.' + className).removeClass('active');

  var typeSelector = '.sorting-type' + counter + '.active',
      orderSelector = '.sorting-order' + counter + '.active',
      type = _this.sortType[container.find(typeSelector).val()],
      order = Number(_this.sortOrder[container.find(orderSelector).val()]);

  list.sortedListItems(type, order);
  _this.appendCreatedListItems(counter, container, items, list);
}

Lists.prototype.appendCreatedListItems = function (counter, container, items, list) {
  var _this = this,
      initialCount = Number(container.attr('initial-items-count')),
      initialListLength = items.length;

  if (container.find('#see-less' + counter).length) {
    list.displayListItems(initialListLength, initialListLength, 'see-less', counter);
  }
  else {
    list.displayListItems(initialListLength, initialCount, 'see-all', counter);
  }
}

Lists.prototype.bindEvents = function (items, container, counter, list) {
  this.bindSeeAllLink(items, container, counter, list);
  this.bindSeeLessLink(items, container, counter, list);
  this.bindSortingButtons(items, container, counter, list);
}

Lists.prototype.bindSeeAllLink = function (items, container, counter, list) {
  var totalItems = items.length;

  container.on('click', '#see-all' + counter, function () {
    list.displayListItems(totalItems, totalItems, 'see-less', counter);
  });
}

Lists.prototype.bindSeeLessLink = function (items, container, counter, list) {
  var totalItems = items.length,
      initialListLength = Number(container.attr('initial-items-count'));

  container.on('click', '#see-less' + counter, function () {
    list.displayListItems(totalItems, initialListLength, 'see-all', counter);
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