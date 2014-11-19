var Buttons = function (container, sortType, sortOrder) {}

Buttons.prototype.displayAllSortingButtons = function (container, sortType, sortOrder) {
  var _this = this,
      $sortButtonsContainer = $('<div/>').addClass('sort-buttons-container').prependTo(container),
      $typeButtons = _this.createSortingButtons('sorting-type', sortType),
      $orderButtons = _this.createSortingButtons('sorting-order', sortOrder);

  $sortButtonsContainer.append($typeButtons, $orderButtons);
  _this.makePriorityAndAscendingButtonsActive(container);
}

Buttons.prototype.createSortingButtons = function (className, buttons) {
  var sortButtons = [];
  for (var key in buttons) {
    sortButtons.push($('<input>').attr({'class': className, 'data-id': key, 'type': 'button', 'value': key}));
  }
  return sortButtons;
}

Buttons.prototype.makePriorityAndAscendingButtonsActive = function (container) {
  container.find($('input[data-id="priority-sort"]')).addClass('active');
  container.find($('input[data-id="ascending"]')).addClass('active');
}