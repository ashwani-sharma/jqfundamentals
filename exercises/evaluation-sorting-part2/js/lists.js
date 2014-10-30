var Lists = function (list_collection, id) {
  var _this = this;
  _this.sortingType = { 'sort-by-alphabet': 'name', 'sort-by-priority': 'priorityOrder' };
  _this.sortingOrder = { 'sort-ascending': 0, 'sort-descending': 1 };
  _this.listArray = [];
  list_collection.each(function (index, list) {
    list = new List($(list));
    _this.listArray.push(list);
  });
}

Lists.prototype.init = function () {
  this.displayInitiallySortedListItems();
  this.appendSortButtons();
  this.bindEvents();
}

Lists.prototype.displayInitiallySortedListItems = function () {
  var _this = this;
  this.listArray.forEach(function (list) {
    list.sortingByPriority();
    list.displayListItems();
    list.displayInitialCount();
    list.createLinks('see-all', 'see all');
  });
}

Lists.prototype.createSortButtons = function(className, buttonsCollection) {
  var sortButtons = [];
  for (var key in buttonsCollection) {
    sortButtons.push($('<input>', { class: 'button ' + className, id: key, 'type': 'button', 'value': key }));
  }
  return sortButtons;
}

Lists.prototype.appendSortButtons = function () {
  var _this = this;
  _this.listArray.forEach(function (list) {
    var $sortButtonsContainer = $('<div/>', { id: 'buttons', class: 'sort-buttons-container' }).prependTo(list.list_items.container);
    var $typeButtons = _this.createSortButtons('sorting-type', _this.sortingType);
    var $orderButtons = _this.createSortButtons('sorting-order', _this.sortingOrder);
    $sortButtonsContainer.append($typeButtons);
    $sortButtonsContainer.append($orderButtons);
    _this.displayInitialActiveButtons();
  });
}

Lists.prototype.displayInitialActiveButtons = function () {
  $('#sort-by-priority, #sort-ascending').addClass('active');
}

Lists.prototype.bindEvents = function () {
  this.bindSeeAllLink();
  this.bindSeeLessLink();
  this.bindAlphabeticSortButton();
  this.bindPrioritySortButton();
  this.bindDescendingSortButton();
  this.bindAscendingSortButton();
}

Lists.prototype.bindSeeAllLink = function () {
  this.listArray.forEach(function (list) {
    list.list_items.container.on('click', '.see-all', function () {
      list.displayListItems();
      list.showAllListItems();
      $(this).remove();
    });
  });
}

Lists.prototype.bindSeeLessLink = function () {
  this.listArray.forEach(function (list) {
    list.list_items.container.on('click', '.see-less', function () {
      list.displayListItems();
      list.displayInitialCount();
      list.createLinks('see-all', 'see all');
      $(this).remove();
    });
  });
}

Lists.prototype.bindAlphabeticSortButton = function () {
  var _this = this;
  _this.listArray.forEach(function (obj) {
    obj.list_items.container.on('click', '#sort-by-alphabet', function () {
      if($(this).not('active') && obj.list_items.container.find('.see-all').is(':visible')) {
        obj.sortingbyAlphabet();
        obj.displayListItems();
        obj.displayInitialCount();
        obj.createLinks('see-all', 'see all');
      }
      else {
        obj.sortingbyAlphabet();
        obj.displayListItems();
        obj.createLinks('see-less', 'see less');
      }
      $(this).addClass('active').siblings('.sorting-type').removeClass('active');
    });
  });
}

Lists.prototype.bindPrioritySortButton = function () {
  var _this = this;
  _this.listArray.forEach(function (obj) {
    obj.list_items.container.on('click', '#sort-by-priority', function () {
      if($(this).not('active') && obj.list_items.container.find('.see-all').is(':visible')) {
        obj.sortingByPriority();
        obj.displayListItems();
        obj.displayInitialCount();
        obj.createLinks('see-all', 'see all');
      }
      else {
        obj.sortingByPriority();
        obj.displayListItems();
        obj.createLinks('see-less', 'see less');
      }
      $(this).addClass('active').siblings('.sorting-type').removeClass('active');
    });
  });
}

Lists.prototype.bindDescendingSortButton = function () {
  var _this = this;
  _this.listArray.forEach(function (obj) {
    obj.list_items.container.on('click', '#sort-descending', function () {
      if(obj.list_items.container.find('#sort-by-priority').hasClass('active')) {
        if(obj.list_items.container.find('.see-all').is(':visible')) {
          obj.sortingByPriorityDescending();
          obj.displayListItems();
          obj.displayInitialCount();
          obj.createLinks('see-all', 'see all');
        }
        else {
          obj.sortingByPriorityDescending();
          obj.displayListItems();
          obj.createLinks('see-less', 'see less');
        }
      }
      else if(obj.list_items.container.find('#sort-by-alphabet').hasClass('active')) {
        if(obj.list_items.container.find('.see-all').is(':visible')) {
          obj.sortingbyAlphabetDescending();
          obj.displayListItems();
          obj.displayInitialCount();
          obj.createLinks('see-all', 'see all');
        }
        else {
          obj.sortingbyAlphabetDescending();
          obj.displayListItems();
          obj.createLinks('see-less', 'see less');
        }
      }
      $(this).addClass('active').siblings('.sorting-order').removeClass('active');
    });
  });
}

Lists.prototype.bindAscendingSortButton = function () {
  var _this = this;
  _this.listArray.forEach(function (obj) {
    obj.list_items.container.on('click', '#sort-ascending', function () {
      if(obj.list_items.container.find('#sort-by-priority').hasClass('active')) {
        if(obj.list_items.container.find('.see-all').is(':visible')) {
          obj.sortingByPriority();
          obj.displayListItems();
          obj.displayInitialCount();
          obj.createLinks('see-all', 'see all');
        }
        else {
          obj.sortingByPriority();
          obj.displayListItems();
          obj.createLinks('see-less', 'see less');
        }
      }
      else if(obj.list_items.container.find('#sort-by-alphabet').hasClass('active')) {
        if(obj.list_items.container.find('.see-all').is(':visible')) {
          obj.sortingbyAlphabet();
          obj.displayListItems();
          obj.displayInitialCount();
          obj.createLinks('see-all', 'see all');
        }
        else {
          obj.sortingbyAlphabet();
          obj.displayListItems();
          obj.createLinks('see-less', 'see less');
        }
      }
      $(this).addClass('active').siblings('.sorting-order').removeClass('active');
    });
  });
}

$(function () {
  var lists = new Lists($('.priority-sort'));
  lists.init();
});