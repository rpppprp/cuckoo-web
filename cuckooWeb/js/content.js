
"use strict";

$(function(){


/* ----------------------------------------------------------

    INDEX

-------------------------------------------------------------*/


    // hero section pager
    $(".hero-track").on('init reInit afterChange', function(event, slick, currentSlide, nextSlide) {
        var index = (currentSlide ? currentSlide : slick.currentSlide) + 1;
        var _num = index.toString().padStart(2,'0');
        $('.hero-navigation .slick-dots').html(_num);
    })

    // hero section progress
    var _progressBar = $('.hero-navigation .progress-bar');
    var _initPercent = 100 / ($('.hero-track').find('.hero-item').length);

    _progressBar.css('background-size', _initPercent + '% 100%');

    $(".hero-track").on('beforeChange', function(event, slick, currentSlide, nextSlide){
        var calc = ((nextSlide + 1) / slick.slideCount) * 100;
        _progressBar.css('background-size', calc + '% 100%').attr('aria-valuenow', calc);
    });

    // hero section slick 
    $('.hero-track').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 7000,
        centerMode: true,
        draggable: false,
        cssEase: 'linear',
        fade: true,
        dots:true,
        prevArrow : $('.navigation-button .nav-prev'),
        nextArrow : $('.navigation-button .nav-next'),
        appendDots: $('.page-number')
    });


    // investor stock slick
    $('.investor-stock-track').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 10000,
        centerMode: true,
        draggable: false,
        cssEase: 'linear',
        fade: true,
        dots:false,
        arrows:false
    });


    //실시간 주가 (쿠쿠홀딩스)
    if ($('#cuckoo-main-holdings').length > 0) {{{

        var dom = document.getElementById('cuckoo-main-holdings');
        var myChart = echarts.init(dom, null, {
          renderer: 'canvas',
          useDirtyRect: false
        });
        var app = {};
        
        var option;
    
        option = {
          tooltip: {
            trigger: 'axis',
            valueFormatter: (value) => value.toLocaleString() + '원'
          },
          grid: {
            left: '0%',
            right: '0%',
            top: '15%',
            bottom: '5%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            boundaryGap: false, // 차트 양 끝 여백 제거
            data: [
              '04-01', '04-03', '04-07', '04-10', '04-14', 
              '04-17', '04-21', '04-24', '04-27'
            ]
          },
          yAxis: {
            type: 'value',
            scale: true, // 0부터 시작하지 않고 데이터 범위에 맞춰 축 자동 조절 (필수)
            axisLabel: {
              formatter: (value) => value.toLocaleString()
            }
          },
          series: [
            {
              name: '종가',
              type: 'line',
              smooth: true, // 선을 부드럽게
              symbol: 'none', // 데이터 점 숨기기
              data: [28050, 27650, 27300, 27700, 28000, 29100, 28900, 29100, 29200],
              lineStyle: {
                color: '#3452ff',
                width: 2
              },
              areaStyle: {
                // 하단 그라데이션 적용
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: 'rgba(52, 82, 255, 0.5)' },
                  { offset: 1, color: 'rgba(52, 82, 255, 0)' }
                ])
              }
            }
          ]
        };
    
        if (option && typeof option === 'object') {
          myChart.setOption(option);
        }
    
        window.addEventListener('resize', myChart.resize);

    }}};



    //실시간 주가 (쿠쿠홈시스)
    if ($('#cuckoo-main-homesys').length > 0) {{{

        var dom = document.getElementById('cuckoo-main-homesys');
        var myChart = echarts.init(dom, null, {
          renderer: 'canvas',
          useDirtyRect: false
        });
        var app = {};
        
        var option;
    
        option = {
          tooltip: {
            trigger: 'axis',
            valueFormatter: (value) => value.toLocaleString() + '원'
          },
          grid: {
            left: '5%',
            right: '5%',
            bottom: '10%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            boundaryGap: false, // 차트 양 끝 여백 제거
            data: [
              '04-01', '04-03', '04-07', '04-10', '04-14', 
              '04-17', '04-21', '04-24', '04-27'
            ]
          },
          yAxis: {
            type: 'value',
            scale: true, // 0부터 시작하지 않고 데이터 범위에 맞춰 축 자동 조절 (필수)
            axisLabel: {
              formatter: (value) => value.toLocaleString()
            }
          },
          series: [
            {
              name: '종가',
              type: 'line',
              smooth: true, // 선을 부드럽게
              symbol: 'none', // 데이터 점 숨기기
              data: [28050, 27650, 27300, 27700, 28000, 29100, 28900, 29100, 29200],
              lineStyle: {
                color: '#3452ff',
                width: 2
              },
              areaStyle: {
                // 하단 그라데이션 적용
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: 'rgba(52, 82, 255, 0.5)' },
                  { offset: 1, color: 'rgba(52, 82, 255, 0)' }
                ])
              }
            }
          ]
        };
    
        if (option && typeof option === 'object') {
          myChart.setOption(option);
        }
    
        window.addEventListener('resize', myChart.resize);

    }}};



