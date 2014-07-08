var CreateInputHint = function (label, searchField) {
  this.label = label;
  this.labelValue = this.label.text();
  this.searchField = searchField;
}

CreateInputHint.prototype.changeLabels = function () {
  var _this = this;

  _this.searchField.val(_this.labelValue).addClass('hint');
  _this.label.detach();
}

CreateInputHint.prototype.bindEvents = function () {
  this.initFocusEvent();
  this.initBlurEvent();
}

CreateInputHint.prototype.initFocusEvent = function () {
  var _this = this;

  _this.searchField.on('focus', function () {
    _this.focusEffect();
  });
}

CreateInputHint.prototype.initBlurEvent = function () {
  var _this = this;

  _this.searchField.on('blur', function () {
    _this.blurEffect();
  });
}

CreateInputHint.prototype.focusEffect = function () {
  var _this = this,
      currentInputVal = _this.searchField.val();

  if(currentInputVal == _this.labelValue) {
    _this.searchField.val('');
    _this.searchField.removeClass('hint');
  }
  else {
    _this.searchField.val(currentInputVal);
  }
}

CreateInputHint.prototype.blurEffect = function () {
  var _this = this,
      currentInputVal = _this.searchField.val();

  if(currentInputVal.trim() == '') {
    _this.searchField.val(_this.labelValue);
    _this.searchField.addClass('hint');
  }
}

$(document).ready(function () {
  label = $('label[for="q"]');
  searchField = $('input.input_text');

  var checkResult = new CreateInputHint(label, searchField);

  checkResult.changeLabels();
  checkResult.bindEvents();
});