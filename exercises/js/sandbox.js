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