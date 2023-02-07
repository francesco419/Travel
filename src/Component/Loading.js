import { useState } from "react";
import styles from "./Loading.module.css";
import { useNavigate } from "react-router-dom";

export default function Loading() {
  const [toMain, setToMain] = useState(false);
  const nav = useNavigate();
  setTimeout(() => {
    setToMain(true);
  }, 3000);
  return (
    <div>
      <div className={styles["loading-circle"]}>
        <div>
          <span></span>
          <span></span>
          <span></span>
        </div>
        {toMain && (
          <div onClick={() => nav(`/Travel`)}>
            <p>{`메인 페이지로`}</p>
          </div>
        )}
      </div>
    </div>
  );
}
