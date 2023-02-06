import { Timer } from "../data/class";
import styles from "../Page/MainPage.module.css";
import { useEffect, useState } from "react";
import { mainImage } from "../data/NavItem";

export default function FrontImage() {
  const [num, setNum] = useState(0);
  const arr = [0, 1, 2, 3];

  /* const timeout = new Timer(() => {
    if (num === arr.length - 1) {
      setNum((num) => 0);
      return;
    }
    setNum((num) => num + 1);
  }, 4000); */

  return (
    <div className={styles["main-first"]}>
      <hr />
      <div
        className={styles["block-first-img"]}
        onMouseOver={() => {
          //timeout.pause();
        }}
        onMouseLeave={() => {
          //timeout.resume();
        }}
      >
        <img src={mainImage[num].url} />
        <ul>
          {arr.map((data) => (
            <ol
              onClick={() => {
                setNum((num) => data);
              }}
              key={`img_${data}`}
            >
              <li>
                <p style={{ fontWeight: num === data ? "1000" : "normal" }}>
                  {num === data ? `__0${data + 1} :` : `0${data + 1}`}
                </p>
              </li>
            </ol>
          ))}
        </ul>
      </div>
      <hr />
    </div>
  );
}
