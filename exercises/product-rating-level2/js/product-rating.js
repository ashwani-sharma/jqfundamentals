var ProductRating = function ($container) {
  this.products = [{'item': 'Coffee'}, {'item': 'Tea'}, {'item': 'Sodas'}];
  this.ratings =[{'type':'Love it'}, {'type':'Like it'}, {'type':'No Views'}, {'type':'Dislike it'}, {'type':'Abhor it'}];
  this.$container = $container;
}

ProductRating.prototype.initMethods = function () {
  this.createBlocks();
  this.bindEvents();
}

ProductRating.prototype.createBlocks = function () {
  this.createRatingBlock();
  this.createProductsWithRadioButtons();
}

ProductRating.prototype.createRatingBlock = function () {
  var _this = this,
      dataRatings = _this.ratings,
      rateRow = $('<div/>').addClass('rate-row').appendTo(_this.$container);

  for(i = 0; i < dataRatings.length; i++) {
    $('<label/>').attr('for', dataRatings[i].type).attr('id', dataRatings[i].type.slice(0, dataRatings[i].type.indexOf(' ')).toLowerCase()).addClass('ratings').text(dataRatings[i].type).appendTo(rateRow);
  }
}

ProductRating.prototype.createProductsWithRadioButtons = function () {
  var _this = this,
      dataRatings = _this.ratings,
      dataProducts = _this.products;

  for (var i = 0; i < dataProducts.length; i++) {
    var radioHolder = $('<div/>').addClass('radio-box').appendTo(_this.$container);
    $('<label/>').attr('for', dataProducts[i].item).attr('id', dataProducts[i].item).addClass('prod-item').html(dataProducts[i].item).appendTo(radioHolder);
    
    for (var j = 0; j < dataRatings.length; j++) {
      var radio = $('<input/>').addClass(dataRatings[j].type.slice(0, dataRatings[j].type.indexOf(' ')).toLowerCase()).attr({'name': dataProducts[i].item, 'type': 'radio', 'disabled': true}),
      $span = $('<span/>').addClass('radios');

      $span.append(radio).appendTo(radioHolder);
    }
  }  
}

ProductRating.prototype.bindEvents = function () {
  this.$container.delegate('.prod-item', "click", this.actionOnClickingProductLabels);
  this.$container.delegate('.ratings', "click", this.actionOnClickingRatingLables);
}

ProductRating.prototype.actionOnClickingRatingLables = function () {
  var $this =$(this);
  $('.highlighted').each(function () {
    $this.addClass('highlighted').siblings('.ratings').removeClass('highlighted');
    $(this).siblings('span').find('.' + $this.attr('id')).prop({disabled: false, checked: true}).parent().siblings('span').children().prop({disabled: true, checked: false});
  });
}

ProductRating.prototype.actionOnClickingProductLabels = function () {
  var $this = $(this);
  $('.prod-item.selected').removeClass('selected');
  $this.toggleClass('selected highlighted');
  $('.prod-item.selected').parent('.radio-box').siblings().find('.prod-item').removeClass('highlighted');
  if(!($('.prod-item').hasClass('highlighted'))) {
    $('.ratings').removeClass('highlighted');
  }
}

$(function () {
  var productRating = new ProductRating($('#products'));
  productRating.initMethods();
});