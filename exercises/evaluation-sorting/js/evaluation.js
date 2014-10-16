var PrioritySort = function ($ul, $li) {
  this.$ul = $ul;
  this.$li = $li;
  this.$liHeight = this.$li.innerHeight();
}

PrioritySort.prototype.initMethods = function () {
  this.getInitiallySortedItems(this.$ul);
  this.displayLiCountWithSeeAllLink();
  this.bindEvents();
}

PrioritySort.prototype.getInitiallySortedItems = function (block) {
  var _this = this;
  block.each(function () {
    var $this = $(this);
    $this.find(_this.$li).sort(function (x, y) {
      return x.getAttribute('priority-order') - y.getAttribute('priority-order');
    }).appendTo($this);
  });
}

PrioritySort.prototype.displayLiCountWithSeeAllLink = function () {
  var _this = this;

  _this.$ul.each(function () {
    var $this = $(this),
        count = $this.attr('initial-items-count'),
        link = $('<a/>').attr('href', 'javascript:').addClass('see-all').text('see all'),
        linkHolder = $('<li></li>').append(link);

    linkHolder.insertAfter($this.find('li').eq(count - 1));
    $this.height(_this.$liHeight * count);
  });
}

PrioritySort.prototype.bindEvents = function () {
  this.bindSeeAllLink();
  this.bindSeeLessLink();
}

PrioritySort.prototype.bindSeeAllLink = function () {
  var _this = this;

  _this.$ul.on('click', 'a.see-all', function () {
    var $this = $(this),
        link = $('<a/>').attr('href', 'javascript:').addClass('see-less').text('see less'),
        linkHolder = $('<li></li>').append(link);

    $this.closest(_this.$ul).css('height', 'auto');

    $this.closest(_this.$ul).html($this.closest(_this.$ul).find('li').sort(function(x, y) {
      return $(x).text() < $(y).text() ? -1 : 1;
    }));

    linkHolder.appendTo($this.closest(_this.$ul));
    $this.closest('li').hide();
  });
}

PrioritySort.prototype.bindSeeLessLink = function () {
  var _this = this;
  _this.$ul.on('click', 'a.see-less', function () {
    var $this = $(this),
        count = $this.closest(_this.$ul).attr('initial-items-count'),
        link = $('<a/>').attr('href', 'javascript:').addClass('see-all').text('see all'),
        linkHolder = $('<li></li>').append(link);
    
    _this.getInitiallySortedItems($this.closest(_this.$ul));

    $this.closest(_this.$ul).height(_this.$liHeight * count);
    linkHolder.insertAfter($this.closest(_this.$ul).find('li.row').eq(count - 1));

    $this.remove();
  });
}

$(function () {
  var priority = new PrioritySort($('ul.priority-sort'), $('.row'));
  priority.initMethods();
});