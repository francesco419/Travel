import DataAsia from "../Component/DataInfo.js"
import {Country} from "../Component/DataInfo";
import { useState } from "react";
import styles from "./Asia.module.css";
import React from "react";
import { Link } from "react-router-dom";
import ReactDOM from 'react-dom'
import "./Asia.css";


function Asia(){
    const [engkor,setEngKor]=useState(true);
    const [CountryName,setCountryName]=useState(Country[0].listENG);

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
    const sortout2 =(bool,remove,Cengkor)=>{
        let parent = document.querySelector(".parent");
        let alphaElement = null;
        let child = null;
        let changeLang = null;

        const listENG = Country[0].listENG;
        let listKOR = bool ? Country[0].listENG : Country[0].listKOR;
        let alpha='A';

        for(let i=0;i<listENG.length;i++){
            if(i===0){
                alphaElement=document.createElement("h1");
                alphaElement.className = `${alpha}-class`;
                alphaElement.textContent = `-${alpha}-`;
                parent.append(alphaElement);
            }

            if(alpha===listENG[i].charAt(0)){
                child=document.createElement("a");
                //child.href=("www.naver.com")
                child.className = `A-class`;
                child.textContent = `${listKOR[i]}`;
                alphaElement.append(child);
                /* child = React.createElement('a',{href:"/"},`${listKOR[i]}`);
                ReactDOM.render(child,alphaElement); */
            }else{
                alpha=listENG[i].charAt(0);
                //알파켓먼저 넣고
                alphaElement=document.createElement("h1");
                alphaElement.className = `${alpha}-class`;
                alphaElement.textContent = `-${alpha}-`;
                parent.append(alphaElement);
                //부모하나 만들고
                child=document.createElement("a");
                child.className = `A-class`;
                child.textContent = `${listKOR[i]}`;
                alphaElement.append(child);
                //자식노드 넣어주고
            }
        }
    }

    const removeAll=()=>{
        let elementR = document.querySelector(".parent");
            while(elementR.hasChildNodes()){
                elementR.removeChild(elementR.firstChild);
        }
    }

    const changeLang=(bool)=>{
        console.log("get")
        removeAll();
        changeEngKor();
        sortout2(bool);
    }

    const changeEngKor=()=>{
        if(engkor===true){
            setEngKor(false);
        }else{
            setEngKor(true);
        }
    }

    return(
        <div>
            <button onClick={changeEngKor}>{engkor ? "ENG" : "한글"}</button>
            <button onClick={()=>sortout2(engkor)}>Sort</button>
            <button onClick={()=>{
                let elementR = document.querySelector(".parent");
                while(elementR.hasChildNodes()){
                    elementR.removeChild(elementR.firstChild);
                }
            }}>Remove</button>
            <div className={`parent`} >
                {/* <button id="changeLang" className={styles.changeLang} onClick={}>한/영</button> */}
            </div>
        </div>
    )
}

export default Asia;