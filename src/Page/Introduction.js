import styles from "./Introduction.module.css";
import { Link } from "react-router-dom";

function Introduction(){
    return(
        <div className={styles.container}>
            <div className={styles.intro1} style={{backgroundColor: "blue"}}>
                <h1>여행정보</h1>
            </div>
            <div className={styles.intro1}  style={{backgroundColor: "red"}}>
                <h1>소개</h1>
            </div>
            <div className={styles.intro1}  style={{backgroundColor: "yellow"}}>
                <h1>사용법1</h1>
            </div>
            <div className={styles.intro1}  style={{backgroundColor: "orange"}}>
                <h1>사용법2</h1>
            </div>
            <div className={styles.intro1}  style={{backgroundColor: "purple"}}>
                <h1>사용법3</h1>
            </div>
            <div className={styles.intro1}  style={{backgroundColor: "green"}}>
                <h1>감사 + 사용하러가기</h1>
                <Link to={"/MainPage"}>메인페이지로-</Link>
            </div>
            <Link className={styles.skip} to={"/MainPage"}>SKIP</Link>
        </div>
    )
}

export default Introduction;
