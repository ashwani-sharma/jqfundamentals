var SlideShow = function ($slideShow, $slideList) {
  this.$slideShow = $slideShow;
  this.$slideList = $slideList;
  this.$length = this.$slideList.length;
  this.$index = 0;
}

SlideShow.prototype.initMethods = function () {
  this.moveSliderPosition();
  this.createNavBlock();
  this.slider();
}

SlideShow.prototype.moveSliderPosition = function () {
  this.$slideShow.prependTo('body');
  this.$slideList.hide();
}

SlideShow.prototype.createNavBlock = function () {
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
      _this.sliderEffect(_this.$slideList.first());
    }
  });
}

SlideShow.prototype.slider = function () {
  this.sliderEffect(this.$slideList.first());
}

$(function () {
  var homeSlider = new SlideShow($('#slideshow'), $('#slideshow li'));
  homeSlider.initMethods();
});