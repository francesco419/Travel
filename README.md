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

- 이미지상자 제작. onmouseEnter를 사용하여 마우스 오버시 상단의 이미지가 바뀌도록 설정. 클릭시 확대 및 레이아수 기능 추가예정.
