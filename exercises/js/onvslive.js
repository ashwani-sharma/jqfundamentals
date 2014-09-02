var EventMethods = function ($targetBlock, $button) {
  this.$targetBlock = $targetBlock;
  this.$button = $button;
  this.counter = 1;
}

EventMethods.prototype = {
  bindEvents: function () {
    this.addNewRow();
    this.highlightOrRemoveSelectedDiv();
  },

  addNewRow: function () {
    var _this = this;
    _this.$button.on('click', function () {
      _this.$targetBlock.append($('<div></div>').addClass('block').html('Row ' + _this.counter++));
    });
  },

   highlightOrRemoveSelectedDiv: function () {
    var _this = this;
    _this.$targetBlock.delegate('.block', 'click', function () {
      if($('.block').last().is($(this))) {
        $(this).remove();
        _this.counter--;
      }
      else {
        $(this).toggleClass('highlight');
      }
    });
  }
}

$(document).ready(function () {
  var eventMethods = new EventMethods($('#holder'), $('#container .button .add-row'));

  eventMethods.bindEvents();
});