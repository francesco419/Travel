import styles from "./Header.module.css";
import { useEffect, useState } from "react";
import Dropdown from "../Component/Dropdown";
import searchicon from "../image/searchicon.png";
import { Link, Navigate, useNavigate } from "react-router-dom";
import {AllCountry} from "../Component/DataInfo";

function Header({}){
    const [dropdown,setDropdown] = useState(false);
    const [searchresult,setSearchResult]=useState('');
    let navi = useNavigate();

    const searchChange = ({target: {value}})=>setSearchResult(value);

    const searchSubmit = (data,e) =>{
        if(AllCountry.indexOf(data)!==-1){
            navi(`/Country/${data}`);
        }else{
            alert(`${data}는 존재하지 않습니다!`)
            return;
        }
    }

    const down=()=>{
        setDropdown(true);
    }

    const Delete_Content=(data)=>{
        document.getElementById(data).remove();
        let local = JSON.parse(localStorage.getItem('VisitHistory'));
        let index = local.indexOf(data);
        local.splice(index,1);
        localStorage.setItem('VisitHistory',JSON.stringify(local));
    }

    function History({data}){
        return(
            <div id={data} className={styles.history_content}>
                <Link className={styles.history_link} to={`/Country/${data}`} onClick={()=>{
                    Navigate(0);
                }}>{data}</Link>
                <button className={styles.history_button} onClick={()=>Delete_Content(data)}>X</button>
            </div>
        )
    }
    return(
        <div className={styles.container}>
            <nav className={styles.fullbar}>
                <Link className={styles.title_link} to={`${process.env.PUBLIC_URL}/`}>
                    <img className={styles.logo} src="https://upload.wikimedia.org/wikipedia/commons/a/ab/Android_O_Preview_Logo.png"/>
                    <p>TravelAway</p>
                </Link>
                <button className={styles.reposive_button} onClick={()=>{
                    let onoff = document.getElementById('res').style.display;
                    if(onoff==='none'){
                        document.getElementById('res').style.display='block';
                    }else{
                        document.getElementById('res').style.display='none';
                    }
                }}>
                    ▒
                </button>
                <div id="res" className={styles.section}>
                    <ul className={styles.tableul} 
                        onMouseEnter={()=>setDropdown(true)} 
                        onMouseLeave={()=>setDropdown(false)}
                        onClick={down}>
                        <li className={styles.menuli}>
                            <div className={styles.name}>대륙</div>
                        </li>
                        {dropdown && <Dropdown/>}
                    </ul>
                    <ul className={styles.tableul}>
                        <li className={styles.menuli}>
                            <div className={styles.name}>작업중</div>
                        </li>
                    </ul>
                    <ul className={styles.tableul}>
                        <li className={styles.menuli}>
                            <div className={styles.name}>작업중</div>
                        </li>
                    </ul>
                    <ul className={styles.tableul}>
                        <li className={styles.menuli}>
                            <Link to={`/Customer`}>
                                <div className={styles.name}>문의</div>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className={styles.search_box}>
                    <input className={styles.search_input} 
                        size='15' 
                        placeholder='Search' 
                        type='text' 
                        list='searchOption'
                        value={searchresult}
                        onChange={searchChange}
                    />
                    <button type='submit' className={styles.search_button} onClick={()=>searchSubmit(searchresult)}>
                        <img className={styles.logo}src={searchicon}/>
                    </button>
                </div>
            </nav>
            <div className={styles.history}>
                <div className={styles.history_name}>방문 국가 : </div>
                {
                    JSON.parse(localStorage.getItem('VisitHistory')) ?
                    JSON.parse(localStorage.getItem('VisitHistory')).map((item)=>(
                        <History
                        data={item}
                        />
                    )) : null

                }
            </div>
            <datalist id='searchOption'>
                {AllCountry.map((item)=>(
                    <option value={item}/>
                ))}
            </datalist>
        </div>     
    )
}

export default Header;