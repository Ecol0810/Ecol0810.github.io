$(function () {

    var options = {
        "alwaysTop": false, //true이면 고정, 항상따라다니도록false
        "default_x": "#wrap", //가로축, 레이아웃이 가운데 정렬일때 레이어가 붙는 아이디 값
        "initTop": 350, //초기의 스크롤의 위치
        "speed": 500 //속도
    }
    $("#floatdiv").Floater(options);//레이러를 항상 화면에 떠있거나 따라다니도록 처리

    //페이지 위치
    $("#btn01").click(function () {
        $("html,body").animate({ scrollTop: $("#main").offset().top }, 800);
    });
    $("#btn02").click(function () {
        $("html,body").animate({ scrollTop: $("#profile").offset().top }, 800);
    });
    $("#btn03").click(function () {
        $("html,body").animate({ scrollTop: $("#web").offset().top }, 800);
    });
    $("#btn04").click(function () {
        $("html,body").animate({ scrollTop: $("#mobile01").offset().top }, 800);
    });
    $("#btn05").click(function () {
        $("html,body").animate({ scrollTop: $("#thankyou").offset().top }, 800);
    });

    var menu = $("#menuWrap>ul>li");
    var contents = $("#contents>div");
    var btn = $("#floatdiv ul li");

    //메뉴 클릭시 페이지로 이동
    menu.click(function (event) {
        event.preventDefault();
        var tg = $(this);
        var i = tg.index();
        var section = contents.eq(i);
        var tt = section.offset().top;//section을 top으로 이동한 값을 tt
        $("html,body").stop().animate({ scrollTop: tt });

    });

    //스크롤 이동시 메뉴와 버튼 활성화
    $(window).scroll(function () {
        var sct = $(window).scrollTop();
        contents.each(function () {
            var tg = $(this);
            var i = tg.index();
            if (tg.offset().top <= sct) {
                menu.removeClass("on");
                menu.eq(i).addClass("on");
                btn.removeClass("active");
                btn.eq(i).addClass("active");
            }
        });
    });


    //스크롤 이동시 컨텐츠 영역들 탑으로 이동
    $(window).scroll(function () {
        var sct = $(window).scrollTop();

        contents.each(function () {
            var tg = $(this);
            var i = tg.index();

            //스트롤탑의 위치가 top보다 크거나 같다면 tg를 특정좌표로 이동
            if (tg.offset().top <= sct) {
                switch (i) {
                    case 0:
                        skillsProgressbar();
                        break;
                }
            }
        });
    });

    //마우스 휠 이벤트: 브라우저 간 마우스 휠 속도 표준화
    //익스, 크롬, 사파리, 오페라:mousewheel 이라는 이벤트를 사용할 수 있고,파이어폭스 의 경우:DOMMouseScroll 이라는 이벤트를 사용
    //파이어 폭스는 mousewheel 이라는 이벤트가 없기 때문에 mousewheel 과 DOMMouseScroll 이벤트 두개를 동시에 걸어주는 메서드인 .on() 를 사용해야 함.

    $("div.mn").each(function () {
        $(this).on("mousewheel DOMMouseScroll", function (e) {
            e.preventDefault();
            var delta = 0;
            if (!event) event = window.event;

            if (event.wheelDelta) {
                delta = event.wheelDelta / 120; /* 익스,크롬,오페라 */
            } else if (event.detail) delta = -event.detail / 3; /* /3대신에 -40을 사용하기도함. 사파리 및 크롬에서 wheelDelta 는 마우스 휠의 경우 120대신 3을 사용 */

            var moveTop = null;

            //마우스 휠을 위에서 아래로
            if (delta < 0) {
                if ($(this).next() != undefined) {
                    moveTop = $(this).next().offset().top;
                }
            } else { //마우스 휠을 아래에서 위로
                if ($(this).prev() != undefined) {
                    moveTop = $(this).prev().offset().top;
                }
            }
            //화면이동 0.5초
            $("html,body").stop().animate({
                scrollTop: moveTop + "px"
            }, {
                duration: 500
            });
        });
    });


    $(".type").typed({
        strings: ["차근차근 짜맞추며" + "<br>" + "배워나가는 UI/UX 디자이너" + "<br>" + "류의정입니다."],
        typeSpeed: 70,
        backDelay: 500,
        loop: true,
        showCursor: true
    });



    //마우스 따라다니기
    $("#wrap").mousemove(function (e) {
        $(".cursor").css("top", e.pageY);
        $(".cursor").css("left", e.pageX);
    });


    //그래프
    function skillsProgressbar() {
        var htmlNum = 80;
        var cssNum = 85;
        var jqueryNum = 75;
        var phpNum = 65;
        var reactNum = 70;
        var figmaNum = 85;
        var photoshopNum = 80;
        var illustratorNum = 85;
        var githubNum = 70;
        var max = 100;
        var duration = 900;

        $(".bar").css("right", "100%");

        //html
        $("#html_bar").stop().animate({
            "right": 100 - (htmlNum / max * 100) + "%",
        }, {
            "duration": duration,
            "easing": "easeInOutQuart",
            "progress": function (animation, progress, msRemaining) {
                $("#html_cnt").text(Math.round(htmlNum * progress)); //반올림
            }
        });

        //css
        $("#css_bar").stop().animate({
            "right": 100 - (cssNum / max * 100) + "%",
        }, {
            "duration": duration,
            "easing": "easeInOutQuart",
            "progress": function (animation, progress, msRemaining) {
                $("#css_cnt").text(Math.round(cssNum * progress));
            }
        });

        //jquery
        $("#jQuery_bar").stop().animate({
            "right": 100 - (jqueryNum / max * 100) + "%",
        }, {
            "duration": duration,
            "easing": "easeInOutQuart",
            "progress": function (animation, progress, msRemaining) {
                $("#jQuery_cnt").text(Math.round(jqueryNum * progress));
            }
        });

        //php
        $("#php_bar").stop().animate({
            "right": 100 - (phpNum / max * 100) + "%",
        }, {
            "duration": duration,
            "easing": "easeInOutQuart",
            "progress": function (animation, progress, msRemaining) {
                $("#php_cnt").text(Math.round(phpNum * progress));
            }
        });

        //react
        $("#react_bar").stop().animate({
            "right": 100 - (reactNum / max * 100) + "%",
        }, {
            "duration": duration,
            "easing": "easeInOutQuart",
            "progress": function (animation, progress, msRemaining) {
                $("#react_cnt").text(Math.round(reactNum * progress));
            }
        });

        //figma
        $("#figma_bar").stop().animate({
            "right": 100 - (figmaNum / max * 100) + "%",
        }, {
            "duration": duration,
            "easing": "easeInOutQuart",
            "progress": function (animation, progress, msRemaining) {
                $("#figma_cnt").text(Math.round(figmaNum * progress));
            }
        });

        //photoshop
        $("#photoshop_bar").stop().animate({
            "right": 100 - (photoshopNum / max * 100) + "%",
        }, {
            "duration": duration,
            "easing": "easeInOutQuart",
            "progress": function (animation, progress, msRemaining) {
                $("#photoshop_cnt").text(Math.round(photoshopNum * progress));
            }
        });

        //illustrator
        $("#illustrator_bar").stop().animate({
            "right": 100 - (illustratorNum / max * 100) + "%",
        }, {
            "duration": duration,
            "easing": "easeInOutQuart",
            "progress": function (animation, progress, msRemaining) {
                $("#illustrator_cnt").text(Math.round(illustratorNum * progress));
            }
        });
        
        //github
        $("#github_bar").stop().animate({
            "right": 100 - (githubNum / max * 100) + "%",
        }, {
            "duration": duration,
            "easing": "easeInOutQuart",
            "progress": function (animation, progress, msRemaining) {
                $("#github_cnt").text(Math.round(githubNum * progress));
            }
        });
    }



    //호버하면 스크롤되게
    $(".con-show, .contents").hover(function(){
        var ah =$(this).find("a").innerHeight();
        var img = $(this).find("img");
        var imgh = $(this).find("img").innerHeight();

        img.stop().animate({top: -imgh-ah},9000);
    }, function(){
        var img = $(this).find("img");
        img.stop().animate({top:0},2000);
    });












    //탭메뉴
    let tabBtn = $(".tabBtn > a");
    let tabCon = $(".tabcon > ul > li");

    tabCon.hide().eq(0).show();

    tabBtn.click(function(){
        const index = $(this).index();

        $(this).addClass("active").siblings().removeClass("active");
        tabCon.eq(index).show().siblings().hide();
    });

    

    //팀프로젝트
    $(".slide-1").on("click", function(){
        $(".Pslidelist").css("transform", "translateX(0px)");
        slide = 1;
    });
    $(".slide-2").on("click", function(){
        $(".Pslidelist").css("transform", "translateX(-1200px)");
        slide = 2;
    });
    $(".slide-3").on("click", function(){
        $(".Pslidelist").css("transform", "translateX(-2400px)");
        slide = 3;
    });
    $(".slide-4").on("click", function(){
        $(".Pslidelist").css("transform", "translateX(-3600px)");
        slide = 4;
    });
    $(".slide-5").on("click", function(){
        $(".Pslidelist").css("transform", "translateX(-4800px)");
        slide = 5;
    });



});
