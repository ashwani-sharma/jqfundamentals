var EventMethods = function ($targetBlock, $button, $newRow) {
  this.$targetBlock = $targetBlock;
  this.$button = $button;
  this.$newRow = $newRow;
  this.counter = 1;
}

EventMethods.prototype = {
  addNewRow: function () {
    var _this = this;
    $(_this.$button).on('click', function () {
      _this.$targetBlock.append($(_this.$newRow).html('Row ' + _this.counter++));
    });
  },

   highlightDivOnClick: function () {
    this.$targetBlock.delegate('.block', 'click', function () {
      $(this).toggleClass('highlight');
    });
  },

  removeLastDivOnClick: function () {
    var _this = this;
    _this.$targetBlock.delegate('.block:last', 'click', function () {
      $(this).remove();
      _this.counter--;
    });
  }
}

$(document).ready(function () {
  var $targetBlock = $('#holder'),
      $button = $('#container .button .add-row'),
      $newRow = '<div class="block">Row</div>',
      eventMethods = new EventMethods($targetBlock, $button, $newRow);

  eventMethods.addNewRow();
  eventMethods.highlightDivOnClick();
  eventMethods.removeLastDivOnClick();
});