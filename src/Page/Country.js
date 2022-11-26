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
    [loading,setLoading]=useState(true),
    [imagedata,setImagedata]=useState(null);

    const getCountryAlarm=async()=>{
        try{
            const response = await axios.get(`https://apis.data.go.kr/1262000/TravelAlarmService2/getTravelAlarmList2?serviceKey=${API_KEY}&returnType=JSON&cond[country_nm::EQ]=${params.id}&pageNo=1`);
            setCalarmlevel(response.data);
            getCountryInfo();
        } catch(e){
            console.log("Country Alarm Error");
        }
    }

    const getCountryInfo=async()=>{
        try{
            const response = await axios.get(`http://apis.data.go.kr/1262000/OverviewGnrlInfoService/getOverviewGnrlInfoList?serviceKey=${API_KEY}&cond[country_nm::EQ]=${params.id}`);
            setIcountry(response.data);
            setLoading();
        } catch(e){
            console.log("Country Info Error");
        }
    }
    
    const getItem=async()=>{
        getCountryAlarm();
    }

    const capital=(data)=>{
        let temp = data.split('’');
        return temp[0];
    }
    
    useEffect(()=>{
        getItem();
    },[]);
    console.log(Icountry.data)
    console.log(Calarmlevel.data)

    return (
        <div>
            <Header/>
            {
                loading ? (<div>Loading</div>) :(

                    <div className={styles.box}>
                        <div className={styles.container}>
                            <div className={styles.map}>
                                <div>
                                    <div className={styles.mainimage}>
                                        <img className={styles.imagemain} src={imagedata ? imagedata : Calarmlevel.data[0].flag_download_url}/>
                                    </div>
                                    <img className={styles.imagebox} onMouseEnter={()=>setImagedata(Calarmlevel.data[0].flag_download_url)} src={Calarmlevel.data[0].flag_download_url}/>
                                    <img className={styles.imagebox} onMouseEnter={()=>setImagedata(Calarmlevel.data[0].dang_map_download_url)} src={Calarmlevel.data[0].dang_map_download_url}/>
                                    <img className={styles.imagebox} onMouseEnter={()=>setImagedata(Calarmlevel.data[0].map_download_url)} src={Calarmlevel.data[0].map_download_url}/>
                                </div>
                            </div>
                            <div className={styles.info}>
                                <p>{params.id}</p>
                                <p>수도</p>
                                <div>{capital(Icountry.data[0].capital)}</div>
                                <p>기후</p>
                                <div>{Icountry.data[0].climate}</div>
                                <p>언어</p>
                                <div>{Icountry.data[0].lang}</div>
                                <p>인구 수</p>
                                <div>{Icountry.data[0].population}</div>
                                <p>종교</p>
                                <div>{Icountry.data[0].religion}</div>
                                <p>여행경보</p>
                                <div>{Calarmlevel.data[0].alarm_lvl}</div>
                                </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Country;