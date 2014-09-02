var LoadAjaxData = function ($targetElement){
  this.$targetElement = $targetElement;
}

LoadAjaxData.prototype = {
  createDataContainer: function () {
    this.$targetElement.each(function () {
      var $dataContainer = $('<div></div>').addClass('blog-data').appendTo($(this).parent('li'));
      $(this).data('targetDiv', $dataContainer);
    });
  },

  loadBlogData: function () {
    this.$targetElement.bind('click', function (e) {
      e.preventDefault();

      var dataRef = $(this).parent('li').find('a').attr('href'),
          // $target = $(this).parent('li').find('.blog-data'),
          dataHash = dataRef.substring(dataRef.indexOf('#'));

      // $($target).load('data/blog.html ' + dataHash);
      $(this).data('targetDiv').load('data/blog.html ' + dataHash);
    });
  }
}

$(document).ready(function () {
  var loadAjaxData = new LoadAjaxData($('#blog h3'));

  loadAjaxData.createDataContainer();
  loadAjaxData.loadBlogData();
});