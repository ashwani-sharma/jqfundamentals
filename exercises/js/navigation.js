var DropDownMenu = function ($li) {
  this.$li = $li;
}

DropDownMenu.prototype.bindEvent = function () {
  $li.hover(function () {
    $(this).addClass('hover').children('ul').slideDown();
  }, function () {
    $(this).removeClass('hover').children('ul').slideUp();
  });
}

$(document).ready(function () {
  $li = $('#nav > li');
  (new DropDownMenu($li)).bindEvent();
});