
"use strict";

$(function(){





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



});

