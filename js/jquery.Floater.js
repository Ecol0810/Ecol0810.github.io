/**
*  Jquery floater ???? ?? ??? ???? ?? ???? ??
*
* options
*
*  allwaysTop : true ,  ?? ? false ??????
*  speed  : 1000  ????? ??
*  bottom : false ?? ???
*  default_x : ?????? ???? ?? ??? ???
* 
* @since 2009-10-30
* @author jsyang <yakuyaku@gmail.com>
* @version 1
*
*/
(function($) {

	$.extend($.fn, { //??? ??? ??? ??? merge??.
		Floater : function(setting)
		{
			var options = $.extend($.fn.Floater.defaults, setting);
			//???? ????? ???, ???.
			var box   = this;
			var initTop = options.initTop; //??? ?? 250
			
			if(options.bottom) { //?? ??? ???
				bottom_pos = $(window).height() - $(box).height() - initTop;
				$(box).css('top' , bottom_pos);
				initTop = bottom_pos; //????? ??...
			}

			if(options.default_x) { //?????? ???? ?? ??? ???.
				box.css('left' , getX($(options.default_x)) );
				if(box.css('display')=='none') box.css('display','block');
				//?? ??? ?...
				$(window).bind('resize', function() {//??? ?? ??
					box.css('left' , getX($(options.default_x)));
					//??? ?????? ??? ???
				});

			}

			var prevTop = initTop; //???? ??? ???? ??? ??.

			$(window).bind('scroll', function(e){adjustTop();});
				//?? ????? ?? ???? ??
			function getX(el)
			{
				return el.get(0).offsetLeft + el.width();
				//????? ???? ????(????)? ?? +???.
			};

			function adjustTop() //?? ????? ?? ???? ??...
			{
				var newTop = computeTop();
				if (newTop <= initTop) newTop = initTop;
				if (prevTop != newTop) {//??? ?? ??? ???? ??? ????..
					layerMove(newTop); //??? ?? ??? ??.
					prevTop = newTop; //??? ?? ??? ???? ???
				}
			};

			function layerMove(dest) //???? ??? ??
			{
				if(options.alwaysTop) { //true, ?? ?? ?????
					//var posx=$(window).scrollLeft() + $(window).width() - $(box).width();
					$(box).css({'top': dest}); //top?? ??
				}else{ //??? ???
					$(box).stop(); //????
					$(box).animate({'top': dest},{'duration':options.speed});
					 //??? ??
				}
			};

			function computeTop() //top? ??? ??
			{
				return $(window).scrollTop() + initTop;//???? ??? ??? ??
			};
		}

	});

	$.fn.Floater.defaults = {
		'alwaysTop' : false , //true?? ??
		'bottom'    : false ,
		'default_x' : false ,
		'initTop'   : 50 , //???? ??
		'speed' : 30 //??
	};

})(jQuery);