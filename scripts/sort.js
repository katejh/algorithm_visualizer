// global variables
var array_size = 100;
var array_item_width = 10;

// function for all event handlers
function activateEventHandlers(){
    // event handler for when range slider changes number
    document.getElementById("array-size-range-input").onchange = getArraySize;
    // event handler for when number input changes
    document.getElementById("array-size-number-input").onchange = getArraySize;
}

// gets array size and updates values in DOM
function getArraySize(){
    array_size = this.value;
    console.log("Array size: " + array_size);
    document.getElementById("array-size-range-input").value = array_size;
    document.getElementById("range-slider-span").innerHTML = array_size;
    document.getElementById("array-size-number-input").value = array_size;
}

activateEventHandlers();

// prototype for creating array
var arrayDisplay = document.getElementById("sorting-display");
var array = [];
var pos_left = 0;
for (var i = 1; i <= array_size; i++){
    array.push(i);
    console.log("creating item " + i);

    var item = document.createElement("div");
    item.classList.add("array-item");
    item.style.left = pos_left + "px";
    pos_left += array_item_width;
    item.style.height = i + "px";
    item.style.width = array_item_width + "px";
    arrayDisplay.appendChild(item);
}

// TODO: complete stylesheet for showing array
// TODO: CSS pointer events
// while the array is sorting, make certain buttons uninteractable
// TODO: reorganize so that everything is neatly in functions and stuff to make flow more readable