var TabbedNavigation = function () {}

TabbedNavigation.prototype.initHideModules = function () {
  $('div.module').hide();
}

TabbedNavigation.prototype.createTabLinks = function () {
  var _this = this;
  $('div.module:first').before('<ul class="tabs"></ul>');

  _this.createTabHeadings();
  _this.tabListStyling();
}

TabbedNavigation.prototype.createTabHeadings = function () {
  $('div.module').each(function () {
    var headingText = $(this).children('h2').text();
    $('<li></li>').text(headingText).attr('rel', '#' + headingText).appendTo('ul.tabs');
  });
}

TabbedNavigation.prototype.tabListStyling = function () {
  $('ul.tabs').css({
    float: 'left',
    marginLeft: 0,
    width: 100 + '%'
  });

  $('ul.tabs li').css({
    cursor: 'pointer',
    float: 'left',
    listStyle: 'none',
    margin: 0,
    marginRight: 20 + 'px',
    padding: 0
  });
}

TabbedNavigation.prototype.bindEvent = function () {
  $('ul.tabs li').each(function () {
    $(this).on('click', function () {
      $(this).addClass('current').siblings().removeClass('current');

      var findRel = $(this).attr('rel').toLowerCase();
      $('div.module').hide();
      $(findRel).show()
    });
  });
}

TabbedNavigation.prototype.showFirstTabModule = function () {
	$('ul.tabs li:first').addClass('current');
	$('div.module:first').show();
}

$(document).ready(function () {
  var tabs = new TabbedNavigation();

  tabs.initHideModules();
  tabs.createTabLinks();
  tabs.showFirstTabModule();
  tabs.bindEvent();
});