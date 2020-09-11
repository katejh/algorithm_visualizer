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
        switchItems(array[10], array[40]);
    });
    // button for activating merge sort
    document.getElementById("merge-sort").addEventListener("click", function(){
        array = sortMergeAscending(array);
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

/*
 * Creates an array of a given size and fills it with random values
 * 
 * @param size the size of the array
 * 
 * @returns void
 */
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

/* 
 * Sorts a given array using the merge sort algorithm
 * 
 * @param arr the array to be sorted
 * 
 * @returns the array sorted
 * 
 * TODO: implement button disabling and enabling, figure out why visualization is so wack
 */
function sortMergeAscending(arr) {
    // disable some buttons while sorting

    // sanity check: if array size is 1
    if (arr.length == 1) {
        return arr;
    }

    var middle_index = Math.trunc(arr.length / 2);

    // sort left and right halves of the array
    var arrLeft = sortMergeAscending(arr.slice(0, middle_index));
    var arrRight = sortMergeAscending(arr.slice(middle_index));
    
    // copy merged halves into array
    for (var i = 0; i < middle_index; i++) {
        // visualize switching array items
        switchItems(arr[i], arrLeft[i]);
        // switch in the actual array
        arr[i] = arrLeft[i];
    }  
    for (var i = middle_index; i < arr.length; i++) {
        switchItems(arr[i], arrRight[i - middle_index]);
        arr[i] = arrRight[i - middle_index];
    }

    // create new temporary array to temporarily store halves while reordering them
    var mergedArr = [];

    // merge halves
    var next_left = 0, next_right = 0;
    for (var i = 0; i < arr.length; i++) {
        // sanity check if left half is already completely merged
        if (next_left >= arrLeft.length) {
            mergedArr.push(arrRight[next_right]);
            next_right += 1;
        }
        // sanity check if right half is already completely merged
        else if (next_right >= arrRight.length) {
            mergedArr.push(arrLeft[next_left]);
            switchItems(arr[i], arrLeft[next_left]);
            next_left += 1;
        }
        // check the first unmerged element of each half and merge the element with the lesser data-value
        else if (parseInt(arrLeft[next_left].getAttribute("data-value")) < parseInt(arrRight[next_right].getAttribute("data-value"))) {
            mergedArr.push(arrLeft[next_left]);
            next_left += 1;
        }
        else {
            mergedArr.push(arrRight[next_right]);
            next_right += 1;
        }
    }

    console.log("merging both halves");
    // copy mergedArr into arr
    for (var i = 0; i < arr.length; i++) {
        switchItems(arr[i], mergedArr[i]);
        arr[i] = mergedArr[i];
    }

    // re-enable buttons

    return arr;

}

/*
 * In the array display, "physically" switches array items 
 * 
 * @param item1 an array item dom element to be switched
 * @param item2 the other array item dom element to be switched
 * 
 * @returns void
 */
function switchItems(item1, item2){
    console.log("Switching items " + item1.id + " and " + item2.id);

    var item_temp = item1.cloneNode();

    // reassign IDs
    item1.id = item2.id;
    item2.id = item_temp.id;

    // animate moving to positions
    $("#" + item1.id).animate({
        left: item2.style.left,
    }, "slow");
    $("#" + item2.id).animate({
        left: item_temp.style.left,
    }, "slow");
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
    (DONE)set default array size at the start
    (DONE)make the sorting array items as elements instead of simple numbers and let these elements be represented by their values
    (DONE)add attributes for original position and new position
    create function to simplify creating an item
    adjust array-item width based on array_size
    make ability to change max value
    (DONE)allow array to change while the slider is being changed
    change array item colors to indicated when sorting is done or not
 */