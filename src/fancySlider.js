/* 
*	@Class:			fancySlider v2
*	@Description:	A simple slider script which acts as a polyfill for the range input.
*	@Author:		Tim Benniks <tim@timbenniks.nl>
*	@Dependencies:	jQuery
*	@Licence:		MIT
*	@Project page:	http://fancyslider.timbenniks.nl
---------------------------------------------------------------------------- */

(function (win)
{
	'use strict';

	/**
	 * Slider Constructor.
	 * @param {HTMLElement} el node.
	 * @param {object} options options object
	 * @constructor
	 */
	win.Slider = function (el, options)
	{
		var element = $(el),
			track = $('<div class="slider-track" />'), 
			head = $('<div class="slider-head" />'), 
			glass = $('<div class="slider-glass" />'), 
			base = $('<div class="slider-base" />').append(track, head, glass).addClass(el.className),
			headWidth, width, maxHeadX, grabX,
			doc = $(document),
			startPos = options.startPos || 0,
			onSlide = options.onSlide,
			onSlideEnd = options.onSlideEnd,

		init = function()
		{
			element.after(base).hide();

			headWidth = head.width();
			width = base.width();
			maxHeadX = width - headWidth + 1;
			grabX = headWidth / 2;
			
			setPosition(startPos);

			glass.on('mousedown touchstart', handleDown);
		},

		handleDown = function(e)
		{
			e.preventDefault();

			var posX = getRelativePosition(glass[0], e),			
				headX = getPositionFromNode(head[0]) - getPositionFromNode(base[0]);
			
			if(posX >= headX && posX < headX + headWidth) 
			{
				grabX = posX - headX;
			}

			setPosition(posX - grabX);

			doc.on(
			{
				'mousemove touchmove': handleMove,
				'mouseup touchend': handleEnd
			});
		},

		handleMove = function(e)
		{
			e.preventDefault();
			var posX = getRelativePosition(glass[0], e);
			setPosition(posX - grabX);	
		},

		handleEnd = function(e)
		{
			var posX = getRelativePosition(glass[0], e);
			if(onSlideEnd && typeof onSlideEnd === 'function') onSlideEnd(posX - grabX);

			doc.off('mousemove touchmove mouseup touchend');
		},

		cap = function(t, mi, ma) 
		{
			if(t < mi) return mi;
			if(t > ma) return ma;
		
			return t;
		},

		setPosition = function(e)
		{	
			var pos = Math.round(cap(e, 0, maxHeadX));

			head[0].style.left = pos + 'px';

			if(onSlide && typeof onSlide === 'function') onSlide(pos);
		},

		getPositionFromNode = function(node) 
		{
			var x = 0;
		
			while (node !== null) 
			{
				x += node.offsetLeft;
				node = node.offsetParent;
			}
	
			return x;
		},

		getRelativePosition = function(node, e)
		{
			return (e.pageX || e.originalEvent.touches[0].pageX) - getPositionFromNode(node);
		};

		init();

		return {
			set: setPosition
		};
	};

}(window));