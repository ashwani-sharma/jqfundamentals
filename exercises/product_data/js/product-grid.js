var ProductGrid = function ($productContainer, $filterHolder, $checkBox) {
	this.$productContainer = $productContainer;
	this.$filterHolder = $filterHolder;
	this.$checkBox = $checkBox;
	this.jsonData = [];
}

ProductGrid.prototype.loadJson = function () {
	var _this = this;

	$.ajax ({
		url: 'data/product.json',
		method: 'get',
		dataType: 'json'
	}).success(function (data) {
		_this.jsonData = data;
		_this.createHtmlData();
	})
}

ProductGrid.prototype.createHtmlData = function () {
	var _this = this;

	for(var i = 0; i < _this.jsonData.length; i = i + 1) {
		var url = _this.jsonData[i].url,
				brand = _this.jsonData[i].brand,
				color = _this.jsonData[i].color,
				soldOut = _this.jsonData[i].sold_out,
				img = '<img src="images/'  + url +'"/>'
				$productBox = $('<span></span>').attr({'id': i, 'data-brand': brand, 'data-color': color, 'data-sold-out': soldOut}).addClass('box').appendTo(_this.$productContainer);
		
		$(img).appendTo($productBox);
	}
}

ProductGrid.prototype.showFilteredProducts = function (filters) {
	$('span.box').hide();
	$(filters).show();
}

ProductGrid.prototype.filteredData = function () {
	var _this = this,
			$product = $('span.box');

	_this.$filterHolder.each(function () {
		$product = _this.dataStorage($product);
	});

	_this.showFilteredProducts($product);
}

ProductGrid.prototype.dataStorage = function (elem, holder) {
	var _this = this,
			checkedBox = _this.$filterHolder.find('.checkbox:checked')

	if(checkedBox.length == 0) {
		return elem;
	}
	else {
		var array = [];

		checkedBox.each(function () {
			var filterName = $(this).attr('name'),
					valueSelected = $(this).attr('data-' + filterName);

			$(elem).each(function () {
				if($(this).attr('data-' + filterName) == valueSelected) {
					array.push(this);
				}
			});
		});
		return array;
	}
}

ProductGrid.prototype.bindEvent = function () {
	var _this = this;

	_this.$checkBox.on('change', function () {
		var $this = $(this);

		_this.filteredData();
	});
}

$(function () {
	var productGrid = new ProductGrid($('#products'), $('ul.block'), $('ul.block .checkbox'));
	productGrid.loadJson();
	productGrid.bindEvent();
});