var Accordions = function (targetLink) {
  this.targetLink = targetLink;
}

Accordions.prototype.bindEvent = function () {
  this.targetLink.on('click', function (e) {
    $(this).parents('li').children('p').slideToggle().parents('li').siblings().children('p').slideUp();
    e.preventDefault();
  });
}

$(document).ready(function () {
  targetLink = $('#blog ul li h3 a');
  (new Accordions(targetLink)).bindEvent();
});