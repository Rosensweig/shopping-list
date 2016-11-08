// Single state item stores list
var state = {
	items: ["apples", "oranges", "milk", "bread"],
	checked: [false, false, true, false]
};

// State modification functions
function addItem(state, item) {
	if (item==="") {return;};
	state.items.push(item);
	state.checked.push(false);
};

function removeItem(state, item) {
	var index = state.items.indexOf(item.text());
	console.log(item);
	console.log(item.text());
	console.log($(item).text());
	state.items.splice(index, 1);
	state.checked.splice(index, 1);
};

function toggleChecked(state, item) {
	var index = state.items.indexOf(item);
	state.checked[index]= !state.checked[index];
};

// Render state functions
function renderList(state, element) {
	var itemsHTML = state.items.map(function(item) {
		var html = '<li><span class="shopping-item">'+item+'</span>'+
		'<div class="shopping-item-controls"><button class="shopping-item-toggle">'+
		'<span class="button-label">check</span></button>'+
		'<button class="shopping-item-delete">'+
		'<span class="button-label">delete</span>'+
		'</button></div></li>';
		return html;
	})
	element.html(itemsHTML);
};

function renderChecked(state, element) {
	var index=0;
	element.children("li").each(function(item){
		if (state.checked[index]===true) {
			$(this).first().toggleClass("shopping-item__checked");
		};
		index++;
	});
};

// Event listeners
$('#js-shopping-list-form').submit(function(event) {
	event.preventDefault();
	addItem(state, $("#shopping-list-entry").val());
	renderList(state, $(".shopping-list"));
	renderChecked(state, $(".shopping-list"));
});

$('.shopping-item-delete').click(function(event) {
	event.preventDefault();
	removeItem(state, $(this).closest(".button-label"));
	renderList(state, $(".shopping-list"));
	renderChecked(state, $(".shopping-list"));
});

$('.shopping-item-toggle').click(function(event) {
	event.preventDefault();
	toggleChecked(state, $(this).closest(".button-label").text());
	renderChecked(state, $(".shopping-list"));
});