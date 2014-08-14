var ProductGrid = function () {
	this.productContainer = $('#products');
}

ProductGrid.prototype = {
	loadAllProducts: function () {
		$.ajax ({
			url: 'data/product.json',
			method: 'get',
			dataType: 'json'
		}).success(function (data) {
			$('#products').append(JSON.stringify(data));
		});
	}
}

$(document).ready(function () {
	var productGrid = new ProductGrid();
	productGrid.loadAllProducts();
});