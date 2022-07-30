import {continents} from "../Component/NavItem";
import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Dropdown.module.css";

function Dropdown(){
    const [dropdown,setDropdown] = useState(false);
    return(
        <ul className={styles.dropdown} onClick={()=> setDropdown(!dropdown)}>
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
    )
}
export default Dropdown;