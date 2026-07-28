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
    
    // gsap 호출
    gsap.registerPlugin(ScrollTrigger); 

    // Lenis 초기화 및 GSAP ScrollTrigger와 연동
    const lenis = new Lenis({
        duration: 1.2, // 스크롤 감도 (기본값 1.2, 높일수록 더 부드러움)
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // 관성 곡선
    });
    
    // Lenis의 스크롤 이벤트를 ScrollTrigger에 전달
    lenis.on('scroll', ScrollTrigger.update);
    
    // GSAP의 ticker에 Lenis 업데이트 등록
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });
    
    // GSAP 라구 자이로 효과 등 오작동 방지
    gsap.ticker.lagSmoothing(0);



/* ----------------------------------------------------------

    HEADER

-------------------------------------------------------------*/


    // header를 위로 올리는 애니메이션 정의
    const headerAnim = gsap.to('#header', {
        yPercent: -100,
        duration: 0.15,
        ease: 'power3.out',
        paused: true
    });
    
    // 스크롤 방향 감지 및 제어
    ScrollTrigger.create({
        start: 'top top',
        end: 'max',
        onUpdate: (self) => {
        // 최상단 근처(예: 50px 이내)일 때는 항상 보이도록 설정
        if (self.scroll < 50) {
            headerAnim.reverse();
            return;
        }
    
        // self.direction: 1(스크롤 다운) -> play()로 숨김
        // self.direction: -1(스크롤 업) -> reverse()로 나타남
        if (self.direction === 1) {
            headerAnim.play();
        } else {
            headerAnim.reverse();
        }
        }
    });


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
        scrollDisable();
    })
    $(".sitemap-close").click(function(){
        $(".sitemap-area").removeClass('on');
        scrollAble();
    })


    // LANGUAGE
    $(".lang-choice .lang-select-btn").click(function(){
        var _this = $(this);
        var _opt = _this.next('ul');
        
        if(_this.hasClass('on')) {
            _this.removeClass('on');
            _opt.hide();
        } else {
            _this.addClass('on');
            _opt.show();
        }
    })

    $(document).on('click', function(e) {

        if (!$(e.target).closest('.lang-select-btn, .lang-select-btn + ul').length) {
          
          $('.lang-select-btn').removeClass('on');
          $('.lang-select-btn + ul').hide();
          
        }
    });


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

    SUB-PAGE TABS

-------------------------------------------------------------*/

    $(".tab-group > li").click(function(){
        var _this = $(this);
        $('.tab-group li').removeClass('on');
        _this.addClass('on');

        var _target = $(this).attr('data-tab');
        
        $('.tab > .items').hide();
        $('#' + _target).show();

        // 탭 이동 시 echarts 초기화
        setTimeout(function() {
            if (window.resizeActiveChart) {
                window.resizeActiveChart();
            }
        }, 50);
        
    })


/* ----------------------------------------------------------

    SECTION 

-------------------------------------------------------------*/


    if ($('.hero-intro').length > 0) {
        const introTL = gsap.timeline({
            scrollTrigger: {
                trigger: '.hero-intro',
                start: 'top top',
                end: '+=150%',
                pin: true,
                scrub: 2,
                anticipatePin: 1
            }
        });

        introTL.to('.intro-full', {
            width: '100vw',
            height: '100vh',
            borderRadius: '0px',
            margin: '0px',
            ease: 'none'
        })
        .to('.intro-full .bg-about', {
            marginTop: 0,   // 필요 시 paddingTop: 0 으로 변경
            duration: 0.5,
            ease: 'power1.out'
        }, 0)
        .to('.intro-full .txt-area', {
            opacity: 1,
            duration: 0.5,
            ease: 'power1.out'
        });
    }


    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                gsap.to(entry.target, {
                    y: 0,
                    autoAlpha: 1,
                    duration: 1,
                    ease: 'power2.out'
                });
                observer.unobserve(entry.target);
            }
        });
    }, { rootMargin: '0px 0px -15% 0px' });

    $('.fade-up').each(function() {
        gsap.set(this, { y: 50, autoAlpha: 0 });
        observer.observe(this);
    });

    $(window).on('load', function() {
        ScrollTrigger.refresh();
    });

    ScrollTrigger.refresh();


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