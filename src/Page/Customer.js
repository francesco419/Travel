import Header from "../Object/Header";
import styles from "./Customer.module.css";

function Customer(){
    return(
        <div>
            <Header/>
            <div className={styles.container}>
                <div className={styles.box}>
                    <input className={styles.input_name} style={{width:'150px',height:'30px'}} type='text' placeholder='이름 / Name'></input>
                    <input className={styles.input_name} style={{width:'300px',height:'30px'}} type='text' placeholder='제목 / Title'></input>
                    <input className={styles.input_name} style={{width:'500px',height:'300px',textAlign:'start'}} type='text' placeholder='내용 / Contents'></input>
                </div>
            </div>
        </div>
    )
}

export default Customer;