/* ----------------------------------------------------------

    회사소개 - 연혁

-------------------------------------------------------------*/


    if ($('.section-history').length > 0) {

      const $sectionHistory = $('.section-history');
      const $historyTrack = $('.history-track');
      const $historyItems = $('.history-item');
      const $tabItems = $('.history-tab .tab-item');
      const $pagerItems = $('.history-pager li');

      // 1. PC 전용 가로 스크롤 (원코드 100% 유지)
      function initDesktopHistory() {
          const getScrollAmount = () => $historyTrack[0].scrollWidth - window.innerWidth;

          const horizontalScroll = gsap.to($historyTrack, {
              x: () => -getScrollAmount(),
              ease: 'none',
              scrollTrigger: {
                  trigger: $sectionHistory,
                  pin: true,
                  pinSpacing: true,
                  scrub: 1,
                  start: 'top top',
                  end: () => '+=' + getScrollAmount(),
                  invalidateOnRefresh: true,
                  anticipatePin: 1,
                  onUpdate: (self) => {
                      const currentX = -gsap.getProperty($historyTrack[0], 'x');
                      const maxScrollX = getScrollAmount();
                      let activeIndex = 0;

                      if (self.progress >= 0.95) {
                          activeIndex = $historyItems.length - 1;
                      } else {
                          $historyItems.each(function (i) {
                              const itemLeft = this.offsetLeft;
                              const nextItemLeft = $historyItems.eq(i + 1).length
                                  ? $historyItems.eq(i + 1)[0].offsetLeft
                                  : maxScrollX;
                              const threshold = itemLeft + (nextItemLeft - itemLeft) * 0.4;

                              if (currentX >= threshold) {
                                  activeIndex = i + 1;
                              }
                          });
                      }

                      $tabItems.eq(activeIndex).addClass('on').siblings().removeClass('on');
                      $pagerItems.eq(activeIndex).addClass('on').siblings().removeClass('on');
                  }
              }
          });

          $('.history-tab a, .history-pager a').off('click.historyPc').on('click.historyPc', function (e) {
              e.preventDefault();

              const href = $(this).attr('href');
              const indexNum = href.replace(/[^0-9]/g, '');
              const $targetObj = $('#history-' + indexNum);

              if ($targetObj.length) {
                  const st = horizontalScroll.scrollTrigger;
                  const targetLeft = $targetObj[0].offsetLeft;
                  const maxScrollX = getScrollAmount();

                  const targetScroll = st.start + (st.end - st.start) * (Math.min(targetLeft, maxScrollX) / maxScrollX);

                  if (window.lenis) {
                      window.lenis.scrollTo(targetScroll, { duration: 0.8 });
                  } else {
                      $('html, body').stop().animate({ scrollTop: targetScroll }, 600);
                  }
              }
          });

          $(window).off('load.historyPc resize.historyPc').on('load.historyPc resize.historyPc', function () {
              ScrollTrigger.refresh();
          });
      }

      // 2. 모바일 전용 세로 스크롤 (768px 이하)
      function initMobileHistory() {
          $('.history-tab a, .history-pager a, .history-pager li').off('click.historyMo').on('click.historyMo', function (e) {
              e.preventDefault();

              const $this = $(this);
              let $targetObj;

              if ($this.is('li')) {
                  const index = $this.index();
                  $targetObj = $historyItems.eq(index);
              } else {
                  const href = $this.attr('href');
                  const indexNum = href ? href.replace(/[^0-9]/g, '') : '';
                  $targetObj = $('#history-' + indexNum);
              }

              if ($targetObj.length) {
                  const headerHeight = 80;
                  const targetTop = $targetObj.offset().top - headerHeight;

                  if (window.lenis) {
                      window.lenis.scrollTo(targetTop, { duration: 0.5 });
                  } else {
                      $('html, body').stop().animate({ scrollTop: targetTop }, 400);
                  }

                  const targetIndex = $targetObj.index();
                  $tabItems.eq(targetIndex).addClass('on').siblings().removeClass('on');
                  $pagerItems.eq(targetIndex).addClass('on').siblings().removeClass('on');
              }
          });

          $(window).off('scroll.historyMo').on('scroll.historyMo', function () {
              const scrollTop = $(window).scrollTop();
              const headerHeight = 100;

              $historyItems.each(function (i) {
                  const itemTop = $(this).offset().top - headerHeight;
                  const itemBottom = itemTop + $(this).outerHeight();

                  if (scrollTop >= itemTop && scrollTop < itemBottom) {
                      $tabItems.eq(i).addClass('on').siblings().removeClass('on');
                      $pagerItems.eq(i).addClass('on').siblings().removeClass('on');
                  }
              });
          });
      }

      // 3. 해상도 분기 실행
      if (window.innerWidth > 768) {
          initDesktopHistory();
      } else {
          initMobileHistory();
      }
    }


