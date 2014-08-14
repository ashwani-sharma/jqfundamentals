var EventMethods = function ($targetBlock, $button) {
  this.$targetBlock = $targetBlock;
  this.$button = $button;
  this.counter = 1;
}

EventMethods.prototype = {
  addNewRow: function () {
    var _this = this;
    _this.$button.on('click', function () {
      _this.$targetBlock.append($('<div class="block"></div>').html('Row ' + _this.counter++));
    });
  },

   highlightOrRemoveSelectedDiv: function () {
    var _this = this;
    _this.$targetBlock.delegate('.block', 'click', function () {
      var len = $('.block').length,
          num = $(this).text().split(' ');

      if(num[1] == len) {
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
  var $targetBlock = $('#holder'),
      $button = $('#container .button .add-row'),
      eventMethods = new EventMethods($targetBlock, $button);

  eventMethods.addNewRow();
  eventMethods.highlightOrRemoveSelectedDiv();
});