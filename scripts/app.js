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
	var index = state.items.indexOf(item.children("span").text());
	console.log(index);
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
			$(this).children("span").toggleClass("shopping-item__checked", true);
		} else if (state.checked[index]===false) {
			$(this).children("span").toggleClass("shopping-item__checked", false);
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

$('.shopping-list').on("click", ".shopping-item-delete", function(event) {
	event.preventDefault();
	removeItem(state, $(this).parent().parent());
	renderList(state, $(".shopping-list"));
	renderChecked(state, $(".shopping-list"));
});

$('.shopping-list').on("click", ".shopping-item-toggle", function(event) {
	event.preventDefault();
	toggleChecked(state, $(this).parent().parent().children("span").text());
	renderChecked(state, $(".shopping-list"));
});