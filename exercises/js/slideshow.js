var SlideShow = function ($slideShow, $slideList) {
  this.$slideShow = $slideShow;
  this.$slideList = $slideList;
  this.$length = this.$slideList.length;
  this.$index = 0;
}

SlideShow.prototype.moveSliderPosition = function () {
  this.$slideShow.prependTo('body');
  this.$slideShow.children().hide();
  $('<nav />').insertAfter(this.$slideShow);
}

SlideShow.prototype.sliderEffect = function ($nextSlide) {
  var _this = this;

  $('nav').text((_this.$index + 1) + " of " + _this.$length);

  $nextSlide.fadeIn(1000).delay(1000).fadeOut(1000, function () {
    _this.$index++;
    if(_this.$index < _this.$length) {
      _this.sliderEffect($(this).next());
    }
    else {
      _this.$index = 0;
      _this.sliderEffect(_this.$slideShow.children().first());
    }
  });
}

SlideShow.prototype.slider = function () {
  this.sliderEffect(this.$slideList.first())
}

$(function () {
  var homeSlider = new SlideShow($('#slideshow'), $('#slideshow li'));

  homeSlider.moveSliderPosition();
  homeSlider.slider();
});