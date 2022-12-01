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

    const capital=(cap,lang)=>{
        let temp;
        if(lang===null){
            temp = cap.split('’');
        }else{
            temp = lang.split(',');
        }
        return temp[0];
    }

    const populationcut=(population)=>{
        if(population>9999999){
            return `${Math.floor(population/100000000)}억명`;
        }else if(population>9999){
            return `${Math.floor(population/10000)}만명`;
        }else if(population<10000){
            return `${population}명`;
        }
    }
    
    const level=(clevel)=>{
        switch(clevel){
            case 1 : return `1단계(여행유의) \n${Calarmlevel.data[0].region_ty} : ${Calarmlevel.data[0].remark}`
            case 2 : return `2단계(여행자제) \n${Calarmlevel.data[0].region_ty} : ${Calarmlevel.data[0].remark}`
            case 3 : return `3단계(출국권고) \n${Calarmlevel.data[0].region_ty} : ${Calarmlevel.data[0].remark}`
            case 4 : return `4단계(흑색경보) \n${Calarmlevel.data[0].region_ty} : ${Calarmlevel.data[0].remark}`
            default : return '여행경보없음';
        }
    }

    useEffect(()=>{
        getItem();
    },[]);
    console.log(Icountry.data)
    console.log(Calarmlevel.data)

    function Infobox({text,data}){
        let icon = false;
        if(text==="여행경보"){
            icon=true;
        }
        return(
            <div className={styles.infobox}>
                <div className={styles.infoname}>{text}{icon ? <span className={styles.test}>◎
                <div className={styles.test2}>AAAAAAAAAA</div></span> : null}</div>
                <div className={styles.infodata}>{data ? data : '-'}</div>
            </div>
        )
    }

    const getimage=({data})=>{
        console.log("getimage")
        return(
            <div className={styles.clickimage}>
                <img src={data}/>
            </div>
        )
    }

    return (
        <div>
            <Header/>
            {
                loading ? (<div>Loading</div>) :(

                    <div className={styles.box}>
                        <div className={styles.container}>
                            <div className={styles.map}>
                                <div className={styles.mainimage}>
                                    <img onClick={()=>getimage(imagedata)} className={styles.mainimagebox} src={imagedata ? imagedata : Calarmlevel.data[0].flag_download_url}/>
                                </div>
                                <img className={styles.imagebox} onMouseEnter={()=>setImagedata(Calarmlevel.data[0].flag_download_url)} src={Calarmlevel.data[0].flag_download_url} prop='flag'/>
                                <img className={styles.imagebox} onMouseEnter={()=>setImagedata(Calarmlevel.data[0].dang_map_download_url)} src={Calarmlevel.data[0].dang_map_download_url} prop='경보지역지도'/>
                                <img className={styles.imagebox} onMouseEnter={()=>setImagedata(Calarmlevel.data[0].map_download_url)} src={Calarmlevel.data[0].map_download_url} prop='주변지도'/>
                            </div>
                            <div className={styles.info}>
                                <Infobox text='나라명' data={params.id}/>
                                <Infobox text='수도' data={capital(Icountry.data[0].capital,null)}/>
                                <Infobox text='기후' data={Icountry.data[0].climate}/>
                                <Infobox text='인구수' data={populationcut(Icountry.data[0].population)}/>
                                <Infobox text='언어' data={capital(null,Icountry.data[0].lang)}/>
                                <Infobox text='종교' data={Icountry.data[0].religion}/>
                                <Infobox text='여행경보' data={level(Calarmlevel.data[0].alarm_lvl)}/>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Country;