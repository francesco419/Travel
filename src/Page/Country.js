import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Header from "../Object/Header";
import styles from "./Country.module.css";
import { exchange } from "../Component/exchange";

const API_KEY=process.env.REACT_APP_API_KEY;

function Country(){
    const params = useParams();
    const [Icountry,setIcountry]=useState([]),
    [Calarmlevel,setCalarmlevel]=useState([]),
    [loading,setLoading]=useState(true),
    [imagedata,setImagedata]=useState(null),
    [swapExchange,setSwapExchange]=useState(false),
    [v1,setV1]=useState(1),
    [v2,setV2]=useState();

    const v1Change=({target:{value}})=>{
        setV1(value);
        setV2(parseInt(value*KRWtoUSD(exchange[0].rates.USD)).toLocaleString('ko-KR'));
    }
    
    const v2Change=({target:{value}})=>{
        setV2(value);
        setV1(parseFloat((value*exchange[0].rates.USD).toFixed(2)).toLocaleString('ko-KR'));
    }
    
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

    const getVisit=()=>{
        if(JSON.parse(localStorage.getItem('VisitHistory'))===null){
            localStorage.setItem('VisitHistory',JSON.stringify(params.id));
            console.log('배열 처음 생성');
        }else{
            let visit;
            if(Array.isArray(JSON.parse(localStorage.getItem('VisitHistory')))){
                visit = JSON.parse(localStorage.getItem('VisitHistory'));
            }else{
                visit = [JSON.parse(localStorage.getItem('VisitHistory'))];
            }
            let index = visit.indexOf(params.id);
            if(index!==-1){
                if(index===(visit.length-1)){
                    console.log('있는거 유지');
                    return;
                }else{
                    visit.splice(index,1);
                    visit.push(params.id);
                    localStorage.setItem('VisitHistory',JSON.stringify(visit));
                    console.log('있는거 삭제하고 넣기');
                }
            }else{
                visit.push(params.id);
                localStorage.setItem('VisitHistory',JSON.stringify(visit));
                console.log('새로넣기');
            }
        }
    }
    
    const getItem=async()=>{
        getCountryAlarm();
    }

    const splitter=(cap,lang)=>{
        let temp;
        if(lang===null&cap===null){
            return '-';
        }else{
            if(lang===null){
                temp = cap.split('’');
                return temp[0];
            }else{
                temp = lang.split(',');
                return `${temp[0]} 외 ${temp.length}개`
            }
        }
    }

    const populationcut=(population)=>{
        if(population>99999999){
            return `${Math.floor(population/100000000)}억명`;
        }else if(population>9999){
            return `${Math.floor(population/10000)}만명`;
        }else if(population<10000){
            return `${population}명`;
        }
    }
    
    const level=(clevel)=>{
        switch(clevel){
            case 1 : return `1단계(여행유의) / (${Calarmlevel.data[0].region_ty} : ${Calarmlevel.data[0].remark})`
            case 2 : return `2단계(여행자제) / (${Calarmlevel.data[0].region_ty} : ${Calarmlevel.data[0].remark})`
            case 3 : return `3단계(출국권고) / (${Calarmlevel.data[0].region_ty} : ${Calarmlevel.data[0].remark})`
            case 4 : return `4단계(흑색경보) / (${Calarmlevel.data[0].region_ty} : ${Calarmlevel.data[0].remark})`
            default : return '여행경보없음';
        }
    }

    const extra=()=>{
        setV1(1);
        setV2(KRWtoUSD(exchange[0].rates.USD).toFixed(3));
    }

    useEffect(()=>{
        getItem();
        getVisit();
        extra();
    },[]);

    console.log(Icountry.data);
    console.log(Calarmlevel.data);
    
    function Infobox({text,data}){
        let icon = false;
        if(text==="여행경보"){
            icon=true;
        }
        return(
            <div className={styles.info_box}>
                <div className={styles.info_name}>{text}</div>
                <div className={styles.info_data}>{data ? data : '-'}</div>
            </div>
        )
    }

    const KRWtoUSD=(data)=>{
        let i = 1/data;
        return i;
    }

    const exchangeClick=()=>{
        if(swapExchange){
            setSwapExchange(false);
        }else{
            setSwapExchange(true);
        }
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
                                    <img className={styles.mainimagebox} onClick={()=>{
                                                document.getElementById('popupimg').style.display='block';
                                            }} src={imagedata ? imagedata : Calarmlevel.data[0].flag_download_url}/>
                                </div>
                                <img className={styles.imagebox} onMouseEnter={()=>setImagedata(Calarmlevel.data[0].flag_download_url)} src={Calarmlevel.data[0].flag_download_url} prop='flag'/>
                                <img className={styles.imagebox} onMouseEnter={()=>setImagedata(Calarmlevel.data[0].dang_map_download_url)} src={Calarmlevel.data[0].dang_map_download_url} prop='경보지역지도'/>
                                <img className={styles.imagebox} onMouseEnter={()=>setImagedata(Calarmlevel.data[0].map_download_url)} src={Calarmlevel.data[0].map_download_url} prop='주변지도'/>
                            </div>
                            <div className={styles.info}>
                                <Infobox text='나라명' data={params.id}/>
                                <Infobox text='수도' data={splitter(Icountry.data[0].capital,null)}/>
                                <Infobox text='기후' data={Icountry.data[0].climate}/>
                                <Infobox text='인구수' data={populationcut(Icountry.data[0].population)}/>
                                <Infobox text='언어' data={splitter(null,Icountry.data[0].lang)}/>
                                <Infobox text='종교' data={splitter(null,Icountry.data[0].religion)}/>
                                <div className={styles.alarm}>
                                    <div className={styles.alarminfo}>여행경보</div>
                                    <div className={styles.alarmtext}>{level(Calarmlevel.data[0].alarm_lvl)}</div>
                                    <div className={styles.alarmdetail}>
                                        <div className={styles.alarmlevel} style={Calarmlevel.data[0].alarm_lvl===1 ? { backgroundColor: '#1a57ff'}:{ backgroundColor: '#A9AEAA'}}>
                                            <a href="https://www.0404.go.kr/dev/issue_current.mofa?level=attention"/>
                                            <ul className={styles.alarmlist}>
                                                <li>1단계</li>
                                                <li>남색경보</li>
                                            </ul>
                                        </div>
                                        <div className={styles.alarmlevel} style={Calarmlevel.data[0].alarm_lvl===2 ?{backgroundColor: '#ecc100'}:{ backgroundColor: '#A9AEAA'}}>
                                            <a href="https://www.0404.go.kr/dev/issue_current.mofa?level=control"/>
                                            <ul className={styles.alarmlist}>
                                                <li>2단계</li>
                                                <li>황색경보</li>
                                            </ul>
                                        </div>
                                        <div className={styles.alarmlevel} style={Calarmlevel.data[0].alarm_lvl===3 ?{backgroundColor: '#ce0000'}:{ backgroundColor: '#A9AEAA'}}>
                                            <a href="https://www.0404.go.kr/dev/issue_current.mofa?level=limit"/>
                                            <ul className={styles.alarmlist}>
                                                <li>3단계</li>
                                                <li>적색경보</li>
                                            </ul>
                                        </div>
                                        <div className={styles.alarmlevel} style={Calarmlevel.data[0].alarm_lvl===4 ?{backgroundColor: '#141414'}:{ backgroundColor: '#A9AEAA'}}>
                                            <a href="https://www.0404.go.kr/dev/issue_current.mofa?level=ban" />
                                            <ul className={styles.alarmlist}>
                                                <li>4단계</li>
                                                <li>흑색경보</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.exchange}>
                                <div className={styles.exchange_box}>
                                    <div className={styles.info_box}>
                                        <div className={styles.info_name}>USD (달러)</div>
                                        <input
                                        placeholder={swapExchange ? (exchange[0].rates.USD*1000).toFixed(3) : `1`}
                                        type='text'
                                        value={v1}
                                        onChange={v1Change}
                                        ></input>
                                    </div>
                                    <div className={styles.info_box}>
                                        <div className={styles.info_name}>KRW (원)</div>
                                        <input
                                        placeholder={swapExchange ? 1000 : KRWtoUSD(exchange[0].rates.USD).toFixed(3)}
                                        type='text'
                                        value={v2}
                                        onChange={v2Change}
                                        ></input>
                                    </div>                                   
                                </div>
                            </div>
                        </div>
                        <div id='popupimg' className={styles.popup_window}>
                            <div className={styles.popup_flex}>
                                <img className={styles.popup_img} src={imagedata ? imagedata : Calarmlevel.data[0].flag_download_url}/>
                                <button className={styles.popup_button} onClick={()=>{
                                    document.getElementById('popupimg').style.display='none';
                                }}>닫기</button>
                            </div>
                        </div>
                        <p style={{fontSize:'10px'}}>*제공되는 모든 정보는 공공데이터포털을 통해 제공되는 데이터를 이용했습니다.</p>
                    </div>
                )
            }
        </div>
    )
}

export default Country;