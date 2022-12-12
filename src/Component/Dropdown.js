import {continents} from "../Component/NavItem";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import styles from "./Dropdown.module.css";

function Dropdown(){
    const [dropdown,setDropdown] = useState(false);
    return(
        <ul className={styles.dropdown} onClick={()=> setDropdown(!dropdown)}>
                {continents.map((item)=>{
                    return(
                        <li className={styles.dropdown_list} key={item.id}>
                            <Link
                            to={item.path}
                            onClick={()=> {setDropdown(false); Navigate(0);}}
                            state={item.state}
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