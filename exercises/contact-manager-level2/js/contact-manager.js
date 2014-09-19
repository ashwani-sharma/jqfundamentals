var ContactManager = function ($required, $email, $search) {
  this.$required = $required;
  this.$email = $email;
  this.$search = $search;
  this.emailRegEx = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]{2,}(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
}

ContactManager.prototype.initMethods = function () {
  this.createContactBlocks();
  this.deleteCreatedBlocks();
  this.searchBlockByEnteredName();
}

ContactManager.prototype.createContactBlocks = function () {
  var _this = this;

  $('#add-contact').on('click', function () {
    var inputValues = [];

    if(_this.getValuesFromInputs(inputValues, _this.$email, _this.emailRegEx)) {
      _this.$required.val('');
      _this.createContactBlock(inputValues[0], inputValues[1]);
    }
  });
}

ContactManager.prototype.getValuesFromInputs = function (valuesArray, input, pattern) {
  var _this = this,
      len = _this.$required.length;

  for(i = 0; i < len; i++) {
    if(!_this.$required[i].value.trim()) {
      alert(_this.$required[i].name + ' field cant be empty');
      _this.$required[i].focus();
      return false;
    }
    // else if(!pattern.test(input.value)) {
    //   alert('Please enter valid email');
    //   input.focus();
    //   return false;
    // }
    else {
      valuesArray.push(_this.$required[i].value);
    }
  }
  return valuesArray;
}

ContactManager.prototype.createContactBlock = function (elem1, elem2) {
  var $nameRow = $('<div/>').addClass('name-row').html('Name: '),
      $nameSpan = $('<span/>').addClass('name').html(elem1)
      $emailRow = $('<div/>').addClass('email-row').html('Email: ' + elem2),
      $deleteButton = $('<input/>').attr({type: 'button', value: 'Delete'}).addClass('delete-block'),
      $block = $('<div/>').attr('data-name', elem1.toLowerCase()).addClass('contact-block');

  $nameRow.appendTo($block);
  $nameSpan.appendTo($nameRow);
  $emailRow.appendTo($block);
  $deleteButton.appendTo($block);

  $block.appendTo('#container');
}

ContactManager.prototype.deleteCreatedBlocks = function () {
  $('#container').delegate('.delete-block', 'click', function () {
    $(this).parent('.contact-block').remove();
  });
}

ContactManager.prototype.searchBlockByEnteredName = function () {
  var _this = this;

  _this.$search.keyup(function () {
    var text = $(this).val().toLowerCase().trim(),
        $nameBlock = $('#container').find('.contact-block'),
        len = $nameBlock.length;

    $nameBlock.each(function () {
      if($(this).data('name').indexOf(text) == 0) {
        $(this).show();
      }
      else {
        $(this).hide();
      }
    });
  });
}

$(function () {
  var contactManager = new ContactManager($('.required'), $('.email'), $('#search'));
  contactManager.initMethods();
});