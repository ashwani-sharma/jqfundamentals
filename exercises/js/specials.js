var LoadJsonContent = function ($specials){
  this.$specials = $specials;
}

LoadJsonContent.prototype.initMethods = function () {
  this.insertBlankContainer();
  this.callJsonData();
}

LoadJsonContent.prototype.insertBlankContainer = function () {
  var $targetDiv = $('<div />').attr('class', 'json-content').appendTo(this.$specials);
  $targetDiv.append('<h1 /><p /><img />');
  this.$specials.find('.input_submit').remove();
}

LoadJsonContent.prototype.callJson = function () {
  var jsonData;
  $.ajax({
    url: "data/specials.json",
    type: "GET",
    dataType: "json",
    async: false,
    cache: true,
    success: function(data){
      jsonData = data;
    }
  });
  return jsonData;
}

LoadJsonContent.prototype.callJsonData = function () {
  var _this = this;
      $targetContainer = $('div.json-content'),
      $days = _this.$specials.find('form select');

  $days.change(function () {
    var currentHTML = $targetContainer.html(),
        value = $(this).val();

    if(!($(this).val())) {
      $targetContainer.html();
    }
    else {
      _this.getJsonData($targetContainer, value);
    }
  });
}

LoadJsonContent.prototype.getJsonData = function ($targetContainer, value) {
  var _this = this,
      cachedJson = _this.callJson(),
      jsonHtmlData = '<h1>' + cachedJson[value].title + '</h1><p>' + cachedJson[value].text + '</p><img src=' + cachedJson[value].image + '>';

  $targetContainer.css('background', cachedJson[value].color).html(jsonHtmlData);
}

$(function () {
  var loadJsonContent = new LoadJsonContent($('#specials'));
  loadJsonContent.initMethods();
});