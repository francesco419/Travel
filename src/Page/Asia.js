import { Country } from "../Component/DataInfo";
import { useEffect, useState } from "react";
import styles from "./Asia.module.css";
import React from "react";
import { Link } from "react-router-dom";
import "./Asia.css";
import { useLocation } from "react-router-dom";
import Header from "../Object/Header";

function Asia() {
  const location = useLocation();
  const [engkor, setEngKor] = useState(true);
  console.log(location.state);
  const [xcountry, setXcountry] = useState(location.state ? location.state : 0);

  /* const sortout =(bool)=>{
        console.log(Country[0].listENG);
        const listENG = Country[0].listENG;
        let listKOR = bool ? Country[0].listENG : Country[0].listKOR;
        let alpha='A';
        for(let i=0;i<listENG.length;i++){
            if(i===0){
                console.log(`-${alpha}-`)
            }

            if(alpha===listENG[i].charAt(0)){
                console.log(`${listKOR[i]}\n`);
            }else{
                alpha=listENG[i].charAt(0);
                console.log(`\n-${listENG[i].charAt(0)}-\n`)
                console.log(`${listKOR[i]}\n`);
            }
        }
    } */
  /*     const sortout2 =(bool,num)=>{
        let parent = document.querySelector(".parent");
        let alphaElement = null;
        let child = null;

        const listENG = Country[num].listENG;
        let listKOR = bool ? Country[num].listENG : Country[num].listKOR;
        let alpha='A';

        for(let i=0;i<listENG.length;i++){
            if(i===0){
                alphaElement=document.createElement("h1");
                alphaElement.className = `${styles.alpha}`;
                alphaElement.textContent = `-${alpha}-`;
                parent.append(alphaElement);
            }

            if(alpha===listENG[i].charAt(0)){
                child=document.createElement("a");
                child.href=(`/Country/${(Country[num].listKOR[i])}`);
                child.className = `${Country[num].listENG[i]}`;
                child.textContent = `${listKOR[i]}`;
                alphaElement.append(child);
            }else{
                alpha=listENG[i].charAt(0);
                //알파켓먼저 넣고
                alphaElement=document.createElement("h1");
                alphaElement.className = `${styles.alpha}`;
                alphaElement.textContent = `-${alpha}-`;
                parent.append(alphaElement);
                //부모하나 만들고
                child=document.createElement("a");
                child.href=(`/Country/${(Country[num].listKOR[i])}`);
                child.className = `${Country[num].listENG[i]}`;
                child.textContent = `${listKOR[i]}`;
                alphaElement.append(child);
                //자식노드 넣어주고
            }
        }
    } */

  /*     useEffect(()=>{
        removeAll();
        sortout2(engkor,xcountry);
        console.log(engkor);
    },[]) */

  const removeAll = () => {
    console.log("removeAll");
    let elementR = document.querySelector(".parent");
    while (elementR.hasChildNodes()) {
      elementR.removeChild(elementR.firstChild);
    }
  };

  const changeCountry = (num) => {
    if (xcountry === num) {
      return;
    } else {
      setXcountry(num);
    }
  };

  function ContinentName() {
    let temp;
    if (xcountry === 0) {
      temp = engkor ? "Asia" : "아시아";
    } else if (xcountry === 1) {
      temp = engkor ? "Europe" : "유럽";
    } else if (xcountry === 2) {
      temp = engkor ? "Oceania" : "오세아니아";
    } else if (xcountry === 3) {
      temp = engkor ? "America" : "아메리카";
    } else if (xcountry === 4) {
      temp = engkor ? "Africa" : "아프리카";
    }
    return <p>{temp}</p>;
  }

  function CountryComponent({ set }) {
    function ObjectAdd(arr1, arr2) {
      let arr3 = [];
      for (let i = 0; i < arr1.length; i++) {
        arr3.push({
          id: i,
          ENG: arr1[i],
          KOR: arr2[i],
        });
      }
      return arr3;
    }
    const test = ObjectAdd(
      Country[xcountry].listENG,
      Country[xcountry].listKOR
    );
    console.log(test);
    const arr = Array.from({ length: 26 }, (v, i) =>
      String.fromCharCode(i + 65)
    );
    function alphait(alpha, arr) {
      let FilterArr = arr.filter((data) => data.ENG.charAt(0) === alpha);
      return (
        <div>
          {FilterArr.length !== 0 ? (
            <div style={{ margin: "10px 0", width: "120px" }}>
              <div className={styles.Country_alpha}>--{alpha}--</div>
              <div className={styles.Country_Container}>
                {FilterArr.map((item) => (
                  <Link
                    to={`/Country/${item.KOR}`}
                    className={styles.Country_Link}
                  >
                    {set ? item.ENG : item.KOR}
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      );
    }

    return (
      <div className={styles.cover}>
        {arr.map((alpha) => alphait(alpha, test))}
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className={styles.container}>
        <div className={styles.box}>
          <div className={styles.name}>
            <ContinentName />
          </div>
          <CountryComponent set={engkor} />
        </div>
        <div className={styles.change_C}>
          <button className={styles.button_C}>
            <Link
              className={styles.button_link}
              style={{ textDecoration: "none" }}
              to={`${process.env.PUBLIC_URL}/`}
            >
              {engkor ? "Mainpage" : "메인페이지"}
            </Link>
          </button>
          <button
            className={styles.button_C}
            onClick={() => {
              setEngKor(engkor ? false : true);
            }}
          >
            {engkor ? "한글" : "ENG"}
          </button>
          <button className={styles.button_C} onClick={() => changeCountry(0)}>
            {engkor ? "Asia" : "아시아"}
          </button>
          <button className={styles.button_C} onClick={() => changeCountry(1)}>
            {engkor ? "Europe" : "유럽"}
          </button>
          <button className={styles.button_C} onClick={() => changeCountry(2)}>
            {engkor ? "Oceania" : "오세아니아"}
          </button>
          <button className={styles.button_C} onClick={() => changeCountry(3)}>
            {engkor ? "America" : "아메리카"}
          </button>
          <button className={styles.button_C} onClick={() => changeCountry(4)}>
            {engkor ? "Africa" : "아프리카"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Asia;
