/* 
*	@Class:			fancySlider
*	@Description:	A simple slider script which acts as a polyfill for the range input.
*	@Author:		Tim Benniks <tim@timbenniks.nl>
*	@Dependencies:	jQuery
*	@Licence:		MIT
*	@Project page:	http://fancyslider.timbenniks.nl
---------------------------------------------------------------------------- */

(function($)
{
	/*globals $*/
	var FancySlider = function(container, options)
	{
		this.options = $.extend({}, this.defaults, options);
		this.container = $(container);
		this.init();
	};
	
	FancySlider.prototype =
	{
		init: function()
		{
			this.track = $('<div class="slider-track" />');
			this.head = $('<div class="slider-head" />');
			this.glass = $('<div class="slider-glass" />');	
			this.base = $('<div class="slider-base" />').append(this.track, this.head, this.glass).addClass(this.container[0].className);
			
			this.container.after(this.base).hide();
			
			this.headWidth = this.head.width();
			this.width = this.base.width();
			this.maxHeadX = this.width - this.headWidth + 1;
			this.doc = $(document);
		
			this.assignListeners();
	
			setTimeout($.proxy(function() 
			{ 
				this.position(this.options.startPos);
				this.container.val(this.options.startPos);
			
			}, this), 0);
		},
	
		assignListeners: function()
		{
			this.glass.on('mousedown touchmove', $.proxy(function(e) 
			{
				e.preventDefault();
	
				var pos = this.getRelPos(this.glass[0], e),			
					grabX = this.headWidth / 2,
					headX = this.positionInt();
	
				if(pos.x >= headX && pos.x < headX + this.headWidth) 
				{
					grabX = pos.x - headX;
				}
	
				this.positionInt(pos.x - grabX);
	
				this.container.trigger({ type: 'slideStart', position: this.lerp(0, 0, this.maxHeadX, 1, (this.getPos(this.head[0]).x - this.getPos(this.base[0]).x)) }); 
	
				this.doc.on(
				{
					'mousemove': $.proxy(function(e)
					{
						e.preventDefault();
						var pos = this.getRelPos(this.glass[0], e);
						this.positionInt(pos.x - grabX);	
					}, this),
	
					'mouseup': $.proxy(function() 
					{
						this.doc.off('mousemove mouseup');
						this.container.trigger({ type: 'slideEnd', position: this.lerp(0, 0, this.maxHeadX, 1, (this.getPos(this.head[0]).x - this.getPos(this.base[0]).x)) });	
					}, this)
				});
			}, this));
	
			this.container.on(
			{
				'slideTo': $.proxy(function(e) { this.position(e.position); }, this),
				'slide': $.proxy(function(e) { this.container.val(e.position); }, this),
				'change': $.proxy(function(e) {	this.position($(e.currentTarget).val()); }, this)
			});
		},
	
		positionInt: function(e) 
		{
			if(!e)
			{
				return this.getPos(this.head[0]).x - this.getPos(this.base[0]).x;
			} 
			else 
			{
				var left = Math.round(this.cap(e, 0, this.maxHeadX)) + "px";
				this.head.css({ left: left });
			}
			
			this.container.trigger({ type: 'slide', position: this.lerp(0, 0, this.maxHeadX, 1, (this.getPos(this.head[0]).x - this.getPos(this.base[0]).x)) });
		},
		
		position: function(e) 
		{
			this.positionInt(this.lerp(0, 0, 1, this.maxHeadX, e));
		},
		
		cap: function(t, mi, ma) 
		{
			if(t < mi)
			{
				return mi;
			}
			
			if(t > ma)
			{
				return ma;
			}
		
			return t;
		},
		
		lerp: function(t0, v0, t1, v1, t) 
		{
			return (t - t0) * (v1 - v0) / (t1 - t0) + v0;
		},
		
		getPos: function(e) 
		{
			var x = 0, y = 0;
		
			while (e !== null) 
			{
				x += e.offsetLeft;
				y += e.offsetTop;
				e = e.offsetParent;
			}
	
			return { x: x, y: x };
		},
		
		getRelPos: function(to, event) 
		{
			var pos = this.getPos(to);
		
			return { 
				x: event.pageX - pos.x,
				y: event.pageY - pos.y
			};
		},
		
		defaults: 
		{
			startPos: 0
		}	
	};
	
	$.fn.fancySlider = function(options) 
	{
		return this.each(function()
		{
			var opts = $.extend({}, options, $(this).data('options')),
			instance = $.data(this, 'fancySlider') || $.data(this, 'fancySlider', new FancySlider(this, opts));
		});
	};

}(jQuery));