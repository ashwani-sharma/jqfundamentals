var List = function (dom_element, list_items_selector) {
  this.container = list_items_selector.closest('.priority-sort');
  this.initialCount = Number(this.container.attr('initial-items-count'));
  this.sortType = {'alphabetic-sort': 'text', 'priority-sort': 'priority'};
  this.sortOrder = {'ascending': 0, 'descending': 1};
  this.buttonType = '.sorting-type';
  this.buttonOrder = '.sorting-order';
  this.seeAll = 'see-all';
  this.seeLess = 'see-less';
  this.allButtons = [];
  this.items = [];

  var _this = this;

  dom_element.each(function (index, dom_item, container, sortType, sortOrder) {
    dom_item = new Buttons(container, sortType, sortOrder);
    _this.allButtons.push(dom_item);
  });

  list_items_selector.each(function (index, list_item) {
    list_item = new ListItem($(list_item));
    _this.items.push(list_item);
  });
}

List.prototype.buttons = function () {
  var _this = this;
  _this.allButtons.forEach(function (item) {
    item.displayAllSortingButtons(_this.container, _this.sortType, _this.sortOrder);
  });
}

List.prototype.displaySortedListItems = function (button, list, items) {
  var _this = this,
      className = button.attr('class');

  button.addClass('active').siblings('.' + className).removeClass('active');

  var typeSelector = _this.buttonType + '.active',
      orderSelector = _this.buttonOrder + '.active',
      type = _this.sortType[_this.container.find(typeSelector).val()],
      order = Number(_this.sortOrder[_this.container.find(orderSelector).val()]);
      
  _this.sortedListItems(type, order);
  _this.appendCreatedListItems(items, list);
}

List.prototype.sortedListItems = function (type, order) {
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

List.prototype.appendCreatedListItems = function (items, list) {
  var _this = this,
      initialListLength = items.length;

  if (_this.container.find($('.' + _this.seeLess)).length) {
    _this.displayListItems(initialListLength, initialListLength, _this.seeLess, _this.seeLess);
  }
  else {
    _this.displayListItems(initialListLength, _this.initialCount, _this.seeAll, _this.seeAll);
  }
}

List.prototype.displayListItems = function (length, condition, textNode, className) {
  var _this = this,
      i = 0;
      
  _this.container.find('li').remove();
  _this.items.forEach(function (item) {
    if(i < condition) {
      _this.container.append(item.getDom());
    }
    i++
  });
  _this.createAndDisplayLastLink(textNode, className);
}

List.prototype.createAndDisplayLastLink = function (textNode, className) {
  $('<li/>').addClass(className).append($('<a/>').attr('href', 'javascript:').text(textNode)).appendTo(this.container);
}

List.prototype.bindEvents = function (items, list) {
  this.bindSeeAllLink(items);
  this.bindSeeLessLink(items);
  this.bindSortingButtons(items, list);
}

List.prototype.bindSeeAllLink = function (items) {
  var _this = this,
      totalItems = items.length;

  _this.container.on('click', '.' + _this.seeAll, function () {
    _this.displayListItems(totalItems, totalItems, _this.seeLess, _this.seeLess);
  });
}

List.prototype.bindSeeLessLink = function (items) {
  var _this = this,
      totalItems = items.length;

  _this.container.on('click', '.' + _this.seeLess, function () {
    _this.displayListItems(totalItems, _this.initialCount, _this.seeAll, _this.seeAll);
  });
}

List.prototype.bindSortingButtons = function (items, list) {
  var _this = this;
  _this.container.on('click', _this.buttonType + ',' + _this.buttonOrder , function () {
    _this.displaySortedListItems($(this), list, items);
  });
}