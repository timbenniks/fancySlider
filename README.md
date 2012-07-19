fancySlider
===========
A simple slider script which acts as a polyfill for the range input.

Implementation
--------------
Include the slider.js file.
Slider.js is dependent on jQuery.

``` html
<input type="range" min="0" max="1" step="0.1" data-options='{"startPos": "0"}' name="slider" class="slider">
```

``` javascript
$(function()
{
	// Init as jQuery plugin.
	$('.slider').slider();
		
	// Use the global functions of the slider.
	var sliderApi = $('.slider').data('slider');
		
	// Listen to the events that are triggere don the slider DOM node.	
	$('.slider').on('slide', function(e)
	{
		console.log(e.position);
	});
		
	// Trigger events on the slider DOM node.
	$('button').click(function()
	{
		$('.slider').trigger({ type: 'slideTo', position: 0.3 });
	});
});	
```

Licence
-------

Copyright (c) 2012 Tim Benniks
Licensed under the MIT license.