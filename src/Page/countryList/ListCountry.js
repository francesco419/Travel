import { Countries } from "../../data/DataInfo";
import styles from "./Asia.module.css";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function ListCountry() {
  const nav = useNavigate();
  const colorArr = ["#56b1bf", "#08708a", "#d73a31", "#032b2f"];
  return (
    <div className={styles["list-container"]}>
      {Countries.map((temp, index) => {
        if ((index + 1) % 2 === 0) {
          return (
            <div className={styles["block-list"]}>
              <div style={{ justifyContent: "end" }}>
                {temp.list_Currency.map((data) => {
                  let num = Math.random() + 0.4;
                  let color = Math.floor(Math.random() * 4) - 1;
                  return (
                    <p
                      style={{
                        fontSize: `${num}vw`,
                        color: `${colorArr[color]}`,
                      }}
                      onClick={() => {
                        nav(`/Country/${temp.name}/${data.KOR}`);
                      }}
                    >
                      {data.ENG}
                    </p>
                  );
                })}
              </div>
              <span className={styles["span-left"]}></span>
              <h2>{temp.name}</h2>
            </div>
          );
        } else {
          return (
            <div className={styles["block-list"]}>
              <h2 style={{ textAlign: "end" }}>{temp.name}</h2>
              <span className={styles["span-right"]}></span>
              <div>
                {temp.list_Currency.map((data) => {
                  let num = Math.random() + 0.4;
                  let color = Math.floor(Math.random() * 4);
                  return (
                    <p
                      style={{
                        fontSize: `${num}vw`,
                        color: `${colorArr[color]}`,
                      }}
                      onClick={() => {
                        nav(`/Country/${temp.name}/${data.KOR}`);
                      }}
                    >
                      {data.ENG}
                    </p>
                  );
                })}
              </div>
            </div>
          );
        }
      })}
    </div>
  );
}
