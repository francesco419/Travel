import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Header from "../Object/Header";
import styles from "./Country.module.css";

const API_KEY=process.env.REACT_APP_API_KEY;

function Country(){
    const params = useParams();
    const [Icountry,setIcountry]=useState([]),
    [Calarmlevel,setCalarmlevel]=useState([]),
    [loading,setLoading]=useState(true);

    const getCountryAlarm=async()=>{
        try{
            setCalarmlevel(null);
            const response = await axios.get(`https://apis.data.go.kr/1262000/TravelAlarmService2/getTravelAlarmList2?serviceKey=${API_KEY}&returnType=JSON&cond[country_nm::EQ]=${params.id}&pageNo=1`);
            setCalarmlevel(response.data);
        } catch(e){
            console.log("Country Alarm Error");
        }
        getCountryInfo();
    }

    const getCountryInfo=async()=>{
        try{
            setIcountry(null);
            const response = await axios.get(`http://apis.data.go.kr/1262000/OverviewGnrlInfoService/getOverviewGnrlInfoList?serviceKey=${API_KEY}&cond[country_nm::EQ]=${params.id}`);
            setIcountry(response.data);
            setLoading(false);
        } catch(e){
            console.log("Country Info Error");
        }
    }
    
    const getItem=async()=>{
        getCountryAlarm();
    }
    
    useEffect(()=>{
        getItem();
        console.log(Calarmlevel)
    },[]);
    console.log(Calarmlevel)
    console.log(Icountry)

    return (
        <div>
            <Header/>
            {
                loading ? (<div>Loading</div>) :(

                    <div>
                        <div></div>
                        <div className={styles.container}>
                            <div className={styles.map}>a</div>
                            <div className={styles.info}>a</div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Country;