import styles from "../Page/MainPage.module.css";
import { useNavigate } from "react-router-dom";
import { Countries } from "../data/DataInfo";

export default function FrontRandom() {
  const nav = useNavigate();
  console.log(Countries);
  return (
    <div className={styles["random"]}>
      <hr />
      <div className={styles["block-random"]}>
        <p className={styles["random-title"]}>
          Random Countries Sorted by Continents
        </p>
        <ul className={styles["ul-random"]}>
          {Countries.map((temp, index) => {
            let arr = [];
            for (let i = 0; i < 5; i++) {
              arr.push(
                Math.floor(Math.random() * (temp.list_Currency.length - 1))
              );
            }
            return (
              <ol key={`random_${index}`}>
                <li>
                  <p>{temp.name}</p>
                </li>
                {temp.list_Currency.map((data, index) => {
                  if (arr.includes(index)) {
                    return (
                      <li
                        key={`random_${data.ENG}`}
                        onClick={() => {
                          nav(`/Country/${temp.name}/${data.KOR}`);
                        }}
                      >
                        <p>{data.ENG}</p>
                      </li>
                    );
                  }
                })}
              </ol>
            );
          })}
        </ul>
      </div>
      <hr />
    </div>
  );
}
