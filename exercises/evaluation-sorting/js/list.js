var List = function (block) {
  listArray = [];
  this.init = function () {
    this.createBlocks(block);
  }
}

List.prototype.createBlocks = function (block) {
  block.each(function (index, el) {
    var $el = $(el),
        obj = {'class': $el.attr('class'), 'initialCount': Number($el.attr('initial-items-count'))};

    listArray.push(obj);
    
  });
  return listArray;
}