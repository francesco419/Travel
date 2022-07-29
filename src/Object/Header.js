import { Link } from "react-router-dom";
import styles from "./Header.module.css";

function Map(){
    return(
        <div className={styles.container}>
            <ul className={styles.fullbar}>
                <li className={styles.menu}>
                    <p className={styles.st}>대륙</p>
                    <ul className={styles.te}>
                        <li>아시아
                            <ul>
                                <li>중앙</li>
                                <li>동남</li>
                                <li>동</li>
                            </ul>
                        </li>
                        <li>유럽</li>
                        <li>아메리카
                            <ul>
                                <li>북</li>
                                <li>중앙</li>
                                <li>남</li>
                            </ul>
                        </li>
                        <li>아프리카</li>
                        <li>오세아니아</li>
                    </ul>
                </li>
                <li className={styles.menu}>설정
                    <ul>
                        <li>언어</li>
                    </ul>
                </li>
            </ul>
        </div>
    )
}

export default Map;