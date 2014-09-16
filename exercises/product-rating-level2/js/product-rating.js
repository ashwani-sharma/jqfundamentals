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
    var radioHolder = $('<div/>').addClass('radio-block').appendTo(_this.$container);
    $('<label/>').attr('for', dataProducts[i].item).attr('id', dataProducts[i].item).addClass('prod-item').html(dataProducts[i].item).appendTo(radioHolder);
    
    for (var j = 0; j < dataRatings.length; j++) {
      var radio = $('<input/>').addClass(dataRatings[j].type.slice(0, dataRatings[j].type.indexOf(' ')).toLowerCase()).attr({'name': dataProducts[i].item, 'type': 'radio'}),
      $span = $('<span/>').addClass('radios');

      $span.append(radio).appendTo(radioHolder);
    }
  }  
}

ProductRating.prototype.bindEvents = function () {
  this.actionOnClickingRadioButtons();
  this.actionOnClickingProductLabels();
  this.actionOnClickingRatingLables();
}

ProductRating.prototype.actionOnClickingRadioButtons = function () {
  this.$container.delegate('input[type="radio"]', 'click', function () {
    var $this = $(this);
    $('.rate-row').find('#' + $this.attr('class')).addClass('highlighted').siblings().removeClass('highlighted');
    $('.radio-block').find('#' + $this.attr('name')).addClass('highlighted').parent().siblings().find('.prod-item').removeClass('highlighted ');
  });
}

ProductRating.prototype.actionOnClickingProductLabels = function () {
  this.$container.delegate('.prod-item', 'click', function () {
    var $this = $(this);
    $('.prod-item.selected').removeClass('selected');
    $this.toggleClass('selected highlighted');
    $('.prod-item.selected').parent('.radio-block').siblings().find('.prod-item').removeClass('highlighted');
    $('.rate-row').find('.highlighted').removeClass('highlighted');
    $('.rate-row').find('#' + $this.parent().find('input:checked').attr('class')).addClass('highlighted');
    if(!($('.prod-item').hasClass('highlighted'))) {
      $('.ratings').removeClass('highlighted');
    };
  });
}

ProductRating.prototype.actionOnClickingRatingLables = function () {
  this.$container.delegate('.ratings', 'click', function () {
    var $this = $(this);
    $('.highlighted').each(function () {
      $this.addClass('highlighted').siblings('.ratings').removeClass('highlighted');
      $(this).siblings('span').find('.' + $this.attr('id')).prop('checked', true).parent().siblings('span').children().prop('checked', false);
    });
  });
}

$(function () {
  var productRating = new ProductRating($('#products'));
  productRating.initMethods();
});