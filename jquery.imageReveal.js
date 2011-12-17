(function($){
	$.fn.imageReveal = function(options) {

		var defaults = {
			width: 493,
			height: 308,
			useImageSize: false
		};
		var options = $.extend(defaults, options);
		
		var iw = options.width;
		var ih = options.height;

		if(options.useImageSize)
		{
			//get first image width + height
			iw = this.find('img:eq(0)').width();
			ih = this.find('img:eq(0)').height();
		}
		
		//number of images
		var inum = this.find('img').length;
		
		//get width of mask
		var mw = iw/inum;
		
		//set selector to have set width and height with overflow hidden
		//this.css({overflow:'hidden',width:iw,height:ih,position:'relative'});
		this.css({width:iw,height:ih});

		//replace each image with div background
		this.find('img').each(function(k,v) {
			//$(this).replaceWith('<div class="msk" style="height:'+ih+'px;width:'+mw+'px;left:'+k*mw+'px;background-image:url('+v.src+');background-position:-'+k*mw+'px"></div>');
			$(this).wrap('<a href="" class="msk" style="display:block;position:absolute;overflow:hidden;height:'+parseInt(ih)+'px;width:'+parseInt(mw)+'px;left:'+parseInt(k*mw)+'px;background-image:url('+v.src+');background-position:-'+parseInt(k*mw)+'px;z-index:'+k+';"></a>').remove();
		});
		
		//add event handlers
		this.find('a').each(function(k,v) {
			var l = $(v).css('left');
			var w = $(v).css('width');
			var z = $(v).css('z-index');
			var bp = $(v).css('background-position-x');
			
			$(this).hover(function() {
				//alert($(v).css('background-position-x'));
				//$(v).css({left:w*2});					
				//if(parseInt(l) == 0) {
				if(k == 0) {
					//first
					$(v).css({'z-index':99999999}).stop().animate({width:mw*2}, {queue: false,duration: 500 });
					//$(this).parent().find('div').not(v).animate({width:mw/2,left:'+='+mw}, 500);
					$(this).parent().find('a').not(v).each(function(k1,v1) {
						$(this).stop().animate({width:mw/2,left:(k1+4) * mw/2}, {queue: false,duration: 500 });
					});
				}
				//else if(parseInt(l) == (Math.floor(mw * (inum-1))))
				else if(k == inum-1)
				{
					//last
					$(v).css({'z-index':99999999}).stop().animate({backgroundPosition:-mw,width:mw*2,left:Math.floor(mw*(inum-2))}, {queue: false,duration: 500 });
					
					$(this).parent().find('a').not(v).each(function(k2,v2) {
						$(this).stop().animate({width:mw/2,left:k2 * mw/2}, {queue: false,duration: 500 });
					});
					
				} else {
					//middles
					$(v).css({'z-index':999999999}).stop().animate({width:mw*2,left:mw/2,backgroundPosition:'+='+mw/2}, {queue: false,duration: 500 });
				}
			},function() {
				$(v).stop().animate({left:l,width:w,backgroundPosition:bp}, {queue: false,duration: 500 }, function() {
					$(this).css('z-index',k);
				});
				$(this).parent().find('a').each(function(k3,v3) {
					$(this).stop().animate({width:mw,left:k3*mw,backgroundPosition:'-'+k3*mw,'z-index':k3}, {queue: false,duration: 500 });
				});
			});
		});		
	};
})(jQuery);