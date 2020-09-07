

/* 
 * Makes range slider and size of array responsive
 * code thanks to Sean Stopnik at https://codepen.io/seanstopnik/pen/CeLqA
 */

var rangeSlider = function(){
    var slider = $('.range-slider'),
        range = $('.range-slider__range'),
        value = $('.range-slider__value');
      
    slider.each(function(){
  
      value.each(function(){
        var value = $(this).prev().attr('value');
        $(this).html(value);
      });
  
      range.on('input', function(){
        window.array_size = parseInt(this.value);
        console.log("array size changed to: " + array_size);

        // update necessary elements to reflect change in array size
        $(this).next(value).html(this.value);
        createRandomArray(parseInt(this.value));
        $("#array-size-number-input").val(this.value);
      });
    });
  };
  
rangeSlider();

