fancySlider
===========
A simple slider script with a graceful fallback to an input or type range ot text.

Implementation
--------------
Include the slider.js file.
Slider.js is dpendent on jQuery.

``` html
	
	<input type="range" min="0" max="1" step="0.1" data-options='{"startPos": "0"}' name="slider" class="slider">
	<button>Move slider to 30%</button>
	
```

``` javascript
	
	$(function()
	{
		// init as jQuery plugin
		$('.slider').slider();
		
		// use the global functions of the slider ()
		var sliderApi = $('.slider').data('slider');
		
		// listen to the events that are triggere don the slider DOM node.	
		$('.slider').on('slide', function(e)
		{
			console.log(e.position);
		});
		
		// trigger events on the slider DOM node
		$('button').click(function()
		{
			$('.slider').trigger({ type: 'slideTo', position: 0.3 });
		});
	});
	
```