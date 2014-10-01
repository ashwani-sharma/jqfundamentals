var ProductRating = function ($container, products, ratings) {
  this.$container = $container;
  this.products = products;
  this.ratings = ratings;
}

ProductRating.prototype.initMethods = function () {
  this.createBlocks();
  this.bindEvents();
}

ProductRating.prototype.createBlocks = function () {
  this.createRatingLabels();
  this.createProductsRow();
}

ProductRating.prototype.createRatingLabels = function () {
  var _this = this,
      dataRatings = _this.ratings,
      ratingsArray = [];

  for(i = 0; i < dataRatings.length; i++) {
    ratingsArray.push($('<label/>').attr('for', dataRatings[i].type).attr('id', dataRatings[i].type.replace(' ', '-').toLowerCase()).addClass('ratings').text(dataRatings[i].type));
  }
  $('<div/>').addClass('rate-row').append(ratingsArray).appendTo(_this.$container);
}

ProductRating.prototype.createProductsRow = function () {
  var _this = this,
      elemArray = [],
      dataRatings = _this.ratings,
      dataProducts = _this.products;

  for (var i = 0; i < dataProducts.length; i++) {
    var productRow = $('<div/>').addClass('product-row'),
        labels = $('<label/>').attr('for', dataProducts[i].item).attr('id', dataProducts[i].item).addClass('prod-item').html(dataProducts[i].item).appendTo(productRow);

    elemArray.push(productRow);

    for (var j = 0; j < dataRatings.length; j++) {
      var radio = $('<input/>').attr({'name': dataProducts[i].item, 'type': 'radio', 'data-name': dataRatings[j].type.replace(' ', '-').toLowerCase()}),
      $span = $('<span/>').addClass('radios');

      $span.append(radio).appendTo(productRow);
    }
  }
  _this.$container.append(elemArray);
}

ProductRating.prototype.bindEvents = function () {
  this.bindEventOnRadioButtons();
  this.bindEventOnProductLabels();
  this.bindEventOnRatingLabels();
}

ProductRating.prototype.bindEventOnRadioButtons = function () {
  this.$container.delegate('input[type="radio"]', 'click', function () {
    var $this = $(this);
    $('.rate-row').find('#' + $this.data('name')).addClass('highlighted').siblings().removeClass('highlighted');
    $('.product-row').find('#' + $this.attr('name')).addClass('highlighted').parent().siblings().find('.prod-item').removeClass('highlighted');
  });
}

ProductRating.prototype.bindEventOnProductLabels = function () {
  this.$container.delegate('.prod-item', 'click', function () {
    var $this = $(this);
    $('.prod-item.selected').removeClass('selected');
    $this.addClass('selected highlighted').parent().siblings().removeClass('selected highlighted');
    $('.prod-item.selected').parent('.product-row').siblings().find('.prod-item').removeClass('highlighted');
    $('.rate-row').find('.highlighted').removeClass('highlighted');
    $('.rate-row').find('#' + $this.parent().find('input:checked').attr('data-name')).addClass('highlighted');
    if(!($('.prod-item').hasClass('highlighted'))) {
      $('.ratings').removeClass('highlighted');
    };
  });
}

ProductRating.prototype.bindEventOnRatingLabels = function () {
  this.$container.delegate('.ratings', 'click', function () {
    var $this = $(this);
    $('.highlighted').each(function () {
      $this.addClass('highlighted').siblings('.ratings').removeClass('highlighted');
      $(this).siblings('span').find('input[data-name = "' + $this.attr('id') + '"]').prop('checked', true).parent().siblings('span').children().prop('checked', false);
    });
  });
}

$(function () {
  var productRating = new ProductRating($('#products'), [{'item': 'Coffee'}, {'item': 'Tea'}, {'item': 'Sodas'}], [{'type':'Love it'}, {'type':'Like it'}, {'type':'No Views'}, {'type':'Dislike it'}, {'type':'Abhor it'}]);
  productRating.initMethods();
});