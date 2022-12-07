# 1

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

  - 2022/12/06 현재 카타르월드컵이므로 #802045과 #f8f0f2을 혼합하여 대체적인 테마를 월드컵과 같이 따라가는 형식으로 색상 및 디자인으로 제작. (221206)

- Header 작업

  - 헤더의 드롭다운 리스트 조정. (221206)
  - 드롭다운 디자인 조정. (221207)
  - 검색기능 추가. (221207)

- Mainpage 작업

  - 각 대륙의 SVG 및 텍스트의 <Link/> 및 hover작업. (221207)

- Country 작업

  - 텍스트 및 디자인 조정 - border, text . (221207)
