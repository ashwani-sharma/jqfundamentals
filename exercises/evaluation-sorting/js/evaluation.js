var PrioritySort = function ($ul, $li) {
  this.$ul = $ul;
  this.$li = $li;
  this.$liHeight = this.$li.innerHeight();
}

PrioritySort.prototype.initMethods = function () {
  this.sortListItemsByPriorityOrder();
  this.displayLiCount();
  this.addSeeAllLink();
  this.bindSeeAllLink();
  this.bindSeeLessLink();
}

PrioritySort.prototype.sortListItemsByPriorityOrder = function () {
  var _this = this;
  _this.$ul.each(function () {
    var $this = $(this);
    $this.find(_this.$li).sort(function (a, b) {
      return +a.getAttribute('priority-order') - +b.getAttribute('priority-order');
    }).appendTo($this);
  });
}

PrioritySort.prototype.displayLiCount = function () {
  var _this = this;

  _this.$ul.each(function () {
    var $this = $(this),
        count = $this.attr('initial-items-count');

    $this.height(_this.$liHeight * count - 13);
  });
}

PrioritySort.prototype.addSeeAllLink = function () {
  var _this = this;

  _this.$ul.each(function () {
    var $this = $(this),
        count = $this.attr('initial-items-count');

    $('<li><a href="javascript:" class="see-all">see all</a></li>').insertAfter($this.find('li').eq(count - 1));
    $this.height($this.height() + _this.$liHeight);
  });
}

PrioritySort.prototype.bindSeeAllLink = function () {
  var _this = this,
      arr = [];

  _this.$ul.on('click', 'a.see-all', function () {
    var $this = $(this);
    $this.closest(_this.$ul).css('height', 'auto');

    $this.closest(_this.$ul).html($this.closest(_this.$ul).find('li').sort(function(x, y) {
      return $(x).text() < $(y).text() ? -1 : 1;
    }));

    // $this.closest(_this.$ul).find(_this.$li).each(function () {
    //   arr.push($(this).text());
    // });

    // $this.closest(_this.$ul).find(_this.$li).remove();
    // arr.sort();

    // for(i = 0; i < arr.length; i++) {
    //   $('<li class="row">' + arr[i] + '</li>').appendTo($this.closest(_this.$ul));
    // }

    $('<li><a href="javascript:" class="see-less">see less</a></li>').appendTo($this.closest(_this.$ul));
    $this.closest('li').remove();
    arr = [];
  });
}

PrioritySort.prototype.bindSeeLessLink = function () {
  var _this = this;
  _this.$ul.on('click', 'a.see-less', function () {
    var $this = $(this),
        count = $this.closest(_this.$ul).attr('initial-items-count');
    
    $this.closest(_this.$ul).each(function () {
      $(this).find('li').sort(function (a, b) {
        return +a.getAttribute('priority-order') - +b.getAttribute('priority-order');
      }).appendTo($(this));
    });

    $this.closest(_this.$ul).height(_this.$liHeight * count + 8);
    $('<li><a href="javascript:" class="see-all">see all</a></li>').insertAfter($this.closest(_this.$ul).find('li.row').eq(count - 1));

    $this.remove();
  });
}

$(function () {
  var priority = new PrioritySort($('ul.priority-sort'), $('ul.priority-sort .row'));
  priority.initMethods();
});