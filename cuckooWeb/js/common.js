"use strict";


$(function(){


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
    const _sitemap = $(".sitemap-area");
    _sitemap.hide();
    $(".sitemap-btn").click(function(){
        _sitemap.fadeIn();
    })
    $(".sitemap-close").click(function(){
        _sitemap.fadeOut();
    })

})