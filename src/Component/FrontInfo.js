import styles from "../Page/MainPage.module.css";

export default function FrontInfo() {
  const imgArr = [
    "https://i.pinimg.com/564x/4d/1c/8c/4d1c8c4dea83b96357793e2a4f1aeb94.jpg",
    "https://i.pinimg.com/564x/69/ed/0a/69ed0a13a06522216c9450433ef0caf8.jpg",
    "https://i.pinimg.com/564x/6d/c9/61/6dc9616549ebda677ac20b714a18116b.jpg",
    "https://i.pinimg.com/736x/8b/f7/c7/8bf7c717e86430d5a5c854284c2ea955.jpg",
  ];
  return (
    <div className={styles["commentation"]}>
      <div className={styles["block-commentation"]}>
        <table>
          <tbody>
            <tr>
              <td style={{ backgroundImage: `url(${imgArr[0]})` }}></td>
              <td style={{ backgroundImage: `url(${imgArr[1]})` }}></td>
            </tr>
            <tr>
              <td style={{ backgroundImage: `url(${imgArr[2]})` }}></td>
              <td style={{ backgroundImage: `url(${imgArr[3]})` }}></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className={styles["block-commentation-comment"]}>
        <h1>여행하길 망설이고 계신가요?</h1>
        <p>Travel Away와 함께 여행플랜을 시작하세요.</p>
        <p>나에게 맞는 여행지 테스트와 여행카드를 제작하세요.</p>
        <p>원하는 대륙을 검색 혹은 가장 많이 찾는 여행지를 추천 받아보세요.</p>
        <div className={styles["block-commentation-goto"]}>
          <p>{`여행지 검색하러 가기`}</p>
        </div>
      </div>
      <p></p>
    </div>
  );
}
