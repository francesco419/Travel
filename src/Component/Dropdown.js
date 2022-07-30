import {continents} from "../Component/NavItem";
import { useState } from "react";

function Dropdown(){
    const [dropdown,setDropdown] = useState(false);
    return(
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
    )
}
export default Dropdown;