/* ----------------------------------------------------------

    회사소개 - 해외 자회사 근황

-------------------------------------------------------------*/

    // overseas map
    if ($('#associate-map').length > 0) {
        
        // 2. 요소가 있을 때만 지도 객체 생성
        const map = new jsVectorMap({
            selector: '#associate-map',
            map: 'world',
            zoomOnScroll: false, // 휠로 지도 확대되는 것 방지
            
            // 지도 기본 스타일
            regionStyle: {
                initial: { fill: '#d1d5db' }, // 국가 기본색
                hover: { fill: '#9ca3af' }    // 마우스 호버 시
            },

            // 마커 스타일
            markerStyle: {
                initial: { fill: '#E30613', stroke: '#fff', strokeWidth: 3, r: 7 },
                hover: { fill: '#000' }
            },

            // 마커 위치 설정
            markers: [
                // 중국 (지역별 분리)
                { name: 'CHINA: 청도복구전자 (Qingdao)', coords: [36.0671, 120.3826] },
                { name: 'CHINA: 심양복구전자 (Shenyang)', coords: [41.8057, 123.4315] },
                { name: 'CHINA: 복구/중산 법인 (Guangzhou)', coords: [23.1291, 113.2644] },

                // 미주/아시아/오세아니아
                { name: 'USA: CKA / CKRA (La Mirada)', coords: [33.9056, -118.0162] },
                { name: 'MALAYSIA: CKI / COT / CKM (Selangor)', coords: [3.1073, 101.5950] },
                { name: 'VIETNAM: CKV (Ho Chi Minh)', coords: [10.8231, 106.6297] },
                { name: 'INDONESIA: CKID (Jakarta)', coords: [-6.2088, 106.8456] },
                { name: 'INDIA: CKIN (Gurgaon)', coords: [28.4595, 77.0266] },
                { name: 'SINGAPORE: CKS (Singapore)', coords: [1.2903, 103.8520] },
                { name: 'AUSTRALIA: CKO (Sydney)', coords: [-33.8688, 151.2093] }
            ],

            // 마커 툴팁 표시
            onMarkerTooltipShow(event, tooltip, index) {
                tooltip.text(map.params.markers[index].name)
            }
        });
        
    }




    

