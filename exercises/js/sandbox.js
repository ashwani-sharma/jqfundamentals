// =========== Exercise 2.1 Selecting ============

// #1 selecting all div elements having class 'module'
$('div.module');

// #2 three selectors that use to get the third item in the #myList unordered list
$('#myList li:eq(2)'); //indexing starts with 0 in :eq selector
$('#myList li:nth-child(3)'); //indexing starts with 1 in nth selector
$('#myList li:nth-of-type(3)'); //indexing starts with 1 in nth selector

// #3 selecting the label for the search input using an attribute selector
$('label[for="q"]');

// #4 counting how many elements are hidden in the page
$(':hidden').length;

// #5 finding out how many image elements on the page having alt attribute
$('img[alt]').length;

// #6 selecting all of the odd table rows in the table body
$('table tr:odd');




// =========== Exercise 2.2 Traversing ============

// #1 selecting all image elements and logging their alt attributes
$('img').each(function () {
	console.log($(this).attr('alt'));
});

// #2 selecting the search input text box, then traverse up to the form and add a class to the form
$('input[name="q"]').parent('form').addClass('traversed');

// #3 selecting the list item inside #myList that has a class of "current" and remove that class from it; add a class of "current" to the next list item
$('#myList li.current').removeClass('current').next('li').addClass('current');

// #4 selecting the select element inside #specials; traverse your way to the submit button
$('#specials select').parent('li').next('li').children('input[type="submit"]');

// #5 selecting the first list item in the #slideshow element; add the class "current" to it, and then add a class of "disabled" to its sibling elements.
$('#slideshow').children('li').first().addClass('current').siblings().addClass('disabled');