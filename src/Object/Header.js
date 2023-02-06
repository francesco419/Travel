import styles from "./Header.module.css";
import { useState } from "react";
import Dropdown from "../Component/Dropdown";
import searchicon from "../image/searchicon.png";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { AllCountry } from "../data/DataInfo";
import { ReactComponent as Search } from "../image/search.svg";

function Header({}) {
  return (
    <div className={styles.container}>
      <nav className={styles.fullbar}>
        <div className={styles["header-box"]}>
          <HeaderLogo />
          {/* <button
            className={styles.reposive_button}
            onClick={() => {
              let onoff = document.getElementById("res").style.display;
              if (onoff === "none") {
                document.getElementById("res").style.display = "block";
              } else {
                document.getElementById("res").style.display = "none";
              }
            }}
          ></button> */}
          <div className={styles["header-inner"]}>
            <HeaderMenu />
            <HeaderSearch />
          </div>
        </div>
      </nav>
      <datalist id="searchOption">
        {AllCountry.map((item, index) => (
          <option value={item} key={`data_${index}`} />
        ))}
      </datalist>
    </div>
  );
}

export default Header;

function HeaderLogo() {
  let navi = useNavigate();
  return (
    <div
      className={styles["header-logo"]}
      onClick={() => {
        navi(`${process.env.PUBLIC_URL}`);
      }}
    >
      <img
        className={styles.logo}
        src="https://upload.wikimedia.org/wikipedia/commons/a/ab/Android_O_Preview_Logo.png"
      />
      <h3>TravelAway</h3>
    </div>
  );
}

function HeaderMenu() {
  let navi = useNavigate();

  /* const down = () => {
    setDropdown(true);
  }; */

  return (
    <ul id="res" className={styles.section}>
      <ol
        onClick={() => navi(`/Asia`)}
        /* onMouseEnter={() => setDropdown(true)}
        onMouseLeave={() => setDropdown(false)}
        onClick={down} */
      >
        <li className={styles.menuli}>
          <p>대륙</p>
        </li>
        {/* {dropdown && <Dropdown />} */}
      </ol>
      <ol>
        <li className={styles.menuli}>
          <p>작업중</p>
        </li>
      </ol>
      <ol>
        <li className={styles.menuli}>
          <p>작업중</p>
        </li>
      </ol>
      <ol>
        <li className={styles.menuli}>
          <p>문의</p>
        </li>
      </ol>
    </ul>
  );
}

function HeaderSearch() {
  const [searchresult, setSearchResult] = useState("");
  const searchChange = ({ target: { value } }) => setSearchResult(value);

  let navi = useNavigate();

  const searchSubmit = (data, e) => {
    if (AllCountry.indexOf(data) !== -1) {
      navi(`/Country/${data}`);
    } else {
      alert(`${data}는 존재하지 않습니다!`);
      return;
    }
  };

  return (
    <div className={styles.search_box}>
      <input
        className={styles.search_input}
        size="10"
        placeholder="Search..."
        type="text"
        list="searchOption"
        value={searchresult}
        onChange={searchChange}
      />
      <button
        type="submit"
        className={styles.search_button}
        onClick={() => searchSubmit(searchresult)}
      >
        <Search />
      </button>
    </div>
  );
}