/* ----------------------------------------------------------

    투자정보 - IR 자료실 - IR 미팅신청

-------------------------------------------------------------*/

    if ($('#request-calendar').length > 0) {  

        // anchor 비활성화
        $(document).on('click', '.ui-datepicker-calendar a', function(e) {
            e.preventDefault();
        });

        // 미팅 신청일 캘린더
        // 추후 공휴일 db 연동 필요 (임시)
        var yyyy = new Date().getFullYear();
        var holiday = [
            new Date(yyyy, 0, 1).getTime(), 
            new Date(yyyy, 0, 28).getTime(), 
            new Date(yyyy, 0, 29).getTime(), 
            new Date(yyyy, 0, 30).getTime(), 
            new Date(yyyy, 2, 1).getTime(), 
            new Date(yyyy, 2, 3).getTime(), 
            new Date(yyyy, 4, 5).getTime(), 
            new Date(yyyy, 5, 6).getTime(), 
            new Date(yyyy, 7, 15).getTime(), 
            new Date(yyyy, 9, 3).getTime(), 
            new Date(yyyy, 9, 5).getTime(), 
            new Date(yyyy, 9, 6).getTime(), 
            new Date(yyyy, 9, 7).getTime(), 
            new Date(yyyy, 11, 25).getTime(), 
        ];

        // datepicker 불러오기
        $("#request-calendar").datepicker({
            regional: "ko",
            closeText: "닫기",
            dateFormat: "yy-mm-dd",
            showMonthAfterYear: true ,
            currentText: "오늘",
            prevText: 'Prev',
            nextText: 'Next',
            buttonImageOnly: true,
            monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
            monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
            dayNames: ['일', '월', '화', '수', '목', '금', '토'],
            dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
            dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
            weekHeader: "주",
            yearSuffix: '년',
            minDate: 0, // 최소: 오늘부터
            // 주말&공휴일 제외
            beforeShowDay: function(date) {
                var showDay = true;
                if (date.getDay() == 0 || date.getDay() == 6) {
                    showDay = false;
                }
                if ($.inArray(date.getTime(), holiday) > -1) {
                    showDay = false;
                }
                return [showDay];
            },
            
            onSelect: function(dateText) {
                $(this).val(dateText).trigger('input');
                $('.no-choice-area').hide();
                $('.date-value').val(dateText).trigger('change'); 
            }
        });

    }

    $(".time-value .btn").click(function(){
        var _selectTime = $(this).val(); // 미팅시간버튼 value 가져오기
        
        $(".time-value .btn").removeClass('on');
        $(this).addClass('on');

    });
    

/* ----------------------------------------------------------

    지속가능경영 - 개요

-------------------------------------------------------------*/


