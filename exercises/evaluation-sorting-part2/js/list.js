var List = function (dom_element) {
  this.listItems = dom_element.find('.row');
  this.container = this.listItems.closest('.priority-sort');
  this.initialCount = Number(this.container.attr('initial-items-count'));
  this.sortTypes = {'alphabetic-sort': 'text', 'priority-sort': 'priority'};
  this.sortOrders = {'ascending': 0, 'descending': 1};
  this.buttonType = '.sorting-type';
  this.buttonOrder = '.sorting-order';
  this.seeAll = 'see-all';
  this.seeLess = 'see-less';
  this.allButtons = [];
  this.items = [];

  this.sortBy = this.sortTypes['priority-sort'];
  this.sortOrder = this.sortTypes['ascending'];

  this.buttons = new Buttons(this.container, this.sortTypes, this.sortOrders);
  this.allButtons.push(this.buttons);

  var _this = this;
  _this.listItems.each(function (index, list_item) {
    list_item = new ListItem($(list_item));
    _this.items.push(list_item);
  });
}

List.prototype.displaySortingButtons = function () {
  var _this = this;
  _this.allButtons.forEach(function (button) {
    button.displayAllSortingButtons(_this.container, _this.sortTypes, _this.sortOrders);
  });
}

List.prototype.displaySortedListItems = function () {
  var _this = this,
      type = _this.sortTypes[_this.container.find(_this.buttonType + '.active').val()],
      order = Number(_this.sortOrders[_this.container.find(_this.buttonOrder + '.active').val()]);

  _this.sortedListItems(type, order);
  _this.appendCreatedListItems();
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

List.prototype.appendCreatedListItems = function () {
  var _this = this,
      initialListLength = _this.items.length;

  if (_this.container.find($('.' + _this.seeLess)).length) {
    _this.displayListItems(initialListLength, _this.seeLess);
  }
  else {
    _this.displayListItems(_this.initialCount, _this.seeAll);
  }
}

List.prototype.displayListItems = function (condition, buttonHtml) {
  var _this = this,
      i = 0;
      
  _this.container.find('li').remove();
  _this.items.forEach(function (item) {
    if(i < condition) {
      _this.container.append(item.getDom());
    }
    i++
  });
  _this.createAndDisplayLastLink(buttonHtml);
}

List.prototype.createAndDisplayLastLink = function (buttonHtml) {
  $('<li/>').addClass(buttonHtml).append($('<a/>').attr('href', 'javascript:').text(buttonHtml)).appendTo(this.container);
}

List.prototype.bindEvents = function () {
  this.bindSeeAllLink();
  this.bindSeeLessLink();
  this.bindSortingButtons();
}

List.prototype.bindSeeAllLink = function () {
  var _this = this;
  _this.container.on('click', '.' + _this.seeAll, function () {
    _this.displayListItems(_this.items.length, _this.seeLess);
  });
}

List.prototype.bindSeeLessLink = function () {
  var _this = this;
  _this.container.on('click', '.' + _this.seeLess, function () {
    _this.displayListItems(_this.initialCount, _this.seeAll);
  });
}

List.prototype.bindSortingButtons = function () {
  var _this = this;
  _this.container.on('click', _this.buttonType + ',' + _this.buttonOrder , function () {
    var $this = $(this),
        className = $this.attr('class');

    $this.addClass('active').siblings('.' + className).removeClass('active');
    _this.displaySortedListItems();
  });
}