var ContactManager = function (params) {
  this.params = params;
  this.emailRegEx = new RegExp(/^[+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i);
}

ContactManager.prototype.bindEvents = function () {
  this.createContactBlocks();
  this.deleteCreatedBlocks();
  this.searchBlockByEnteredName();
}

ContactManager.prototype.createContactBlocks = function () {
  var _this = this;

  $('#add-contact').on('click', function () {
    _this.getInputValuesWithBlockElements();
  });
}

ContactManager.prototype.getInputValuesWithBlockElements = function () {
  var inputValues = [];

  if(this.getValuesFromInputs(inputValues) && this.validateEmailField()) {
    this.params.$required.val('');
    this.createContactBlock(inputValues[0], inputValues[1]);
  }
}

ContactManager.prototype.getValuesFromInputs = function (valuesArray) {
  var inputs = this.params.$required;

  for(i = 0, len = inputs.length; i < len; i++) {
    if(!inputs[i].value.trim()) {
      alert(inputs[i].name + ' field cant be empty');
      inputs[i].focus();
      return false;
    }
    else {
      valuesArray.push(inputs[i].value);
    }
  }
  return valuesArray;
}

ContactManager.prototype.validateEmailField = function () {
  if(!this.emailRegEx.test(this.params.$email.val())) {
    alert('Please enter valid email');
    this.params.$email.focus();
    return false;
  }
  return true;
}

ContactManager.prototype.createContactBlock = function (elem1, elem2) {
  var $nameRow = $('<div/>').addClass('name-row').html('Name: '),
      $nameSpan = $('<span/>').addClass('name').html(elem1)
      $emailRow = $('<div/>').addClass('email-row').html('Email: ' + elem2),
      $deleteButton = $('<input/>').attr({type: 'button', value: 'Delete'}).addClass('delete-block'),
      $block = $('<div/>').attr('data-name', elem1.toLowerCase()).addClass('contact-block');

  $nameSpan.appendTo($nameRow);
  $block.append($nameRow, $emailRow, $deleteButton).appendTo(this.params.$container);
}

ContactManager.prototype.deleteCreatedBlocks = function () {
  this.params.$container.delegate('.delete-block', 'click', function () {
    $(this).parent('.contact-block').remove();
  });
}

ContactManager.prototype.searchBlockByEnteredName = function () {
  var _this = this;
  _this.params.$search.keyup(function () {
    var text = $(this).val().toLowerCase().trim(),
        $nameBlock = _this.params.$container.find('.contact-block');

    $nameBlock.each(function () {
      var $this = $(this);
      if($this.data('name').indexOf(text) == 0) {
        $this.show();
      }
      else {
        $this.hide();
      }
    });
  });
}

$(function () {
  var params = {$required: $(".required"), $email: $('.email'), $search: $('#search'), $container: $('#container')},
      contactManager = new ContactManager(params);

  contactManager.bindEvents();
});