if ($('.section-overview').length > 0) {
    const $items = $('.section-overview .esg-item');
  
    // 1. 초기 셋팅
    gsap.set('.section-overview', {
      clipPath: 'inset(12% 10% round 30px)'
    });
  
    // 텍스트 및 2번째 아이템 완전 숨김 (1번째 아이템과 위치 중첩 처리)
    gsap.set($items.find('.txt-wrap'), { autoAlpha: 0 });
    gsap.set($items.find('.fade-up'), { y: 50, autoAlpha: 0 });
    
    // 2번째 아이템은 시작할 때 숨김 처리
    if ($items.length > 1) {
      gsap.set($items.eq(1), { autoAlpha: 0, display: 'none' });
    }
  
    // 2. 타임라인 생성
    const overviewTL = gsap.timeline({
      scrollTrigger: {
        trigger: '.section-overview',
        start: 'top top',
        end: '+=450%', // 스크롤 호흡을 더 길게 확보
        pin: true,
        scrub: 1,
        anticipatePin: 1
      }
    });
  
    overviewTL
      // [1] 풀스크린으로 확장
      .to('.section-overview', {
        clipPath: 'inset(0% 0% round 0px)',
        duration: 2,
        ease: 'none'
      })
  
      // [2] 1번 아이템 텍스트 영역 등장
      .to($items.eq(0).find('.txt-wrap'), {
        autoAlpha: 1,
        duration: 0.5
      })
      .to($items.eq(0).find('.fade-up'), {
        y: 0,
        autoAlpha: 1,
        duration: 2,
        stagger: 0.4,
        ease: 'power2.out'
      })
  
      // [3] 1번 아이템 정지 (읽는 구간)
      .to({}, { duration: 3 })
  
      // [4] 1번 아이템 퇴장 및 화면에서 감춤
      .to($items.eq(0), {
        autoAlpha: 0,
        duration: 1.5,
        onComplete: function() {
          $items.eq(0).hide();
        },
        onReverseComplete: function() {
          $items.eq(0).show();
        }
      });
  
    // 2번 아이템 처리
    if ($items.length > 1) {
      overviewTL
        // 2번 아이템 등장 준비
        .set($items.eq(1), { display: 'flex', autoAlpha: 0 })
        .to($items.eq(1), {
          autoAlpha: 1,
          duration: 1
        })
        .to($items.eq(1).find('.txt-wrap'), {
          autoAlpha: 1,
          duration: 0.5
        })
        .to($items.eq(1).find('.fade-up'), {
          y: 0,
          autoAlpha: 1,
          duration: 2,
          stagger: 0.4,
          ease: 'power2.out'
        })
        // 2번 아이템 정지 (읽는 구간)
        .to({}, { duration: 3 });
    }
  }

