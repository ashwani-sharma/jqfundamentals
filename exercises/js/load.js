var LoadAjaxData = function (){}

LoadAjaxData.prototype = {
  createDataContainer: function () {
    $('#blog h3').each(function () {
      var $dataContainer = $('<div class="blog-data"></div>').appendTo($(this).parent('li'));
      $(this).data('targetDiv', $dataContainer);
    });
  },

  loadBlogData: function () {
    $('#blog h3').bind('click', function (e) {
      e.preventDefault();

      var $target = $(this).parent('li').find('.blog-data'),
          dataRef = $(this).parent('li').find('a').attr('href'),
          dataHash = dataRef.substring(dataRef.indexOf('#'));

      // $($target).load('data/blog.html ' + dataHash);
      $(this).data('targetDiv').load('data/blog.html ' + dataHash);
    });
  }
}

$(document).ready(function () {
  var loadAjaxData = new LoadAjaxData();
  loadAjaxData.createDataContainer();
  loadAjaxData.loadBlogData();
});