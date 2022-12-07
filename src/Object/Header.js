import styles from "./Header.module.css";
import { useState } from "react";
import Dropdown from "../Component/Dropdown";
import searchicon from "../image/searchicon.png";
import { Link } from "react-router-dom";
import {AllCountry} from "../Component/DataInfo";

function Header(){
    const [dropdown,setDropdown] = useState(false);
    const down=()=>{
        setDropdown(true);
        console.log("true")
    }
    return(
        <div className={styles.container}>
            <nav className={styles.fullbar}>
                <Link className={styles.title_link} to={`${process.env.PUBLIC_URL}/`}>
                    <img className={styles.logo} src="https://upload.wikimedia.org/wikipedia/commons/a/ab/Android_O_Preview_Logo.png"/>
                    <p>TravelAway</p>
                </Link>
                <div className={styles.section}>
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
                            <div className={styles.name}>공백</div>
                        </li>
                    </ul>
                    <ul className={styles.tableul}>
                        <li className={styles.menuli}>
                            <div className={styles.name}>공백</div>
                        </li>
                    </ul>
                    <ul className={styles.tableul}>
                        <li className={styles.menuli}>
                            <Link to={`${process.env.PUBLIC_URL}/`}>
                                <div className={styles.name}>문의</div>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className={styles.search_box}>
                    <input className={styles.search_input} size='15'  placeholder='Search' type='text' list='searchOption'/>
                    <button type='submit' className={styles.search_button}>
                        <img className={styles.logo}src={searchicon}/>
                    </button>
                </div>
            </nav>
            <datalist id='searchOption'>
                {AllCountry.map((item)=>(
                    <option value={item}/>
                ))}
            </datalist>
        </div>     
    )
}

export default Header;