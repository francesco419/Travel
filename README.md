# 1

- 사용하는 API
  - 공공데이터포털
    - 외교부\_국가별 기본정보
    - 외교부\_국가/지역별 여행경보

## 1.1

인트로페이지 및 헤더초기 작업

## 1.2

메인페이지 및 서브페이지 기능 구현

- 대륙별 국가 리스트를 알파벳 순서대로 정렬 및 영어/한글 전환

  - useState의 변수가 즉각적으로 바뀌지 않는 문제발생. => 변수를 useEffect의 인수로사용해 변수 값이 바뀔때마다 랜더링을 다시한다.

- 공공데이터 API 로드작업

  - 공공데이터에서 제공하는 아미지가 이미지에 대한 링크가 아닌 이미지를 다운로드 하는것으로 인해 로드 불가.

- 헤더 드롭다운메뉴 및 세부작업

# 2

## 2.1

각 나라별 정보 API를 이용하여 인터페이스의 구현 및 디자인

- 이미지상자 제작. onmouseEnter를 사용하여 마우스 오버시 상단의 이미지가 바뀌도록 설정. 클릭시 확대 및 레이아웃 기능 추가예정.

- 나라 정보 인터페이스 구현 및 여행경보 정보 추가.

  - 나라명, 수도, 기후, 인구수, 언어, 종교, 여행경보 총 7개의 탭으로 구분.
  - 수도, 언어, 종교의 경우 쉼표(,)등을 이용해 여러개가 표시되므로 `Array.split(',')`을 이용해 정보를 배열에 넣고, 첫번째 정보만 표시하고 그외의 정보는 '외 n개'로 표시 하였다.

  ```JS
   const splitter=(cap,lang)=>{
       let temp;
       if(lang===null){
           temp = cap.split('’');
           return temp[0];
       }else{
           temp = lang.split(',');
           return `${temp[0]} 외 ${temp.length}개`
       }
   }
  ```

  - 각 여행경보에 대해 외교부 해외안전여행부에서 표시한 여행경보에대한 자세한 페이지를 연결함.

  - 이미지 오버레이 작업

    - 이미지 클릭시 화면 전체로 등장하는 오버레이에 대한 작업.
    - `document.getElementById('ID').style.display='none';`와 같은 기능을 이용하여 팝업을 구현함.

    ```html
      <div id='popupimg' className={styles.popup_window}>
          <div className={styles.popup_flex}>
              <img className={styles.popup_img} src={imagedata ? imagedata : Calarmlevel.data[0].flag_download_url}/>
              <button className={styles.popup_button} onClick={()=>{
                  document.getElementById('popupimg').style.display='none';
              }}>Close</button>
          </div>
      </div>
    ```

    ```css
    .popup_window {
      display: none;
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background-color: rgba(0, 0, 0, 0.85);
    }
    ```

## 2.2

- Asia 페이지 디자인 및 위치 조정

  - 카타르월드컵 기간중으로, '#802045'과 '#f8f0f2'을 혼합하여 대체적인 테마를 월드컵과 같이 따라가는 형식으로 색상 및 디자인으로 제작. (221206)
  - 텍스트 및 디자인 수정. (221210)

- Header 작업

  - 헤더의 드롭다운 리스트 조정. (221206)
  - 드롭다운 디자인 조정. (221207)
  - 검색창 추가. (221207)
  - 드롭다운 리스트의 요소 링크 추가. (221210)
  - 방문한 페이지의 나라를 보여주고, 이를 삭제 및 클릭으로 다시 방문할 수 있는 인터페이스를 추가 하였다. (221211)

    - 페이지 입장시마다 LocalStorage에 각각 저장하였고, 이를 헤더에서 불러들여 인터페이스를 구축하였다.

      - 로컬스토리지 작업

      ```javascript
      const getVisit = () => {
        if (JSON.parse(localStorage.getItem("VisitHistory")) === null) {
          localStorage.setItem("VisitHistory", JSON.stringify(params.id));
          console.log("배열 처음 생성");
          //Localstorge에 아무것도 없을시 나라명 추가.
        } else {
          let visit;
          if (Array.isArray(JSON.parse(localStorage.getItem("VisitHistory")))) {
            visit = JSON.parse(localStorage.getItem("VisitHistory"));
            //Localstorge에 정보가 배열일때 변수 visit에 바로 할당.
          } else {
            visit = [JSON.parse(localStorage.getItem("VisitHistory"))];
            //Localstorge의 정보가 배열이 아닐시 배열 형태로 만들어 할당.
          }
          let index = visit.indexOf(params.id);
          //Localstorge에 같은 데이터가 있는지 검색.
          if (index !== -1) {
            if (index === visit.length - 1) {
              console.log("있는거 유지");
              return;
              //맨 끝에 같은 데이터 있을시 리턴.
            } else {
              visit.splice(index, 1);
              visit.push(params.id);
              localStorage.setItem("VisitHistory", JSON.stringify(visit));
              console.log("있는거 삭제하고 넣기");
              //배열 중간에 같은 데이터 있을시 삭제 및 배열 끝으로 추가.
            }
          } else {
            visit.push(params.id);
            localStorage.setItem("VisitHistory", JSON.stringify(visit));
            console.log("새로넣기");
            //새로운 데이터 추가시 맨 끝에 추가.
          }
        }
      };
      ```

      - 헤더 엘레먼트 삭제함수

      ```javascript
      const Delete_Content = (data) => {
        document.getElementById(data).remove(); //엘레먼트삭제
        let local = JSON.parse(localStorage.getItem("VisitHistory")); //로컬스토리지 데이터 불러오기
        let index = local.indexOf(data); //삭제할 데이터 인텍스 찾기
        local.splice(index, 1); //인덱스를 이용해 데이터 삭제
        localStorage.setItem("VisitHistory", JSON.stringify(local)); //로컬스토리지에 저장
      };
      ```

  - 검색기능 구현(페이지 이동). (221212)
  - 코드 수정. (221212)

