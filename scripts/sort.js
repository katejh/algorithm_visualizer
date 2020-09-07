// global variables initialized with default values
var array_size = 100;
var array_item_width = 10;
var max_value = 100;
var array = [];

/*
 * Array item elements look like the following:
 * 
 * Element: an array item
 * 
 * id: "array-item-{int}", where int is the item's initial position in the array
 * 
 * Classes:
 *  array-item
 *  sorted (optional, should only be added when the element is considered sorted in the array)
 * 
 * Styles:
 *  left - the position it appears on the page should correspond to its current position in the array
 *  height - height should correspond to its data-value
 *  width
 * 
 * data-value: a generated integer for the element, to be used when sorting
 * data-initial-position: the item's initial position in the array
 * data-current-position: the item's current position in the array, updates while it is being sorted (will be final position after finished sorting)
 */

// function for all event handlers
function activateEventHandlers(){
    // event handler for array size being changed by number inout
    document.getElementById("array-size-number-input").addEventListener("change", function(){
        setArraySize(document.getElementById("array-size-number-input").value);
    });
    // event handler for testing the switching of items
    document.getElementById("test-switch-array-items").addEventListener("click", function(){
        switchItemsPrototype(10, 40);
    });
}

// function for initializing the page
function initializePage(){
    // initialize default array size
    setArraySize(array_size);
}

// sets array size and updates values in DOM
function setArraySize(size){
    array_size = size;
    console.log("array size changed to: " + array_size);
    document.getElementById("array-size-range-input").value = array_size;
    document.getElementById("range-slider-span").innerHTML = array_size;
    document.getElementById("array-size-number-input").value = array_size;
    createRandomArray(array_size);
}

function createRandomArray(size){
    var arrayDisplay = document.getElementById("sorting-display");
    
    // empty array
    window.array = [];

    // empty array display first
    while(arrayDisplay.firstChild){
        arrayDisplay.removeChild(arrayDisplay.lastChild);
    }
    $("#sorting-display").empty();
    // alternatively:
    // newArrayDisplay = arrayDisplay.cloneNode(false);
    // arrayDisplay.parentNode.replaceChild(newArrayDisplay, arrayDisplay);

    var pos_left = 0;

    for (var i = 0; i < size; i++){
        // get random numerical value between 1 and max_value
        var value = Math.floor(Math.random() * max_value + 1);

        // create element
        var item = document.createElement("div");
        item.classList.add("array-item");
        item.id = "array-item-" + i.toString();
        item.setAttribute("data-value", value.toString());
        item.setAttribute("data-initial-position", i.toString());
        item.setAttribute("data-current-position", i.toString());

        // generate element's appearance
        item.style.left = pos_left + "px";   
        item.style.height = value + "px";
        item.style.width = array_item_width + "px";
        
        pos_left += array_item_width;

        console.log("generating array-item-" + i + " with data-value of " + value);

        // add to the array
        window.array.push(item);
        arrayDisplay.appendChild(item);
    }
}

// prototype for creating array
function createArrayPrototype(){
    
    var arrayDisplay = document.getElementById("sorting-display");
    array = [];
    var pos_left = 0;
    for (var i = 0; i < array_size; i++){
        array.push(i);
        console.log("creating item " + i);

        var item = document.createElement("div");
        item.classList.add("array-item");
        item.id = "array-item-" + i.toString();
        item.style.left = pos_left + "px";
        pos_left += array_item_width;
        item.style.height = i + "px";
        item.style.width = array_item_width + "px";
        arrayDisplay.appendChild(item);
    }
}

// prototype for switching array items
function switchItemsPrototype(item1, item2){
    console.log("Switching items " + item1.toString() + " and " + item2.toString());

    var array_item_1 = document.getElementById("array-item-" + item1.toString());
    var array_item_2 = document.getElementById("array-item-" + item2.toString());

    var temp_item = array_item_1.cloneNode();

    // reassign IDs
    array_item_1.id = array_item_2.id;
    array_item_2.id = temp_item.id;

    // animate moving to positions
    $("#" + array_item_1.id).animate({
        left: array_item_2.style.left,
    });
    $("#" + array_item_2.id).animate({
        left: temp_item.style.left,
    });
}

// activate functions
$(document).ready(function(){  
    activateEventHandlers();
    initializePage();
});



/* 
TODO: 
    complete stylesheet for showing array
    while the array is sorting, make certain buttons uninteractable
    add ability to speed up or slow down animation speed
    set default array size at the start
    (DONE)make the sorting array items as elements instead of simple numbers and let these elements be represented by their values
    (DONE)add attributes for original position and new position
    create function to simplify creating an item
    adjust array-item width based on array_size
    make ability to change max value
    (DONE)allow array to change while the slider is being changed
 */