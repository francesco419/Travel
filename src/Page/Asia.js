import DataAsia from "../Component/DataInfo.js"
import {Country} from "../Component/DataInfo";
import { useState } from "react";
import styles from "./Asia.module.css";
import React from "react";
import { Link } from "react-router-dom";
import ReactDOM from 'react-dom'


function Asia(){
    const [engkor,setEngKor]=useState(true);
    const sortout =(bool)=>{
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
    }
    const sortout2 =(bool)=>{
        let parent = document.querySelector(".parent");
        let alphaElement = null;
        let child = null;

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
                child=document.createElement("div");
                child.className = `${listENG[i]}-class`;
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
                child=document.createElement("div");
                child.className = `${listENG[i]}-class`;
                child.textContent = `${listKOR[i]}`;
                alphaElement.append(child);
                //자식노드 넣어주고
            }
        }
    }
    const sortout3 =(bool)=>{
        let parent = document.querySelector(".parent");
        let child = null;

        child = document.createElement("div");
        child.className = "child1";
        child.textContent = "child1";
        parent.append(child);
    }

    return(
        <div>
            <button onClick={()=>{
                if(engkor===true){
                    setEngKor(false);
                }else{
                    setEngKor(true);
                }
            }}>{engkor ? "ENG" : "한글"}</button>
            <button onClick={()=>sortout2(engkor)}>Sort</button>
            <button onClick={sortout3}>Sort3</button>
            <button onClick={()=>{
                let elementR = document.querySelector(".parent");
                while(elementR.hasChildNodes()){
                    elementR.removeChild(elementR.firstChild);
                }
            }}>Remove</button>
            <div className="parent">

            </div>
        </div>
    )
}

export default Asia;