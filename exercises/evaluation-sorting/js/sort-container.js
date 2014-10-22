var SortContainer = function () {}

$(function () {
	var list = new List($('ul.priority-sort')),
			sortContainer = new SortContainer();

	list.init();
});