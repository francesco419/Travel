import DataAsia from "../Component/DataInfo.js"
import {Country} from "../Component/DataInfo";
import { useEffect, useState } from "react";
import styles from "./Asia.module.css";
import React from "react";
import { Link } from "react-router-dom";
import ReactDOM from 'react-dom'
import "./Asia.css";


function Asia(){
    const [engkor,setEngKor]=useState(true);
    const [xcountry,setXcountry]=useState(0);


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
    const sortout2 =(bool,num)=>{
        console.log("sortout2");
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
                alphaElement.className = `${styles.alpha}`;
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

/*     useEffect(()=>{
        removeAll();
        sortout2(engkor,xcountry);
        console.log(engkor);
    },[]) */

    useEffect(()=>{
        removeAll();
        sortout2(engkor,xcountry);
        console.log(Country);
    },[engkor,xcountry])



    const removeAll=()=>{
        console.log("removeAll");
        let elementR = document.querySelector(".parent");
            while(elementR.hasChildNodes()){
                elementR.removeChild(elementR.firstChild);
        }
    }

    const changeCountry=(num)=>{
        if(xcountry===num){
            return;
        }else{
            setXcountry(num);
        }
    }

    return(
        <div>
            <div className={styles.changeC}>
                <button onClick={removeAll}>Remove</button>
                <button onClick={()=>{
                    setEngKor(engkor ? false : true);
                    }}>{engkor ? "ENG" : "한글"}</button>
                <button onClick={()=>changeCountry(0)}>{engkor ? "Asia" : "아시아"}</button>
                <button onClick={()=>changeCountry(1)}>{engkor ? "Europe" : "유럽"}</button>
                <button onClick={()=>changeCountry(2)}>{engkor ? "Oceania" : "오세아니아"}</button>
                <button onClick={()=>changeCountry(3)}>{engkor ? "America" : "아메리카"}</button>
                <button onClick={()=>changeCountry(4)}>{engkor ? "Africa" : "아프리카"}</button>
            </div>
            <div className={'parent'} >
            </div>
        </div>
    )
}

export default Asia;