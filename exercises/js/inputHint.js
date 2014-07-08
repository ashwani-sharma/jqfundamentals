var InputHint = function () {
	this.label = $('label[for="q"]');
	this.labelValue = this.label.text();
	this.searchField = $('input.input_text');
}

InputHint.prototype.changeLabels = function () {
	var _this = this;

	_this.searchField.val(_this.labelValue).addClass('hint');
	_this.label.detach();
}

InputHint.prototype.bindEvents = function () {
	this.bindFocus();
	this.bindBlur();
}

InputHint.prototype.bindFocus = function () {
	var _this = this;

	_this.searchField.on('focus', function () {
		var currentInputVal = _this.searchField.val();

		if(currentInputVal == _this.labelValue) {
			_this.searchField.val('');
			_this.searchField.removeClass('hint');
		}
		else {
			_this.searchField.val(currentInputVal);
		}
	});
}

InputHint.prototype.bindBlur = function () {
	var _this = this;

	_this.searchField.on('blur', function () {
		var currentInputVal = _this.searchField.val();

		if(currentInputVal.trim() == '') {
			_this.searchField.val(_this.labelValue);
			_this.searchField.addClass('hint');
		}
	});
}

$(document).ready(function () {
	var checkResult = new InputHint();
	checkResult.changeLabels();
	checkResult.bindEvents();
});