- Mainpage 작업

  - 각 대륙의 SVG 및 텍스트의 <Link/> 및 hover작업. (221207)
  - 버튼 수정. (221209)

- Country 작업

  - 텍스트 및 디자인 조정 - border, text . (221207) / (221210) / (221216)
  - 환율표시 및 계산기능 제작. (221213)

    - Fixer.io의 API를 통해 환율데이터 가져오기 => access_key의 오류로 (221213) 문제발생.
    - API로드 오류로인해 각 데이터 배치를 완료하지 못함. => 일부 샘플 데이터를 통해 대체.
    - input기능을 통해 환율을 계산할 수 있으며, state를 사용함으로서 입력함과 동시에 계산이 되도록 구현.
      - input사용시 한글자만 입력해도 focus가 풀리는 문제발생.
        - 위 문제는 함수속에 함수를 가지고 있는 input일 경우 이러한 문제가 발생한다.(hook함수 내에 다른 hook함수)
        - 반복된 엘레먼트를 function형태로 재사용을 하려고 하였으나, function함수-input의 onChange함수를 가지고 있었으므로 input과 관련된 엘레먼트를 꺼냈더니 문제해결됨.
    - API호출 작업 필요.
    - 버튼 삭제.

    ```js
    const [v1, setV1] = useState(1);
    const [v2, setV2] = useState();

    const v1Change = ({ target: { value } }) => {
      setV1(value);
      setV2(
        parseInt(value * KRWtoUSD(exchange[0].rates.USD)).toLocaleString(
          "ko-KR"
        )
      ); //한국에서는 센트(cent)의 개념이 없기에 parseInt로 소수점을 잘라내주었다.
    };

    const v2Change = ({ target: { value } }) => {
      setV2(value);
      setV1(
        parseFloat((value * exchange[0].rates.USD).toFixed(2)).toLocaleString(
          "ko-KR"
        )
      ); //parseFloat을 통해 소수점을 가져오고, toFixed로 소수점을 잘라내고, toLocaleString으로 자릿수 구분.
    };

    export const exchange = [
      {
        base: "KRW",
        date: "2022-12-13",
        rates: {
          USD: 0.000765,
        },
        success: true,
        timestamp: 1670897163,
      },
    ]; //exchange.js파일로 대체
    ```

    ```html
       <div className={styles.exchange}>
           <div className={styles.exchange_box}>
               <div className={styles.info_box}>
                   <div className={styles.info_name}>USD (달러)</div>
                   <input
                   placeholder={swapExchange ? (exchange[0].rates.USD*1000).toFixed(3) : `1`}
                   type='text'
                   value={v1}
                   onChange={v1Change}
                   ></input>
               </div>
               <<!-- button className={styles.exchange_button} onClick={exchangeClick}>◎</button> -->
               <div className={styles.info_box}>
                   <div className={styles.info_name}>KRW (원)</div>
                   <input
                   placeholder={swapExchange ? 1000 : KRWtoUSD(exchange[0].rates.USD).toFixed(3)}
                   type='text'
                   value={v2}
                   onChange={v2Change}
                   ></input>
               </div>
           </div>
       </div>
    ```

- Customer 페이지 제작

  - 향후 개선점 및 문의 등의 메세지를 이메일을 통해 받을 수 있는 문의 페이지 제작. (221210)
  - 디자인 조정. (221210)

- DataInfo 및 NavItem에 저장된 데이터 수정. (221212)

## 2.3

-introduction 페이지

- 디자인 조정. (221218)
