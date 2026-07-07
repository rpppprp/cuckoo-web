"use strict";


$(function(){



/* ----------------------------------------------------------

    COMMON

-------------------------------------------------------------*/

    //스크롤 reset
    history.scrollRestoration = "manual"

    //스크롤 제어
    function scrollDisable() {
        $('html, body').addClass('scroll-none');
    }

    //스크롤 제어 off
    function scrollAble() {
        $('html, body').removeClass('scroll-none');
    }



/* ----------------------------------------------------------

    HEADER

-------------------------------------------------------------*/


    // INDEX HEADER
    $('#ck-main .header').on('mouseenter', function() {
        $(this).addClass('over');
    }).on('mouseleave', function() {
        $(this).removeClass('over');
    });


    // GNB 클릭 시 LNB 매칭 및 활성화
    $(".gnb-list > li").click(function(){
        var _this = $(this);
        $('.gnb-link').removeClass('on');
        _this.addClass('on');

        var _target = $(this).attr('data-target');
        
        // lnb
        $('.lnb-list > li').hide();
        $(`.lnb-list > li[data-menu="${_target}"]`).show();
        
    })
        
    //HEADER 영역에서 마우스가 떠나면 초기화
    $('.header').on('mouseleave', function() {
        $('.gnb-link').removeClass('on'); // GNB 활성화 제거
        $('.lnb-list > li').hide();       // 모든 LNB 숨김
    });


    //SITEMAP
    $(".sitemap-btn").click(function(){
        $(".sitemap-area").addClass('on');
    })
    $(".sitemap-close").click(function(){
        $(".sitemap-area").removeClass('on');
    })


/* ----------------------------------------------------------

    SUB TAB

-------------------------------------------------------------*/


    // breadcrumb button
    $(".breadcrumb-btn").click(function(){
        var _this = $(this);
        var _dropdown = _this.next('ul');

        if(_this.hasClass('on')) {
            _this.removeClass('on');
            _dropdown.hide();
        } else {
            _this.addClass('on');
            _dropdown.show();
        }
    })

    //breadcrumb 메뉴 열린상태로 외부영역 눌렀을때 초기화
    $(document).on('click', function(e) {

        if (!$(e.target).closest('.breadcrumb-btn, .breadcrumb-btn + ul').length) {
          
          $('.breadcrumb-btn').removeClass('on');
          $('.breadcrumb-btn + ul').hide();
          
        }
    });



/* ----------------------------------------------------------

    

-------------------------------------------------------------*/





/* ----------------------------------------------------------

    FOOTER

-------------------------------------------------------------*/


    // footer family-select button
    $(".family-select-btn").click(function(){
        var _this = $(this);
        var _dropdown = _this.next('ul');

        if(_this.hasClass('on')) {
            _this.removeClass('on');
            _dropdown.hide();
        } else {
            _this.addClass('on');
            _dropdown.show();
        }
    })

    // footer family select 메뉴 열린상태로 외부영역 눌렀을때 초기화
    $(document).on('click', function(e) {

        if (!$(e.target).closest('.family-select-btn, .family-select-btn + ul').length) {
          
          $('.family-select-btn').removeClass('on');
          $('.family-select-btn + ul').hide();
          
        }
    });




})