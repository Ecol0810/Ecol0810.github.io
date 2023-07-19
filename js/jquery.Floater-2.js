/**
*  Jquery floater 레이어를 항상 화면에 떠있거나 따라 다니도록 처리
*
* options
*
*  allwaysTop : true ,  항상 위 false 따라다니도록
*  speed  : 1000  따라다니는 속도
*  bottom : false 항상 하단에
*  default_x : 중앙정렬일때 엘리먼트 옆에 퀵메뉴 붙히기
* 
* @since 2009-10-30
* @author jsyang <yakuyaku@gmail.com>
* @version 1
*
*/
(function($) {

	$.extend($.fn, { //다수의 객체를 하나로 합치는 merge기능.
		Floater : function(setting)
		{
			var options = $.extend($.fn.Floater.defaults, setting);
			//떠있거나 따라다니는 기본값, 세팅값.
			var box   = this;
			var initTop = options.initTop; //탭메뉴 위치 250
			
			if(options.bottom) { //만약 하단에 있다면
				bottom_pos = $(window).height() - $(box).height() - initTop;
				$(box).css('top' , bottom_pos);
				initTop = bottom_pos; //초기값으로 이동...
			}

			if(options.default_x) { //중앙정렬일때 엘리먼트 옆에 퀵메뉴 붙이기.
				box.css('left' , getX($(options.default_x)) );
				if(box.css('display')=='none') box.css('display','block');
				//박스 보이게 해...
				$(window).bind('resize', function() {//크기에 맞게 조정
					box.css('left' , getX($(options.default_x)));
					//박스를 왼쪽으로하여 퀵메뉴 붙이기
				});

			}

			var prevTop = initTop; //퀵메뉴의 위치를 이전탑의 위치에 담기.

			$(window).bind('scroll', function(e){adjustTop();});
				//맨위 오브젝트가 값이 변경되면 호출
			function getX(el)
			{
				return el.get(0).offsetLeft + el.width();
				//부모요소를 기준으로 왼쪽위치(픽셀단위)를 반환 +가로값.
			};

			function adjustTop() //맨위 오브젝트가 값이 변경되면 호출...
			{
				var newTop = computeTop();
				if (newTop <= initTop) newTop = initTop;
				if (prevTop != newTop) {//새로운 탑의 위치와 이전탑의 위치가 다르다면..
					layerMove(newTop); //새로운 탑의 레이어 이동.
					prevTop = newTop; //새로운 탑의 위치를 이전탑의 위치로
				}
			};

			function layerMove(dest) //목적지로 레이어 이동
			{
				if(options.alwaysTop) { //true, 항상 위에 위치한다면
					//var posx=$(window).scrollLeft() + $(window).width() - $(box).width();
					$(box).css({'top': dest}); //top으로 이동
				}else{ //그렇지 않다면
					$(box).stop(); //멈췄다가
					$(box).animate({'top': dest},{'duration':options.speed});
					 //탑으로 이동
				}
			};

			function computeTop() //top의 위치를 계산
			{
				return $(window).scrollTop() + initTop;//상단에서 탭메뉴 위치로 반환
			};
		}

	});

	$.fn.Floater.defaults = {
		'alwaysTop' : false , //true이면 고정
		'bottom'    : false ,
		'default_x' : false ,
		'initTop'   : 50 , //스크롤의 위치
		'speed' : 30 //속도
	};

})(jQuery);