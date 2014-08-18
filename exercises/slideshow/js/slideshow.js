var SlideShow = function ($slideList) {
  this.$slideList = $slideList;
}

SlideShow.prototype.moveSliderPosition = function () {
  $('#slideshow').prependTo('body');
}

SlideShow.prototype.slideEffect = function () {
  var _this = this;
  
  $('<nav></nav>').appendTo('#slideshow');
  _this.$slideList.hide();
  
  var slideShow = function (slideNum, slideCount) {
    _this.$slideList.eq(slideNum).fadeOut(2000, function () {
      _this.showImageNumber(slideNum, slideCount);
    });
    
    slideNum = (slideNum + 1) % slideCount;
    
    _this.$slideList.eq(slideNum).delay(2000).fadeIn(2000, function () {
      slideShow(slideNum, slideCount);
    });
  }

  _this.$slideList.eq(0).fadeIn(2000, function () {
    slideShow(0, _this.$slideList.length);
  });

  _this.showImageNumber(0, $slideList.length);
}

SlideShow.prototype.showImageNumber = function (slideNum, slideCount) {
  $('#slideshow').find('nav').html("Image: " + (slideNum + 1) + " of " + slideCount);
}

$(document).ready(function () {
  $slideList = $('#slideshow li');

  var homeSlider = new SlideShow($slideList);

  homeSlider.moveSliderPosition();
  homeSlider.slideEffect();
});