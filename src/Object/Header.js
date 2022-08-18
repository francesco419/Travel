import styles from "./Header.module.css";
import { useState } from "react";
import Dropdown from "../Component/Dropdown";
import searchicon from "../image/searchicon.png";

function Header(){
    const [dropdown,setDropdown] = useState(false);
    const down=()=>{
        setDropdown(true);
        console.log("true")
    }
    return(
        <div className={styles.container}>
            <nav className={styles.fullbar}>
                <div className={styles.title}>
                    <img className={styles.logo} src="https://upload.wikimedia.org/wikipedia/commons/a/ab/Android_O_Preview_Logo.png"/>
                    <h1>TravelAway</h1>
                </div>
                <div className={styles.section}>
                    <ul className={styles.tableul} 
                    onMouseEnter={()=>setDropdown(true)} 
                    onMouseLeave={()=>setDropdown(false)}
                    onClick={down}>
                        <li className={styles.menuli}
                        ><div className={styles.name}>대륙</div>
                        </li>
                        {dropdown && <Dropdown/>}
                    </ul>
                    <ul className={styles.tableul} 
                    onMouseEnter={()=>setDropdown(true)} 
                    onMouseLeave={()=>setDropdown(false)}
                    onClick={down}>
                        <li className={styles.menuli}
                        ><div className={styles.name}>검색</div>
                        </li>
                        {dropdown && <Dropdown/>}
                    </ul>
                    <ul className={styles.tableul} 
                    onMouseEnter={()=>setDropdown(true)} 
                    onMouseLeave={()=>setDropdown(false)}
                    onClick={down}>
                        <li className={styles.menuli}
                        ><div className={styles.name}>검색</div>
                        </li>
                        {dropdown && <Dropdown/>}
                    </ul>
                    <ul className={styles.tableul} 
                    onMouseEnter={()=>setDropdown(true)} 
                    onMouseLeave={()=>setDropdown(false)}
                    onClick={down}>
                        <li className={styles.menuli}
                        ><div className={styles.name}>검색</div>
                        </li>
                        {dropdown && <Dropdown/>}
                    </ul>
                </div>
                <div className={styles.search}>
                    <div className={styles.searchbox}>Search
                    </div>
                    <img  className={styles.logo}src={searchicon}/>
                </div>
            </nav>
        </div>     
    )
}

export default Header;