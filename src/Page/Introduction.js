import styles from "./Introduction.module.css";
import { Link } from "react-router-dom";

function Introduction(props){
    const sessionStorageSave=()=>{
        window.sessionStorage.setItem("IntroPage",JSON.stringify(false));
    }
    return(
        <div className={styles.container}>
            <div className={styles.intro1} style={{backgroundColor: "#802045"}}>
                <div className={styles.intro_first}>
                    <img className={styles.intro_first_img} src='https://upload.wikimedia.org/wikipedia/commons/a/ab/Android_O_Preview_Logo.png'/>
                    <div className={styles.intro_first_text}>TravelAway</div>
                </div>
                <div className={styles.text}>
                    <div>SCROLL</div>
                    <div>∨</div>
                    <div>∨</div>
                </div>
            </div>
            <div className={styles.intro1}  style={{backgroundColor: "#f8f0f2"}}>
                <p>소개</p>
            </div>
            <div className={styles.intro1}  style={{backgroundColor: "#802045"}}>
                <p>사용법1</p>
            </div>
            <div className={styles.intro1}  style={{backgroundColor: "#f8f0f2"}}>
                <p>감사 + 사용하러가기</p>
                <Link to={`${process.env.PUBLIC_URL}/`} onClick={()=>{
                sessionStorageSave();
                props.setIntropage(false);
                }}>메인페이지로
                </Link>
            </div>
            <button className={styles.skip} onClick={()=>{
                sessionStorageSave();
                props.setIntropage(false);
                }}>SKIP
                </button>
        </div>
    )
}

export default Introduction;
