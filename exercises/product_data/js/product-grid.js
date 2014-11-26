var ProductGrid = function ($productContainer, $filterHolder, $checkBox) {
  this.$productContainer = $productContainer;
  this.$filterHolder = $filterHolder;
  this.$checkBox = $checkBox;
}

ProductGrid.prototype.init = function () {
  this.loadJson();
  this.bindEvent();
}

ProductGrid.prototype.loadJson = function () {
  var _this = this;

  $.ajax ({
    url: 'data/product.json',
    method: 'get',
    dataType: 'json'
  }).success(function (data) {
    _this.createHtmlData(data);
  });
}

ProductGrid.prototype.createHtmlData = function (data) {
  var _this = this;
  for(var i = 0; i < data.length; i = i + 1) {
    var url = data[i].url,
        brand = data[i].brand,
        color = data[i].color,
        soldOut = data[i].sold_out,
        img = '<img src="images/'  + url +'"/>',
        $productBox = $('<span></span>').attr({'id': i, 'data-brand': brand, 'data-color': color, 'data-sold-out': soldOut}).addClass('box').appendTo(_this.$productContainer);
		
    $(img).appendTo($productBox);
	}
}

ProductGrid.prototype.bindEvent = function () {
  var _this = this;

  _this.$checkBox.on('change', function () {
    _this.filteredData();
  });
}

ProductGrid.prototype.filteredData = function () {
  var _this = this,
      $holder = _this.filterHolder,
      $products = $('span.box');

  _this.$filterHolder.each(function (i, $holder) {
    $products = _this.getFilteredProducts($products, $holder);
  });

  _this.showFilteredProducts($products);
}

ProductGrid.prototype.getFilteredProducts = function (elem, holder) {
  var checkedBox = $(holder).find('.checkbox:checked');

  if(checkedBox.length != 0) {
    var dataArray = [];

    checkedBox.each(function () {
      var $this = $(this),
          filterName = $this.attr('name'),
          valueSelected = $this.attr('data-' + filterName);

      $(elem).each(function () {
        if($(this).attr('data-' + filterName) == valueSelected) {
          dataArray.push(this);
        }
      });
    });
    return dataArray;
  }
  else {
    return elem;
  }
}

ProductGrid.prototype.showFilteredProducts = function (filteredProducts) {
  $('span.box').hide();
  $(filteredProducts).show();
}

$(function () {
  var productGrid = new ProductGrid($('#products'), $('ul.block'), $('ul.block .checkbox'));
  productGrid.init();
});