import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import {continents} from "../Component/NavItem";
import { useState } from "react";
import Dropdown from "../Component/Dropdown";

function Header(){
    const [dropdown,setDropdown] = useState(false);
    const down=()=>{
        setDropdown(true);
        console.log("true")
    }
    return(
        <div className={styles.container}>
            <nav className={styles.fullbar}>
                <div>
                    <h1>TravelAway</h1>
                </div>
                    <ul>
                        <li className={styles.menuli}
                        onMouseEnter={()=>setDropdown(true)} onMouseLeave={()=>setDropdown(false)}
                        onClick={down}
                        ><div className={styles.name}>검색</div>
                        {dropdown && <Dropdown/>}
                        </li>
                    </ul>
                <div></div>
            </nav>
        </div>     
    )
}

export default Header;