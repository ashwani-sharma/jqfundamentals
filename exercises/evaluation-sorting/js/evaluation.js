var PrioritySort = function ($listContainer) {
  this.$listContainer = $listContainer;
}

PrioritySort.prototype.initMethods = function () {
  this.getInitiallySortedItems(this.$listContainer);
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
  this.$listContainer.each(function () {
    var $this = $(this),
        count = $this.attr('initial-items-count') - 1,
        linkSee = $('<a/>').attr('href', 'javascript:').addClass('see-all').text('see all'),
        linkHide = $('<a/>').attr('href', 'javascript:').addClass('see-less').text('see less').hide(),
        linkHolder = $('<li/>').addClass('link-holder').append(linkSee, linkHide).appendTo($this);

    $this.find('li.row:gt(' + count + ')').hide();
  });
}

PrioritySort.prototype.bindEvents = function () {
  this.bindSeeAllLink();
  this.bindSeeLessLink();
}

PrioritySort.prototype.bindSeeAllLink = function () {
  var _this = this;

  _this.$listContainer.on('click', 'a.see-all', function () {
    var $this = $(this);
    $this.closest(_this.$listContainer).find('li.row:hidden').show();
    $this.closest(_this.$listContainer).html($this.closest(_this.$listContainer).find('li').sort(function(x, y) {
      return $(x).text() < $(y).text() ? -1 : 1;
    }));

    $this.hide().siblings().show().closest('li').appendTo($this.closest(_this.$listContainer));
  });
}

PrioritySort.prototype.bindSeeLessLink = function () {
  var _this = this;
  _this.$listContainer.on('click', 'a.see-less', function () {
    var $this = $(this),
        count = $this.closest(_this.$listContainer).attr('initial-items-count') - 1;
    
    _this.getInitiallySortedItems($this.closest(_this.$listContainer));

    $this.closest(_this.$listContainer).find('li.row:gt(' + count + ')').hide();
    $this.hide().siblings().show().closest('li').appendTo($this.closest(_this.$listContainer));
  });
}

$(function () {
  var priority = new PrioritySort($('.priority-sort'));
  priority.initMethods();
});