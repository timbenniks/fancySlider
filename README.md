# fancySlider

A simple range input polyfilll

## Getting Started
Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/timbenniks/fancySlider/master/dist/fancySlider.0.1.0.min.js
[max]: https://raw.github.com/timbenniks/fancySlider/master/dist/fancySlider.0.1.0.js

In your web page:

``` html
<input type="range" min="0" max="1" step="0.1" data-options='{"startPos": "0"}' name="slider" id="fancySlider">
```

``` javascript
$(function()
{
	// Init as jQuery plugin.
	$('#fancySlider').fancySlider();
		
	// Use the global functions of the slider.
	var sliderApi = $('#fancySlider').data('fancySlider');
		
	// Listen to the events that are triggere don the slider DOM node.	
	$('#fancySlider').on('slide', function(e)
	{
		console.log(e.position);
	});
		
	// Trigger events on the slider DOM node.
	$('button').click(function()
	{
		$('#fancySlider').trigger({ type: 'slideTo', position: 0.3 });
	});
});	
```

## Documentation
_(Coming soon)_

## Examples
_(Coming soon)_

## Release History
_(Nothing yet)_

## License
Copyright (c) 2012 Tim Benniks  
Licensed under the MIT license.