/* ----------------------------------------------------------

    지속가능경영 - 환경

-------------------------------------------------------------*/

    // E-순환우수제품 목록 slick
    $('.env-slide-track').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 7000,
        centerMode: true,
        draggable: false,
        cssEase: 'linear',
        centerPadding: '24px',
        fade: false,
        dots: false,
        prevArrow : $('.env-slide-pager .env-slide-prev'),
        nextArrow : $('.env-slide-pager .env-slide-next')
    });

    // E-순환우수제품 현황    
    if ($('#env-recycle-graph').length > 0) {{{

        var dom = document.getElementById('env-recycle-graph');
        var myChart = echarts.init(dom, null, {
          renderer: 'canvas',
          useDirtyRect: false
        });
        var app = {};
        
        var option;
    
        const rawData = [
        [100, 302, 301, 334, 390, 330, 320],
        [320, 132, 101, 134, 90, 230, 210],
        [220, 182, 191, 234, 290, 330, 310],
        [150, 212, 201, 154, 190, 330, 410],
        [820, 832, 901, 934, 1290, 1330, 1320]
        ];
        const totalData = [];
        for (let i = 0; i < rawData[0].length; ++i) {
        let sum = 0;
        for (let j = 0; j < rawData.length; ++j) {
            sum += rawData[j][i];
        }
        totalData.push(sum);
        }
        const series = [
        'Direct',
        'Mail Ad',
        'Affiliate Ad',
        'Video Ad',
        'Search Engine'
        ].map((name, sid) => {
        return {
            name,
            type: 'bar',
            stack: 'total',
            barWidth: '60%',
            label: {
            show: true,
            formatter: (params) => Math.round(params.value * 1000) / 10 + '%'
            },
            data: rawData[sid].map((d, did) =>
            totalData[did] <= 0 ? 0 : d / totalData[did]
            )
        };
        });
        option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: { type: 'shadow' }
            },
            legend: {
                bottom: '5%',
                data: ['음식물처리기', '냉장고', '밥솥', '인덕션레인지', '공기청정기', '정수기', '김치냉장고', '무선청소기', '냉동고', '총계']
            },
            grid: {
            top: '8%',      // 상단 여백 축소 (기존 15%)
            bottom: '12%',  // 하단 범례 공간만 남기고 축소 (기존 15%)
            left: '3%',     // 좌측 여백 축소 (기존 5%)
            right: '3%',    // 우측 여백 축소 (기존 5%)
            containLabel: true
            },
            // 양쪽에 Y축 배치 (이미지 형태 반영)
            yAxis: [
                { type: 'value', min: 0, max: 120, interval: 20 },
                { type: 'value', min: 0, max: 120, interval: 20 }
            ],
            xAxis: {
                type: 'category',
                data: ['2023', '2024', '2025']
            },
            series: [
                // 1. 누적 막대 데이터 (stack 값을 동일하게 맞춤)
                { name: '음식물처리기', type: 'bar', stack: 'total',barWidth: '35%', data: [0, 7, 10], itemStyle: { color: '#56a3f1' } },
                { name: '냉장고', type: 'bar', stack: 'total',barWidth: '35%', data: [0, 0, 2], itemStyle: { color: '#f88c3d' } },
                { name: '밥솥', type: 'bar', stack: 'total',barWidth: '35%', data: [0, 0, 31], itemStyle: { color: '#a6a6a6' } },
                { name: '인덕션레인지', type: 'bar', stack: 'total',barWidth: '35%', data: [0, 0, 7], itemStyle: { color: '#ffc000' } },
                { name: '공기청정기', type: 'bar', stack: 'total',barWidth: '35%', data: [38, 38, 38], itemStyle: { color: '#4171cd' } },
                { name: '정수기', type: 'bar', stack: 'total',barWidth: '35%', data: [0, 4, 4], itemStyle: { color: '#70ad47' } },
                { name: '김치냉장고', type: 'bar', stack: 'total',barWidth: '35%', data: [0, 0, 2], itemStyle: { color: '#1f4e79' } },
                { name: '무선청소기', type: 'bar', stack: 'total',barWidth: '35%', data: [0, 0, 2], itemStyle: { color: '#843c0c' } },
                { name: '냉동고', type: 'bar', stack: 'total',barWidth: '35%', data: [0, 0, 2], itemStyle: { color: '#595959' } },
            
                // 2. 총계 꺾은선 데이터 및 상단 텍스트 라벨 추가
                {
                name: '총계',
                type: 'line',
                yAxisIndex: 0,
                data: [38, 49, 98],
                itemStyle: { color: '#806000' },
                lineStyle: { width: 3 },
                // 그래프 상단의 "X개 제품군 X개 모델" 텍스트 매핑
                label: {
                    show: true,
                    position: 'top',
                    distance: 10,
                    color: '#000',
                    fontSize: 13,
                    formatter: function (params) {
                    const labels = [
                        '1개 제품군\n38개 모델',
                        '2개 제품군\n49개 모델',
                        '9개 제품군\n98개 모델'
                    ];
                    return labels[params.dataIndex];
                    }
                }
                }
            ]
            };
        
        if (option && typeof option === 'object') {
        myChart.setOption(option);
        }
    
        window.addEventListener('resize', myChart.resize);
    }}}


    // 재생 원재료 사용 현황
    if ($('#env-recovery-graph').length > 0) {{{

        var dom = document.getElementById('env-recovery-graph');
        var myChart = echarts.init(dom, null, {
          renderer: 'canvas',
          useDirtyRect: false
        });
        var app = {};
        
        var option;
    
        // There should not be negative values in rawData
        const rawData = [
        [100, 302, 301, 334, 390, 330, 320],
        [320, 132, 101, 134, 90, 230, 210],
        [220, 182, 191, 234, 290, 330, 310],
        [150, 212, 201, 154, 190, 330, 410],
        [820, 832, 901, 934, 1290, 1330, 1320]
        ];
        const totalData = [];
        for (let i = 0; i < rawData[0].length; ++i) {
        let sum = 0;
        for (let j = 0; j < rawData.length; ++j) {
            sum += rawData[j][i];
        }
        totalData.push(sum);
        }
        const series = [
        'Direct',
        'Mail Ad',
        'Affiliate Ad',
        'Video Ad',
        'Search Engine'
        ].map((name, sid) => {
        return {
            name,
            type: 'bar',
            stack: 'total',
            barWidth: '60%',
            label: {
            show: true,
            formatter: (params) => Math.round(params.value * 1000) / 10 + '%'
            },
            data: rawData[sid].map((d, did) =>
            totalData[did] <= 0 ? 0 : d / totalData[did]
            )
        };
        });
        option = {
        // 1. 전체 화면(1440px) 대비 차트 영역 비율 조절 (여백 최적화)
        grid: {
            top: '8%',      // 상단 여백 축소 (기존 15%)
            bottom: '12%',  // 하단 범례 공간만 남기고 축소 (기존 15%)
            left: '3%',     // 좌측 여백 축소 (기존 5%)
            right: '3%',    // 우측 여백 축소 (기존 5%)
            containLabel: true
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: { type: 'shadow' }
        },
        // 2. 하단 범례 설정
        legend: {
            bottom: '5%',
            data: ['정수기', '공기청정기', '전기밥솥', '음식물처리기', '펫드라이룸', '합계']
        },
        xAxis: {
            type: 'category',
            data: ['2022년', '2023년', '2024년']
        },
        // 3. Y축 단위 및 텍스트 상단 정렬 설정
        yAxis: {
            type: 'value',
            name: '사용량 (TON)',
            nameLocation: 'end',
            nameGap: 20,
            nameTextStyle: {
            align: 'left',
            padding: [0, 0, 0, -40] // 축 라인 위로 텍스트 정렬
            },
            axisLabel: {
            formatter: (value) => value.toLocaleString()
            }
        },
        series: [
            // 4. 누적 막대 데이터 (barWidth를 '35%'로 줄여서 슬림하게 처리)
            { 
            name: '정수기', 
            type: 'bar', 
            stack: 'total', 
            barWidth: '35%', 
            data: [151.2, 274.7, 446.2], 
            itemStyle: { color: '#56a3f1' } 
            },
            { 
            name: '공기청정기', 
            type: 'bar', 
            stack: 'total', 
            barWidth: '35%', 
            data: [132.8, 251.5, 434.5], 
            itemStyle: { color: '#f88c3d' } 
            },
            { 
            name: '전기밥솥', 
            type: 'bar', 
            stack: 'total', 
            barWidth: '35%', 
            data: [0, 16792.0, 9175.0], 
            itemStyle: { color: '#a6a6a6' } 
            },
            { 
            name: '음식물처리기', 
            type: 'bar', 
            stack: 'total', 
            barWidth: '35%', 
            data: [0, 22438.0, 29448.0], 
            itemStyle: { color: '#ffc000' } 
            },
            { 
            name: '펫드라이룸', 
            type: 'bar', 
            stack: 'total', 
            barWidth: '35%', 
            data: [0, 0, 377.0], 
            itemStyle: { color: '#4171cd' } 
            },
            // 5. 합계 꺾은선 (막대와 같은 Y축을 바라보게 연동 및 상단 라벨 추가)
            {
            name: '합계',
            type: 'line',
            data: [283.9, 39756.3, 39880.7],
            itemStyle: { color: '#70ad47' },
            lineStyle: { width: 3 },
            label: {
                show: true,
                position: 'top',
                distance: 10,
                color: '#000',
                fontWeight: 'bold',
                formatter: (params) => params.value.toLocaleString() + ' 톤'
            }
            }
        ]
        };
    
        if (option && typeof option === 'object') {
          myChart.setOption(option);
        }
    
        window.addEventListener('resize', myChart.resize);

    }}}


    // 에너지 위너상 수상 현황
    if ($('#env-winner-graph').length > 0) {{{

        var dom = document.getElementById('env-winner-graph');
        var myChart = echarts.init(dom, null, {
          renderer: 'canvas',
          useDirtyRect: false
        });
        var app = {};
        
        var option;
    
        option = {
          // 전체 화면 대비 여백 및 정렬 최적화
          grid: {
            left: '8%',
            right: '8%',
            top: '15%',
            bottom: '15%',
            containLabel: true
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: { type: 'shadow' }
          },
          // 하단 범례 설정
          legend: {
            bottom: '5%',
            data: ['모델수']
          },
          xAxis: {
            type: 'category',
            data: ['2023년', '2024년', '2025년']
          },
          // Y축 범위 및 타이틀 상단 정렬
          yAxis: {
            type: 'value',
            name: '(개)',
            nameLocation: 'end',
            nameGap: 20,
            nameTextStyle: {
              align: 'left',
              padding: [0, 0, 0, -30] // 축 라인 위로 텍스트 정렬
            },
            min: 0,
            max: 30,
            interval: 5
          },
          series: [
            // 1. 품목군수 막대 그래프 (슬림하게 barWidth 설정)
            {
              name: '모델수',
              type: 'bar',
              barWidth: '35%',
              data: [23, 10, 24],
              itemStyle: { color: '#56a3f1' }
            }
          ]
        };
        if (option && typeof option === 'object') {
          myChart.setOption(option);
        }
    
        window.addEventListener('resize', myChart.resize);

    }}}


    // 1등급 효율 제품 신규런칭 현황
    if ($('#env-level1-graph').length > 0) {{{

        var dom = document.getElementById('env-level1-graph');
        var myChart = echarts.init(dom, null, {
          renderer: 'canvas',
          useDirtyRect: false
        });
        var app = {};
        
        var option;
    
        option = {
          // 전체 화면 대비 여백 및 정렬 최적화
          grid: {
            left: '8%',
            right: '8%',
            top: '15%',
            bottom: '15%',
            containLabel: true
          },
          tooltip: {
            trigger: 'axis'
          },
          xAxis: {
            type: 'category',
            // 양 끝 여백을 두어 꺾은선 시작점과 끝점이 축선에 붙지 않게 처리
            boundaryGap: true, 
            data: ['2023년', '2024년', '2025년', '2026년(진행중)']
          },
          yAxis: {
            type: 'value',
            name: '(개)',
            nameLocation: 'end',
            nameGap: 20,
            nameTextStyle: {
              align: 'left',
              padding: [0, 0, 0, -30] // 축 라인 위로 텍스트 정렬
            },
            // 데이터 범위(7~235)에 맞춰 그리드가 예쁘게 잡히도록 최대값 설정
            min: 0,
            max: 250,
            interval: 50
          },
          series: [
            {
              name: '모델수',
              type: 'line',
              data: [7, 17, 235, 50],
              itemStyle: { color: '#56a3f1' },
              lineStyle: { width: 3 },
              // 꺾은선 꼭짓점 위에 "X개 모델" 라벨 표시
              label: {
                show: true,
                position: 'top', // 꼭짓점 바로 위에 배치
                distance: 10,
                color: '#000',
                fontWeight: 'normal',
                formatter: (params) => params.value + '개 모델'
              }
            }
          ]
        };
        if (option && typeof option === 'object') {
          myChart.setOption(option);
        }

    }}}


