var SlideShow = function ($slideShow, $slideList) {
  this.$slideShow = $slideShow;
  this.$slideList = $slideList;
  this.$length = this.$slideList.length;
  this.$index = 0;
  this.animationTiming = 1000;
}

SlideShow.prototype.initMethods = function () {
  this.moveSliderPosition();
  this.createNavBlock();
  this.customTimings();
  this.sliderEffect(this.$slideList.first());
}

SlideShow.prototype.moveSliderPosition = function () {
  this.$slideShow.prependTo('body');
  this.$slideList.hide();
}

SlideShow.prototype.createNavBlock = function () {
  $('<nav />').attr('id', 'slide-nav').insertAfter(this.$slideShow);
}

SlideShow.prototype.sliderEffect = function ($nextSlide) {
  var _this = this;

  $('#slide-nav').text((_this.$index + 1) + " of " + _this.$length);

  $nextSlide.fadeIn(_this.animationTiming).delay(_this.animationTiming).fadeOut(_this.animationTiming, function () {
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

SlideShow.prototype.customTimings = function () {
  var _this = this;

  $('#check-timings').on('click', function () {
    var val = $('.custom-timing .block').find('input[type="text"]').val();
    _this.animationTiming = Number.parseInt(val);
  });
}

$(document).ready(function () {
  var homeSlider = new SlideShow($('#slideshow'), $('#slideshow li'));
  homeSlider.initMethods();
});