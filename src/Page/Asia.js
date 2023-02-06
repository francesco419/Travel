import { useState } from "react";
import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../Object/Header";
import Indicator from "../Object/Indicator";
import ListCountry from "../Component/ListCountry";

function Asia() {
  return (
    <div>
      <div style={{ opacity: "0.6" }}>
        <Header />
      </div>
      <Indicator />
      <ListCountry />
    </div>
  );
}

export default Asia;

/* const location = useLocation();
const [engkor, setEngKor] = useState(true);
const [xcountry, setXcountry] = useState(location.state ? location.state : 0);

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
} */

/*function CountryComponent({ set }) {
  
  function ObjectAdd(arr1, arr2) {
    let arr3 = [];
    for (let i = 0; i < arr1.length; i++) {
      for (let j = 0; j < arr2.length; j++) {
        let temp;
        if (arr2[j].id.includes(arr1[i].ENG)) {
          temp = arr2[j].id.slice(0, 3);
          arr3.push({
            id: i,
            ENG: arr1[i].ENG,
            KOR: arr1[i].KOR,
            currency: temp,
          });
          break;
        } else if (j === arr2.length - 1) {
          arr3.push({
            id: i,
            ENG: arr1[i].ENG,
            KOR: arr1[i].KOR,
            currency: null,
          });
        }
      }
    }
    return arr3;
  }
  const poop = ObjectAdd(test, currncyId);
  console.log(poop);
   //국가 및 통화 합치기

  const test = Countries[xcountry].list_Currency;
  const arr = Array.from({ length: 26 }, (v, i) =>
    String.fromCharCode(i + 65)
  ); //알파벳 배열

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
                  state={{ Object: item }}
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
*/
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

/* const removeAll = () => {
    console.log("removeAll");
    let elementR = document.querySelector(".parent");
    while (elementR.hasChildNodes()) {
      elementR.removeChild(elementR.firstChild);
    }
  }; */
