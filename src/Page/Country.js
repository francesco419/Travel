import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Header from "../Object/Header";
import styles from "./Country.module.css";
import { exchange } from "../Component/exchange";
import { useLocation } from "react-router-dom";
import { Countries } from "../Component/DataInfo";

const API_KEY = process.env.REACT_APP_API_KEY;

function Country() {
  const params = useParams();
  const location = useLocation();
  console.log(location);
  const [Icountry, setIcountry] = useState([]),
    [Calarmlevel, setCalarmlevel] = useState([]),
    [loading, setLoading] = useState(true),
    [imagedata, setImagedata] = useState(null),
    [swapExchange, setSwapExchange] = useState(false),
    [v1, setV1] = useState(1),
    [v2, setV2] = useState(),
    [state, setstate] = useState(location.state ? location.state.Object : null),
    [currencyAPI, setCurrencyAPI] = useState([]),
    [currencies, setCurrencies] = useState(exchange.rates),
    [symbol, setSymbol] = useState(state ? state.currency : null);

  useEffect(() => {
    getItem();
    getVisit();
    extra();
    if (state === undefined) {
      let temp;
      for (let i = 0; i < Countries.length; i++) {
        for (let j = 0; j < Countries[i].list_Currency[j]; j++) {
          if (params.id === Countries[i].list_Currency[j].KOR) {
            temp = Countries[i].list_Currency[j];
          }
        }
      }
      setstate(temp);
      setSymbol(state.currency);
    }
  }, []);

  const getCurrency = async () => {
    try {
      const response = await axios.get(
        "https://api.apilayer.com/fixer/latest",
        {
          params: {
            apikey: "2UEhrO9y09rUUmcarbN1ptUzT6u8t6xw",
            base: "KRW",
            symbols: symbol,
          },
        }
      );
      console.log(response.data);
      setCurrencyAPI(response.data);
    } catch (e) {
      setCurrencyAPI({
        success: true,
        timestamp: 1672316163,
        base: "KRW",
        date: "2022-12-29",
        rates: {
          ALL: null,
        },
      });
      console.log(`Error : ${e.code}`);
    }
  };

  const v1Change = ({ target: { value } }) => {
    setV1(value);
    setV2(
      parseInt(value * KRWtoUSD(currencies[symbol])).toLocaleString("ko-KR")
    );
  };

  const v2Change = ({ target: { value } }) => {
    setV2(value);
    setV1(
      parseFloat((value * currencies[symbol]).toFixed(2)).toLocaleString(
        "ko-KR"
      )
    );
  };

  const getCountryAlarm = async () => {
    try {
      const response = await axios.get(
        `https://apis.data.go.kr/1262000/TravelAlarmService2/getTravelAlarmList2?serviceKey=${API_KEY}&returnType=JSON&cond[country_nm::EQ]=${params.id}&pageNo=1`
      );
      setCalarmlevel(response.data);
      getCountryInfo();
    } catch (e) {
      console.log("Country Alarm Error");
    }
  };

  const getCountryInfo = async () => {
    try {
      const response = await axios.get(
        `http://apis.data.go.kr/1262000/OverviewGnrlInfoService/getOverviewGnrlInfoList?serviceKey=${API_KEY}&cond[country_nm::EQ]=${params.id}`
      );
      setIcountry(response.data);
      setLoading();
    } catch (e) {
      console.log("Country Info Error");
    }
  };

  const getVisit = () => {
    if (JSON.parse(localStorage.getItem("VisitHistory")) === null) {
      let arr = [params.id];
      localStorage.setItem("VisitHistory", JSON.stringify(arr));
      //console.log("배열 처음 생성");
    } else {
      let visit = JSON.parse(localStorage.getItem("VisitHistory"));
      /* if(Array.isArray(JSON.parse(localStorage.getItem('VisitHistory')))){
                visit = JSON.parse(localStorage.getItem('VisitHistory'));
            }else{
                visit = [JSON.parse(localStorage.getItem('VisitHistory'))];
            } */
      let index = visit.indexOf(params.id);
      if (index !== -1) {
        if (index === visit.length - 1) {
          //console.log("있는거 유지");
          return;
        } else {
          visit.splice(index, 1);
          visit.push(params.id);
          localStorage.setItem("VisitHistory", JSON.stringify(visit));
          console.log("있는거 삭제하고 넣기");
        }
      } else {
        visit.push(params.id);
        localStorage.setItem("VisitHistory", JSON.stringify(visit));
        //console.log("새로넣기");
      }
    }
    console.log(JSON.parse(localStorage.getItem("VisitHistory")).length);
    if (JSON.parse(localStorage.getItem("VisitHistory")).length > 10) {
      let del = JSON.parse(localStorage.getItem("VisitHistory")).slice(1);
      localStorage.setItem("VisitHistory", JSON.stringify(del));
    }
  };

  const getItem = async () => {
    getCountryAlarm();
  };

  const splitter = (cap, lang) => {
    let temp;
    if ((lang === null) & (cap === null)) {
      return "-";
    } else {
      if (lang === null) {
        temp = cap.split("’");
        return temp[0];
      } else {
        temp = lang.split(",");
        return `${temp[0]} 외 ${temp.length}개`;
      }
    }
  };

  const populationcut = (population) => {
    if (population > 99999999) {
      return `${Math.floor(population / 100000000)}억명`;
    } else if (population > 9999) {
      return `${Math.floor(population / 10000)}만명`;
    } else if (population < 10000) {
      return `${population}명`;
    }
  };

  const level = (clevel) => {
    switch (clevel) {
      case 1:
        return `1단계(여행유의) / (${Calarmlevel.data[0].region_ty} : ${Calarmlevel.data[0].remark})`;
      case 2:
        return `2단계(여행자제) / (${Calarmlevel.data[0].region_ty} : ${Calarmlevel.data[0].remark})`;
      case 3:
        return `3단계(출국권고) / (${Calarmlevel.data[0].region_ty} : ${Calarmlevel.data[0].remark})`;
      case 4:
        return `4단계(흑색경보) / (${Calarmlevel.data[0].region_ty} : ${Calarmlevel.data[0].remark})`;
      default:
        return "여행경보없음";
    }
  };

  const extra = () => {
    setV1(1);
    setV2(KRWtoUSD(currencies[symbol]).toFixed(3));
  };

  const KRWtoUSD = (data) => {
    let i = 1 / data;
    return i;
  };

  const exchangeClick = () => {
    if (swapExchange) {
      setSwapExchange(false);
    } else {
      setSwapExchange(true);
    }
  };

  function Infobox({ text, data }) {
    let icon = false;
    if (text === "여행경보") {
      icon = true;
    }
    return (
      <div className={styles.info_box}>
        <div className={styles.info_name}>{text}</div>
        <div className={styles.info_data}>{data ? data : "-"}</div>
      </div>
    );
  }

  function Alarm({ alarmLv, backgroundColor, alarmColor, alarmHref }) {
    return (
      <div
        className={styles.alarmlevel}
        style={
          Calarmlevel.data[0].alarm_lvl === alarmLv
            ? { backgroundColor: backgroundColor }
            : { backgroundColor: "#A9AEAA" }
        }
      >
        <a href={alarmHref} />
        <ul className={styles.alarmlist}>
          <li>{alarmLv}단계</li>
          <li>{alarmColor}</li>
        </ul>
      </div>
    );
  }

  /* function Exchange_Comp({
    Currency_name,
    placeholderTrue,
    placeholderFalse,
    value,
    onChange,
  }) {
    return (
      <div className={styles.info_box}>
        <div className={styles.info_name}>{Currency_name}</div>
        <input
          placeholder={swapExchange ? placeholderTrue : placeholderFalse}
          type="text"
          value={value}
          onChange={onChange}
        ></input>
      </div>
    );
  } */

  return (
    <div>
      <Header />
      {loading ? (
        <div>Loading</div>
      ) : (
        <div className={styles.box}>
          <div className={styles.container}>
            <div className={styles.map}>
              <div className={styles.mainimage}>
                <img
                  className={styles.mainimagebox}
                  onClick={() => {
                    document.getElementById("popupimg").style.display = "block";
                  }}
                  src={
                    imagedata
                      ? imagedata
                      : Calarmlevel.data[0].flag_download_url
                  }
                />
              </div>
              <img
                className={styles.imagebox}
                onMouseEnter={() =>
                  setImagedata(Calarmlevel.data[0].flag_download_url)
                }
                src={Calarmlevel.data[0].flag_download_url}
                prop="flag"
              />
              <img
                className={styles.imagebox}
                onMouseEnter={() =>
                  setImagedata(Calarmlevel.data[0].dang_map_download_url)
                }
                src={Calarmlevel.data[0].dang_map_download_url}
                prop="경보지역지도"
              />
              <img
                className={styles.imagebox}
                onMouseEnter={() =>
                  setImagedata(Calarmlevel.data[0].map_download_url)
                }
                src={Calarmlevel.data[0].map_download_url}
                prop="주변지도"
              />
            </div>
            <div className={styles.info}>
              <Infobox text="나라명" data={params.id} />
              <Infobox
                text="수도"
                data={splitter(Icountry.data[0].capital, null)}
              />
              <Infobox text="기후" data={Icountry.data[0].climate} />
              <Infobox
                text="인구수"
                data={populationcut(Icountry.data[0].population)}
              />
              <Infobox
                text="언어"
                data={splitter(null, Icountry.data[0].lang)}
              />
              <Infobox
                text="종교"
                data={splitter(null, Icountry.data[0].religion)}
              />
              <div className={styles.alarm}>
                <div className={styles.alarminfo}>여행경보</div>
                <div className={styles.alarmtext}>
                  {level(Calarmlevel.data[0].alarm_lvl)}
                </div>
                <div className={styles.alarmdetail}>
                  <Alarm
                    alarmLv={1}
                    backgroundColor="#1a57ff"
                    alarmColor="남색경보"
                    alarmHref="https://www.0404.go.kr/dev/issue_current.mofa?level=attention"
                  ></Alarm>
                  <Alarm
                    alarmLv={2}
                    backgroundColor="#ecc100"
                    alarmColor="황색경보"
                    alarmHref="https://www.0404.go.kr/dev/issue_current.mofa?level=control"
                  ></Alarm>
                  <Alarm
                    alarmLv={3}
                    backgroundColor="#ce0000"
                    alarmColor="적색경보"
                    alarmHref="https://www.0404.go.kr/dev/issue_current.mofa?level=limit"
                  ></Alarm>
                  <Alarm
                    alarmLv={4}
                    backgroundColor="#141414"
                    alarmColor="흑색경보"
                    alarmHref="https://www.0404.go.kr/dev/issue_current.mofa?level=ban"
                  ></Alarm>
                </div>
              </div>
            </div>
            <div className={styles.exchange}>
              <div className={styles.exchange_box}>
                <div className={styles.info_box}>
                  <div className={styles.info_name}>
                    {Object.keys(currencies).filter((data) => data === symbol)}
                  </div>
                  <input
                    placeholder={
                      swapExchange
                        ? (currencies[symbol] * 1000).toFixed(3)
                        : `1`
                    }
                    type="text"
                    value={v1}
                    onChange={v1Change}
                  ></input>
                </div>
                <div className={styles.info_box}>
                  <div className={styles.info_name}>KRW</div>
                  <input
                    placeholder={
                      swapExchange
                        ? 1000
                        : KRWtoUSD(currencies[symbol]).toFixed(3)
                    }
                    type="text"
                    value={v2}
                    onChange={v2Change}
                  ></input>
                </div>
              </div>
            </div>
          </div>
          <div id="popupimg" className={styles.popup_window}>
            <div className={styles.popup_flex}>
              <img
                className={styles.popup_img}
                src={
                  imagedata ? imagedata : Calarmlevel.data[0].flag_download_url
                }
              />
              <button
                className={styles.popup_button}
                onClick={() => {
                  document.getElementById("popupimg").style.display = "none";
                }}
              >
                닫기
              </button>
            </div>
          </div>
          <p className={styles.exdata} style={{ fontSize: "10px" }}>
            *제공되는 모든 정보는 공공데이터포털을 통해 제공되는 데이터를
            이용했습니다.
          </p>
        </div>
      )}
    </div>
  );
}

export default Country;