/* ----------------------------------------------------------

    지속가능경영 - 지배구조

-------------------------------------------------------------*/

    $(".corp-tab-group > li").click(function (e) {
        e.preventDefault();

        var _this = $(this);
        var _target = _this.attr('data-tab');

        var _tabGroup = _this.closest('.corp-tab-group');
        _tabGroup.children('li').removeClass('on');
        _this.addClass('on');

        var _tableArea = _tabGroup.next('.gov-table-area');
        _tableArea.children('.items').hide();
        _tableArea.children('#' + _target).show();
    });


/* ----------------------------------------------------------

    윤리경영 - 체계&활동

-------------------------------------------------------------*/

    // 윤리경영제보 팝업 열기
    $("#ethic-inform-btn").click(function(e){
        e.preventDefault();

        $(".ethic-inform-area").show();
        $('html, body').addClass('scroll-none');
        scrollDisable()
    })

    // 윤리경영제보 팝업 닫기
    $(".ethic-inform-close").click(function(){

        $(".ethic-inform-area").hide();
        $('html, body').removeClass('scroll-none');
        scrollAble()
    })


    $("#ethic-inform-upload").on('change',function(){
        var _fileName = $("#ethic-inform-upload").val();
        $(".ethic-inform-filename").val(_fileName);
    });



});




