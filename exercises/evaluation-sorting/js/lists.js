var Lists = function(list_collection){
  this.lists = []
  list_collection.each(function(index, list){
    list = new List($(list))
    this.lists.push(list);
  });
  return this.lists;
}