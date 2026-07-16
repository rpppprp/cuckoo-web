"use strict";


$(function(){


    // ECharts 리사이즈 공용 함수
    window.resizeActiveChart = function() {
      // ECharts인스턴스 속성 검색
      document.querySelectorAll('[_echarts_instance_]').forEach(function(dom) {
          var chart = echarts.getInstanceByDom(dom);
          if (chart) {
              chart.resize();
          }
      });
    };


  /* -----------------------------------------------------------

      투자정보 - 실시간 주가정보

      // 5분간격으로 주가정보를 캐싱해오려면
      // 한국투자증권 api가 필요합니다.

  -------------------------------------------------------------*/

    // 차트 인스턴스 독립 변수
    let chartHoldings = null;
    let chartHomesys = null;
    const formatTime = echarts.time.format;

    // 1년치 연속 주가 데이터 생성 (공용)
    function generateYearlyData() {
        var seriesData = [];
        var today = new Date();
        var startTime = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate()).getTime();
        var endTime = today.getTime();

        var current = startTime;
        var val = 1669;
        const oneDay = 24 * 60 * 60 * 1000;

        while (current <= endTime) {
            val = val + Math.floor((Math.random() - 0.5) * 20 * 100) / 100;
            val = +val.toFixed(2);
            seriesData.push([current, val]);
            current += oneDay;
        }
        return seriesData;
    }

    // 공통 옵션 생성 헬퍼
    function createChartOption(data) {
        return {
            tooltip: { show: true, trigger: 'axis', axisPointer: { lineStyle: { color: '#ff5b53' } } },
            grid: { left: '3%', right: '4%', bottom: '15%', top: '15%', containLabel: true },
            yAxis: [{ type: 'value', min: 'dataMin', name: '금액' }],
            xAxis: [{
                type: 'time',
                axisLabel: { formatter: (v) => formatTime(v, '{yyyy}-{MM}-{dd}', true) }
            }],
            dataZoom: [
                { type: 'inside', start: 0, end: 100 }, // 처음부터 0~100 전체 영역 노출
                { type: 'slider', start: 0, end: 100 }
            ],
            series: [{
                name: '주가',
                type: 'line',
                symbolSize: 0,
                data: data,
                itemStyle: { color: '#ff5b53' },
                lineStyle: { color: '#ff5b53', width: 2 }
            }]
        };
    }

    // stockHoldings 펑션
    function stockHoldings() {
        var dom = document.getElementById('stock-holdings');
        if (!dom) return;

        chartHoldings = echarts.init(dom, null, { renderer: 'canvas', useDirtyRect: false });
        var allData = generateYearlyData();
        chartHoldings.setOption(createChartOption(allData));
    }

    // stockHomesys 펑션
    function stockHomesys() {
        var dom = document.getElementById('stock-homesys');
        if (!dom) return;

        chartHomesys = echarts.init(dom, null, { renderer: 'canvas', useDirtyRect: false });
        var allData = generateYearlyData();
        chartHomesys.setOption(createChartOption(allData));
    }

    // 통합 기간 제어 전역 함수
    window.changeChartPeriod = function(period, target) {
        var targetChart = (target === 'holdings') ? chartHoldings : chartHomesys;
        var btnClass = (target === 'holdings') ? '.btn-chart-holdings' : '.btn-chart-homesys';
        
        if (!targetChart) return;

        var startPercent = 0;
        if (period === 'day') startPercent = 99.7;
        else if (period === 'week') startPercent = 98.0;
        else if (period === 'month') startPercent = 91.6;
        else if (period === 'year') startPercent = 0;

        targetChart.setOption({
            dataZoom: [
                { type: 'inside', start: startPercent, end: 100 },
                { type: 'slider', start: startPercent, end: 100 }
            ]
        });

        $(btnClass).removeClass('active');
        $(`button[onclick="changeChartPeriod('${period}', '${target}')"]`).addClass('active');
    };


    // 두 개의 차트 함수 호출
    stockHoldings();
    stockHomesys();

    // 리사이즈 이벤트 바인딩
    window.addEventListener('resize', window.resizeActiveChart);
    

  /* -----------------------------------------------------------

      투자정보 - 재무제표

  -------------------------------------------------------------*/


    if ($('#statement-cuckooHoldings').length > 0) {{{

      // 쿠쿠홀딩스 - 매출
      function stateHoldings01(){
        var dom = document.getElementById('statement-holdings-01');
        var myChart = echarts.init(dom, null, {
          renderer: 'canvas',
          useDirtyRect: false
        });
        var app = {};
        
        var option;
  
        option = {
          title: [
            {
              text: '매출',
              left: 'left',
              textStyle: { fontSize: 18 }
            },
            {
              text: '단위: 억(원)', // 서브텍스트 역할을 할 텍스트
              right: '0%',         // 오른쪽 끝으로 배치
              top: '15',            // 상단 여백 조절
              textStyle: { 
                fontSize: 14, 
                color: '#999',
                fontWeight: 'normal' 
              }
            }
          ],
          legend: { 
            bottom: 'bottom', 
            left: 'center',
            data: ['2023년', '2024년', '2025년'] // 범례 이름 명시
          },
          xAxis: {
            type: 'category',
            data: ['2023년', '2024년', '2025년'] // X축 라벨 유지
          },
          yAxis: { type: 'value', scale: 'true', min: 7000 },
          series: [
            {
              name: '2023년',
              type: 'bar',
              data: [7723, '-', '-'], // 첫 번째 칸만 데이터 입력
              itemStyle: { color: '#999999' },
              label: { show: true, position: 'top' },
              barGap: '-100%' // 막대들이 겹치게 설정하여 X축 중앙에 위치시킴
            },
            {
              name: '2024년',
              type: 'bar',
              data: ['-', 8338, '-'], // 두 번째 칸만 데이터 입력
              itemStyle: { color: '#dbae6d' },
              label: { show: true, position: 'top' },
              barGap: '-100%'
            },
            {
              name: '2025년',
              type: 'bar',
              data: ['-', '-', 9291], // 세 번째 칸만 데이터 입력
              itemStyle: { color: '#FF5B53' },
              label: { show: true, position: 'top' },
              barGap: '-100%'
            }
          ]
        };
  
        if (option && typeof option === 'object') {
          myChart.setOption(option);
        }
  
        window.addEventListener('resize', myChart.resize);
  
      }
      
      // 쿠쿠홀딩스 - 영업이익
      function stateHoldings02(){
          var dom = document.getElementById('statement-holdings-02');
          var myChart = echarts.init(dom, null, {
              renderer: 'canvas',
              useDirtyRect: false
          });
          var app = {};
          
          var option;

          option = {
              title: [
              {
                  text: '영업이익',
                  left: 'left',
                  textStyle: { fontSize: 18 }
              },
              {
                  text: '단위: 억(원)', // 서브텍스트 역할을 할 텍스트
                  right: '0%',         // 오른쪽 끝으로 배치
                  top: '15',            // 상단 여백 조절
                  textStyle: { 
                  fontSize: 14, 
                  color: '#999',
                  fontWeight: 'normal' 
                  }
              }
              ],
              legend: { 
              bottom: 'bottom', 
              left: 'center',
              data: ['2023년', '2024년', '2025년'] // 범례 이름 명시
              },
              xAxis: {
              type: 'category',
              data: ['2023년', '2024년', '2025년'] // X축 라벨 유지
              },
              yAxis: { type: 'value', scale: 'true', min: 750 },
              series: [
              {
                  name: '2023년',
                  type: 'bar',
                  data: [866, '-', '-'], // 첫 번째 칸만 데이터 입력
                  itemStyle: { color: '#999999' },
                  label: { show: true, position: 'top' },
                  barGap: '-100%' // 막대들이 겹치게 설정하여 X축 중앙에 위치시킴
              },
              {
                  name: '2024년',
                  type: 'bar',
                  data: ['-', 1032, '-'], // 두 번째 칸만 데이터 입력
                  itemStyle: { color: '#dbae6d' },
                  label: { show: true, position: 'top' },
                  barGap: '-100%'
              },
              {
                  name: '2025년',
                  type: 'bar',
                  data: ['-', '-', 1140], // 세 번째 칸만 데이터 입력
                  itemStyle: { color: '#FF5B53' },
                  label: { show: true, position: 'top' },
                  barGap: '-100%'
              }
              ]
          };
          if (option && typeof option === 'object') {
              myChart.setOption(option);
          }

          window.addEventListener('resize', myChart.resize);

      }

      // 쿠쿠홀딩스 - 순이익
      function stateHoldings03(){
          var dom = document.getElementById('statement-holdings-03');
          var myChart = echarts.init(dom, null, {
              renderer: 'canvas',
              useDirtyRect: false
          });
          var app = {};
          
          var option;

          option = {
              title: [
              {
                  text: '순이익',
                  left: 'left',
                  textStyle: { fontSize: 18 }
              },
              {
                  text: '단위: 억(원)', // 서브텍스트 역할을 할 텍스트
                  right: '0%',         // 오른쪽 끝으로 배치
                  top: '15',            // 상단 여백 조절
                  textStyle: { 
                  fontSize: 14, 
                  color: '#999',
                  fontWeight: 'normal' 
                  }
              }
              ],
              legend: { 
              bottom: 'bottom', 
              left: 'center',
              data: ['2023년', '2024년', '2025년'] // 범례 이름 명시
              },
              xAxis: {
              type: 'category',
              data: ['2023년', '2024년', '2025년'] // X축 라벨 유지
              },
              yAxis: { type: 'value', scale: 'true', min: 1200 },
              series: [
              {
                  name: '2023년',
                  type: 'bar',
                  data: [1301, '-', '-'], // 첫 번째 칸만 데이터 입력
                  itemStyle: { color: '#999999' },
                  label: { show: true, position: 'top' },
                  barGap: '-100%' // 막대들이 겹치게 설정하여 X축 중앙에 위치시킴
              },
              {
                  name: '2024년',
                  type: 'bar',
                  data: ['-', 1370, '-'], // 두 번째 칸만 데이터 입력
                  itemStyle: { color: '#dbae6d' },
                  label: { show: true, position: 'top' },
                  barGap: '-100%'
              },
              {
                  name: '2025년',
                  type: 'bar',
                  data: ['-', '-', 1452], // 세 번째 칸만 데이터 입력
                  itemStyle: { color: '#FF5B53' },
                  label: { show: true, position: 'top' },
                  barGap: '-100%'
              }
              ]
          };
          if (option && typeof option === 'object') {
              myChart.setOption(option);
          }

          window.addEventListener('resize', myChart.resize);

      }

      // 쿠쿠홀딩스 차트 함수 호출
      stateHoldings01();
      stateHoldings02();
      stateHoldings03();

    }}}
  
  
    
    if ($('#statement-cuckooHomesys').length > 0) {{{

      // 쿠쿠홈시스 - 매출
      function stateHomesys01(){
        var dom = document.getElementById('statement-homesys-01');
        var myChart = echarts.init(dom, null, {
          renderer: 'canvas',
          useDirtyRect: false
        });
        var app = {};
        
        var option;

        option = {
          title: [
            {
              text: '매출',
              left: 'left',
              textStyle: { fontSize: 18 }
            },
            {
              text: '단위: 억(원)', // 서브텍스트 역할을 할 텍스트
              right: '0%',         // 오른쪽 끝으로 배치
              top: '15',            // 상단 여백 조절
              textStyle: { 
                fontSize: 14, 
                color: '#999',
                fontWeight: 'normal' 
              }
            }
          ],
          legend: { 
            bottom: 'bottom', 
            left: 'center',
            data: ['2023년', '2024년', '2025년'] // 범례 이름 명시
          },
          xAxis: {
            type: 'category',
            data: ['2023년', '2024년', '2025년'] // X축 라벨 유지
          },
          yAxis: { type: 'value', scale: 'true', min: 7000 },
          series: [
            {
              name: '2023년',
              type: 'bar',
              data: [7723, '-', '-'], // 첫 번째 칸만 데이터 입력
              itemStyle: { color: '#999999' },
              label: { show: true, position: 'top' },
              barGap: '-100%' // 막대들이 겹치게 설정하여 X축 중앙에 위치시킴
            },
            {
              name: '2024년',
              type: 'bar',
              data: ['-', 8338, '-'], // 두 번째 칸만 데이터 입력
              itemStyle: { color: '#dbae6d' },
              label: { show: true, position: 'top' },
              barGap: '-100%'
            },
            {
              name: '2025년',
              type: 'bar',
              data: ['-', '-', 9291], // 세 번째 칸만 데이터 입력
              itemStyle: { color: '#FF5B53' },
              label: { show: true, position: 'top' },
              barGap: '-100%'
            }
          ]
        };

        if (option && typeof option === 'object') {
          myChart.setOption(option);
        }

        window.addEventListener('resize', myChart.resize);

      }
    
      // 쿠쿠홈시스 - 영업이익
      function stateHomesys02(){
        var dom = document.getElementById('statement-homesys-02');
        var myChart = echarts.init(dom, null, {
            renderer: 'canvas',
            useDirtyRect: false
        });
        var app = {};
        
        var option;

        option = {
            title: [
            {
                text: '영업이익',
                left: 'left',
                textStyle: { fontSize: 18 }
            },
            {
                text: '단위: 억(원)', // 서브텍스트 역할을 할 텍스트
                right: '0%',         // 오른쪽 끝으로 배치
                top: '15',            // 상단 여백 조절
                textStyle: { 
                fontSize: 14, 
                color: '#999',
                fontWeight: 'normal' 
                }
            }
            ],
            legend: { 
            bottom: 'bottom', 
            left: 'center',
            data: ['2023년', '2024년', '2025년'] // 범례 이름 명시
            },
            xAxis: {
            type: 'category',
            data: ['2023년', '2024년', '2025년'] // X축 라벨 유지
            },
            yAxis: { type: 'value', scale: 'true', min: 750 },
            series: [
            {
                name: '2023년',
                type: 'bar',
                data: [866, '-', '-'], // 첫 번째 칸만 데이터 입력
                itemStyle: { color: '#999999' },
                label: { show: true, position: 'top' },
                barGap: '-100%' // 막대들이 겹치게 설정하여 X축 중앙에 위치시킴
            },
            {
                name: '2024년',
                type: 'bar',
                data: ['-', 1032, '-'], // 두 번째 칸만 데이터 입력
                itemStyle: { color: '#dbae6d' },
                label: { show: true, position: 'top' },
                barGap: '-100%'
            },
            {
                name: '2025년',
                type: 'bar',
                data: ['-', '-', 1140], // 세 번째 칸만 데이터 입력
                itemStyle: { color: '#FF5B53' },
                label: { show: true, position: 'top' },
                barGap: '-100%'
            }
            ]
        };
        if (option && typeof option === 'object') {
            myChart.setOption(option);
        }

        window.addEventListener('resize', myChart.resize);

      }

      // 쿠쿠홈시스 - 순이익
      function stateHomesys03(){
        var dom = document.getElementById('statement-homesys-03');
        var myChart = echarts.init(dom, null, {
            renderer: 'canvas',
            useDirtyRect: false
        });
        var app = {};
        
        var option;

        option = {
            title: [
            {
                text: '순이익',
                left: 'left',
                textStyle: { fontSize: 18 }
            },
            {
                text: '단위: 억(원)', // 서브텍스트 역할을 할 텍스트
                right: '0%',         // 오른쪽 끝으로 배치
                top: '15',            // 상단 여백 조절
                textStyle: { 
                fontSize: 14, 
                color: '#999',
                fontWeight: 'normal' 
                }
            }
            ],
            legend: { 
            bottom: 'bottom', 
            left: 'center',
            data: ['2023년', '2024년', '2025년'] // 범례 이름 명시
            },
            xAxis: {
            type: 'category',
            data: ['2023년', '2024년', '2025년'] // X축 라벨 유지
            },
            yAxis: { type: 'value', scale: 'true', min: 1200 },
            series: [
            {
                name: '2023년',
                type: 'bar',
                data: [1301, '-', '-'], // 첫 번째 칸만 데이터 입력
                itemStyle: { color: '#999999' },
                label: { show: true, position: 'top' },
                barGap: '-100%' // 막대들이 겹치게 설정하여 X축 중앙에 위치시킴
            },
            {
                name: '2024년',
                type: 'bar',
                data: ['-', 1370, '-'], // 두 번째 칸만 데이터 입력
                itemStyle: { color: '#dbae6d' },
                label: { show: true, position: 'top' },
                barGap: '-100%'
            },
            {
                name: '2025년',
                type: 'bar',
                data: ['-', '-', 1452], // 세 번째 칸만 데이터 입력
                itemStyle: { color: '#FF5B53' },
                label: { show: true, position: 'top' },
                barGap: '-100%'
            }
            ]
        };
        if (option && typeof option === 'object') {
            myChart.setOption(option);
        }

        window.addEventListener('resize', myChart.resize);

      }

      // 쿠쿠홈시스 차트 함수 호출
      stateHomesys01();
      stateHomesys02();
      stateHomesys03();

    }}}
    


  /* -----------------------------------------------------------

      투자정보 - 주주정보

  -------------------------------------------------------------*/


  if ($('#info-cuckooHoldings').length > 0) {{{
    function infoHoldings() {
      var dom = document.getElementById('info-holdings');
      var myChart = echarts.init(dom, null, {
        renderer: 'canvas',
        useDirtyRect: false
      });
      var app = {};
      
      var option;

      option = {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          right: '30',
          top: '50'
        },
        series: [
          {
            name: '2025년 주주현황',
            type: 'pie',
            radius: '60%',
            center: ['45%', '50%'],
            data: [
              { value: 64.6, name: '최대주주 및 특수관계인' },
              { value: 12.6, name: '자사주' },
              { value: 5.4, name: '국내 개인' },
              { value: 5.4, name: '국내 기관 등 (개인 외)' },
              { value: 12.0, name: '외국인' }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };

      if (option && typeof option === 'object') {
        myChart.setOption(option);
      }

      window.addEventListener('resize', myChart.resize);
    }

    // 차트 함수 호출
    infoHoldings()

  }}}

  
  if ($('#info-cuckooHoldings').length > 0) {{{

    function infoHomesys() {
      var dom = document.getElementById('info-homesys');
      var myChart = echarts.init(dom, null, {
        renderer: 'canvas',
        useDirtyRect: false
      });
      var app = {};
      
      var option;

      option = {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          right: '30',
          top: '50'
        },
        series: [
          {
            name: '2025년 주주현황',
            type: 'pie',
            radius: '60%',
            center: ['45%', '50%'],
            data: [
              { value: 64.6, name: '최대주주 및 특수관계인' },
              { value: 12.6, name: '자사주' },
              { value: 5.4, name: '국내 개인' },
              { value: 5.4, name: '국내 기관 등 (개인 외)' },
              { value: 12.0, name: '외국인' }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };

      if (option && typeof option === 'object') {
        myChart.setOption(option);
      }

      window.addEventListener('resize', myChart.resize);
    }

    // 차트 함수 호출
    infoHomesys()

  }}}



  /* -----------------------------------------------------------

      투자정보 - 주주환원

  -------------------------------------------------------------*/


    if ($('#return-cuckooHoldings').length > 0) {{{
      function returnHoldings() {
        console.log('DOM 확인:', document.getElementById('return-holdings'));
        var dom = document.getElementById('return-holdings');
        var myChart = echarts.init(dom, null, {
          renderer: 'canvas',
          useDirtyRect: false
        });
        var app = {};
        
        var option;
  
        option = {
          tooltip: {
            trigger: 'axis',
            axisPointer: { type: 'cross' }
          },
          grid: {
            left: '3%',   // 왼쪽 여백 (수치가 작을수록 바깥으로 확장)
            right: '4%',  // 오른쪽 여백
            bottom: '10%', // 범례가 아래에 있다면 여유를 좀 둬야 함
            top: '10%',    // 타이틀 공간
            containLabel: true // 라벨(숫자 등)이 잘리지 않게 그리드 안으로 포함
          },
          legend: {
            data: ['주당배당금', '배당수익률', '배당성향'],
            bottom: 0
          },
          xAxis: [
            {
              type: 'category',
              data: ['제45기', '제46기', '제47기', '제48기', '제49기'],
              axisPointer: { type: 'shadow' }
            }
          ],
          yAxis: [
            {
              type: 'value',
              name: '금액(백만원)',
              nameLocation: 'end', // 축의 끝(상단)에 배치
              nameGap: 40,         // 축 라인과 텍스트 사이의 간격
              nameTextStyle: {
                align: 'left',      // 왼쪽 정렬
                padding: [0, 0, 0, -40] // [상, 우, 하, 좌] 좌측 여백(음수)으로 눈금선에 맞춤
              }
            },
            {
              type: 'value',
              name: '비율(%)',
              nameLocation: 'end',
              nameGap: 40,
              nameTextStyle: {
                align: 'right',     // 오른쪽 정렬
                padding: [0, -40, 0, 0] // 우측 여백(음수)으로 눈금선에 맞춤
              }
            }
          ],
          series: [
            {
              name: '주당배당금',
              type: 'bar',
              tooltip: { valueFormatter: (value) => value.toLocaleString() + ' 백만원' },
              data: [700, 800, 1100, 1200, 1550],
              itemStyle: { color: '#5470c6' }
            },
            {
              name: '배당수익률',
              type: 'line',
              yAxisIndex: 1, // 오른쪽 Y축 사용
              tooltip: { valueFormatter: (value) => value + ' %' },
              data: [3.6, 4.8, 6.6, 5.0, 5.1],
              itemStyle: { color: '#fac858' }
            },
            {
              name: '배당성향',
              type: 'line',
              yAxisIndex: 1, // 오른쪽 Y축 사용
              tooltip: { valueFormatter: (value) => value + ' %' },
              data: [16.82, 21.31, 26.27, 27.16, 33.09],
              itemStyle: { color: '#ee6666' }
            }
          ]
        };
  
        if (option && typeof option === 'object') {
          myChart.setOption(option);
        }
  
        window.addEventListener('resize', myChart.resize);
      }

      // 차트 함수 호출
      returnHoldings()

    }}}


    if ($('#return-cuckooHomesys').length > 0) {{{
      function returnHomesys() {
        var dom = document.getElementById('return-homesys');
        var myChart = echarts.init(dom, null, {
          renderer: 'canvas',
          useDirtyRect: false
        });
        var app = {};
        
        var option;
  
        option = {
          tooltip: {
            trigger: 'axis',
            axisPointer: { type: 'cross' }
          },
          grid: {
            left: '3%',   // 왼쪽 여백 (수치가 작을수록 바깥으로 확장)
            right: '4%',  // 오른쪽 여백
            bottom: '10%', // 범례가 아래에 있다면 여유를 좀 둬야 함
            top: '10%',    // 타이틀 공간
            containLabel: true // 라벨(숫자 등)이 잘리지 않게 그리드 안으로 포함
          },
          legend: {
            data: ['주당배당금', '배당수익률', '배당성향'],
            bottom: 0
          },
          xAxis: [
            {
              type: 'category',
              data: ['제45기', '제46기', '제47기', '제48기', '제49기'],
              axisPointer: { type: 'shadow' }
            }
          ],
          yAxis: [
            {
              type: 'value',
              name: '금액(백만원)',
              nameLocation: 'end', // 축의 끝(상단)에 배치
              nameGap: 40,         // 축 라인과 텍스트 사이의 간격
              nameTextStyle: {
                align: 'left',      // 왼쪽 정렬
                padding: [0, 0, 0, -40] // [상, 우, 하, 좌] 좌측 여백(음수)으로 눈금선에 맞춤
              }
            },
            {
              type: 'value',
              name: '비율(%)',
              nameLocation: 'end',
              nameGap: 40,
              nameTextStyle: {
                align: 'right',     // 오른쪽 정렬
                padding: [0, -40, 0, 0] // 우측 여백(음수)으로 눈금선에 맞춤
              }
            }
          ],
          series: [
            {
              name: '주당배당금',
              type: 'bar',
              tooltip: { valueFormatter: (value) => value.toLocaleString() + ' 백만원' },
              data: [700, 800, 1100, 1200, 1550],
              itemStyle: { color: '#5470c6' }
            },
            {
              name: '배당수익률',
              type: 'line',
              yAxisIndex: 1, // 오른쪽 Y축 사용
              tooltip: { valueFormatter: (value) => value + ' %' },
              data: [3.6, 4.8, 6.6, 5.0, 5.1],
              itemStyle: { color: '#fac858' }
            },
            {
              name: '배당성향',
              type: 'line',
              yAxisIndex: 1, // 오른쪽 Y축 사용
              tooltip: { valueFormatter: (value) => value + ' %' },
              data: [16.82, 21.31, 26.27, 27.16, 33.09],
              itemStyle: { color: '#ee6666' }
            }
          ]
        };
  
        if (option && typeof option === 'object') {
          myChart.setOption(option);
        }
  
        window.addEventListener('resize', myChart.resize);
      }

      // 차트 함수 호출
      returnHomesys()
      
    }}}





});


