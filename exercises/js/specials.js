var LoadJsonContent = function (){}

LoadJsonContent.prototype = {
  insertBlankContainer: function () {
    var $targetDiv = $('<div class="json-content" />').appendTo('#specials');
    $targetDiv.append('<h1 /><p /><img />');
  },

  callJsonData: function () {
    var $targetContainer = $('div.json-content'),
        $days = $('#specials').find('form select'),
        cachedJson = {};

    $days.change(function () {
    	var $selectedValue = $(this).val();
      $('#specials form .input_submit').remove();
      $.getJSON('data/specials.json', function (data) {
        cachedJson = data;

        $targetContainer.css('background', cachedJson[$selectedValue].color);
        $targetContainer.find('h1').html(cachedJson[$selectedValue].title);
        $targetContainer.find('p').html(cachedJson[$selectedValue].text);
        $targetContainer.find('img').attr('src', cachedJson[$selectedValue].image);
      });
    });
  }
}

$(document).ready(function () {
  var loadJsonContent = new LoadJsonContent();
  loadJsonContent.insertBlankContainer();
  loadJsonContent.callJsonData();
});