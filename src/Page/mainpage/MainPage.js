import Header from "../../Component/Header";
import styles from "./MainPage.module.css";
import { ReactComponent as Africa } from "../../image/28615.svg";
import { ReactComponent as Europe } from "../../image/151641.svg";
import { ReactComponent as Austr } from "../../image/151644.svg";
import { ReactComponent as America } from "../../image/311014.svg";
import { ReactComponent as Asia } from "../../image/151642.svg";
import { useState } from "react";
import FrontImage from "./FrontImage";
import Indicator from "../../Component/Indicator";
import Recommend from "./Recommend";
import FrontInfo from "./FrontInfo";
import FrontRandom from "./FrontRandom";
import { Link } from "react-router-dom";

function MainPage() {
  let SESSION = window.sessionStorage.getItem("IntroPage");
  const [ContinentNum, setContinentNum] = useState(1),
    [intropage, setIntropage] = useState(SESSION ? false : true);
  const switchNum = (state) => {
    if (state) {
      if (ContinentNum === 5) {
        setContinentNum(1);
      } else {
        setContinentNum(ContinentNum + 1);
      }
    } else {
      if (ContinentNum === 1) {
        setContinentNum(5);
      } else {
        setContinentNum(ContinentNum - 1);
      }
    }
    console.log(ContinentNum);
  };

  function Button_switch({ data }) {
    return (
      <button
        className={styles.continentButton}
        style={ContinentNum === 6 ? { display: "none" } : null}
        onClick={() => switchNum(false)}
      >
        {data}
      </button>
    );
  }

  return (
    <div>
      <Header />
      <Indicator />
      {/* {intropage ? (
        <Introduction setIntropage={setIntropage} />
      ) : ( */}
      <div className={styles.container}>
        <FrontImage />
        <Recommend />
        <FrontInfo />
        <FrontRandom />
        {/* <div className={styles.visualbox}>
            <button
              onClick={() => {
                if (ContinentNum === 6) {
                  setContinentNum(1);
                } else {
                  setContinentNum(6);
                }
              }}
              className={styles.swapView}
            >
              전체보기
            </button>
            <Button_switch data="<<" />
            <ContinentSVG className={styles.svg_size} num={ContinentNum} />
            <Button_switch data=">>" />
          </div> */}
      </div>
      <footer>
        <h1>FOOTER</h1>
      </footer>
      {/* )} */}
    </div>
  );
}

function ContinentSVG({ num }) {
  switch (num) {
    case 1:
      return (
        <div className={styles.continent}>
          <Link
            style={{ margin: " 15px 0" }}
            className={styles.link_svg}
            to={"/Asia"}
            state={0}
          >
            <Africa />
            Africa
          </Link>
        </div>
      );
    case 2:
      return (
        <div className={styles.continent}>
          <Link
            style={{ margin: " 15px 0" }}
            className={styles.link_svg}
            to={"/Asia"}
            state={1}
          >
            <Europe />
            Europe
          </Link>
        </div>
      );
    case 3:
      return (
        <div className={styles.continent}>
          <Link
            style={{ margin: " 15px 0" }}
            className={styles.link_svg}
            to={"/Asia"}
            state={2}
          >
            <Austr />
            Oceania
          </Link>
        </div>
      );
    case 4:
      return (
        <div className={styles.continent}>
          <Link
            style={{ margin: " 15px 0" }}
            className={styles.link_svg}
            to={"/Asia"}
            state={3}
          >
            <America />
            America
          </Link>
        </div>
      );
    case 5:
      return (
        <div className={styles.continent}>
          <Link
            style={{ margin: " 15px 0" }}
            className={styles.link_svg}
            to={"/Asia"}
            state={4}
          >
            <Asia />
            Asia
          </Link>
        </div>
      );
    case 6:
      return (
        <div className={styles.viewAllbox}>
          <Link className={styles.link} to={"/Asia"} state={0}>
            Asia
          </Link>
          <Link className={styles.link} to={"/Asia"} state={1}>
            Europe
          </Link>
          <Link className={styles.link} to={"/Asia"} state={2}>
            Oceania
          </Link>
          <Link className={styles.link} to={"/Asia"} state={3}>
            America
          </Link>
          <Link className={styles.link} to={"/Asia"} state={4}>
            Africa
          </Link>
        </div>
      );
  }
}

export default MainPage;
