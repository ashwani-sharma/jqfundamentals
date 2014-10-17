var PrioritySort = function ($ul) {
  this.$ul = $ul;
}

PrioritySort.prototype.initMethods = function () {
  this.getInitiallySortedItems(this.$ul);
  this.displayLiCountWithLinks();
  this.bindEvents();
}

PrioritySort.prototype.getInitiallySortedItems = function (block) {
  block.each(function () {
    var $this = $(this);
    $this.find('li.row').sort(function (x, y) {
      return $(x).attr('priority-order') - $(y).attr('priority-order');
    }).appendTo($this);
  });
}

PrioritySort.prototype.displayLiCountWithLinks = function () {
  this.$ul.each(function () {
    var $this = $(this),
        count = $this.attr('initial-items-count') - 1,
        linkSee = $('<a/>').attr('href', 'javascript:').addClass('see-all').text('see all'),
        linkHide = $('<a/>').attr('href', 'javascript:').addClass('see-less').text('see less').hide(),
        linkHolder = $('<li></li>').addClass('link-holder').append(linkSee, linkHide).appendTo($this);

    $this.find('li.row:gt(' + count + ')').hide();
  });
}

PrioritySort.prototype.bindEvents = function () {
  this.bindSeeAllLink();
  this.bindSeeLessLink();
}

PrioritySort.prototype.bindSeeAllLink = function () {
  var _this = this;

  _this.$ul.on('click', 'a.see-all', function () {
    var $this = $(this);
    $this.closest(_this.$ul).find('li.row:hidden').show();
    $this.closest(_this.$ul).html($this.closest(_this.$ul).find('li').sort(function(x, y) {
      return $(x).text() < $(y).text() ? -1 : 1;
    }));

    $this.hide().siblings().show().closest('li').appendTo($this.closest(_this.$ul));
  });
}

PrioritySort.prototype.bindSeeLessLink = function () {
  var _this = this;
  _this.$ul.on('click', 'a.see-less', function () {
    var $this = $(this),
        count = $this.closest(_this.$ul).attr('initial-items-count') - 1;
    
    _this.getInitiallySortedItems($this.closest(_this.$ul));

    $this.closest(_this.$ul).find('li.row:gt(' + count + ')').hide();
    $this.hide().siblings().show().closest('li').appendTo($this.closest(_this.$ul));
  });
}

$(function () {
  var priority = new PrioritySort($('ul.priority-sort'));
  priority.initMethods();
});