import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import {continents} from "../Component/NavItem";
import { useState } from "react";

function Map(){
    const [dropdown,setDropdown] = useState(false);
    return(
        <div className={styles.container}>
            <nav className={styles.fullbar}>
                <div>
                    <h1>TravelAway</h1>
                </div>
                <ul className={styles.menu}>
                    
                </ul>
                <div></div>
            </nav>
            <ul onClick={()=> setDropdown(!dropdown)}>
                {continents.map((item)=>{
                    return(
                        <li key={item.id}>
                            <Link
                            to={item.path}
                            onClick={()=> setDropdown(false)}
                            >
                                {item.title}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>     
    )
}

export default Map;