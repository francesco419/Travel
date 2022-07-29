import Map from "../Object/Header";

function MainPage(){
    return(
        <div>
            <Map/>
            <p>hi there</p>
            <p>외교부_국가∙지역별 여행경보 https://www.data.go.kr/iim/api/selectAPIAcountView.do</p>
            <p>외교부_국가·지역별 일반사항 https://www.data.go.kr/data/15099534/openapi.do</p>
            <p>외교부_국가·지역별 일반정보 https://www.data.go.kr/data/15076234/openapi.do</p>
            <p>헤더설정 - 아이콘 / 대륙 / 국가 / 설정 /</p>
            <p>국가별 중요 - 환율 / 여행경보 / 언어 / 핫스팟</p>
            <p>각 나라별로 최소 3곳 스팟 정보 - 이름 / 위치 / 정보 / 랜드마크</p>
            <p>전체이미지 - 대륙 - 나라 - 스팟</p>
        </div>
    )
}

export default MainPage;