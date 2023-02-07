import axios from "axios";
import Header from "../../Component/Header";
import styles from "./Country.module.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CountryCurrency from "./CountryCurrency";
import CountryMap from "./CountryMap";
import CountryInfo from "./CountryInfo";
import Indicator from "../../Component/Indicator";
import AlarmDetail from "./AlarmDetail";
import Loading from "../../Component/Loading";

const API_KEY = process.env.REACT_APP_API_KEY;

function CountryList() {
  const params = useParams();
  const [Icountry, setIcountry] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alarmlevel, setAlarmlevel] = useState([]);

  useEffect(() => {
    getItem();
    getVisit();
  }, []);

  const getCountryAlarm = async () => {
    try {
      const response = await axios.get(
        `https://apis.data.go.kr/1262000/TravelAlarmService2/getTravelAlarmList2?serviceKey=${API_KEY}&returnType=JSON&cond[country_nm::EQ]=${params.id}&pageNo=1`
      );
      setAlarmlevel(response.data);
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
      if (response) {
        setIcountry(response.data);
        setLoading(false);
      }
    } catch (e) {
      console.log("Country Info Error");
    }
  };

  const getItem = async () => {
    getCountryAlarm();
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

  function AlarmBlock() {
    let text = (
      <p>{alarmlevel.data[0].remark === "전 지역" ? "전 지역" : "일부 지역"}</p>
    );
    switch (alarmlevel.data[0].alarm_lvl) {
      case 0:
        return (
          <div
            className={styles["country-alarm"]}
            style={{ backgroundColor: "#1a57ff" }}
          >
            {text}
          </div>
        );
      case 1:
        return (
          <div
            className={styles["country-alarm"]}
            style={{ backgroundColor: "#ecc100" }}
          >
            {text}
          </div>
        );
      case 2:
        return (
          <div
            className={styles["country-alarm"]}
            style={{ backgroundColor: "#ce0000" }}
          >
            {text}
          </div>
        );
      case 3:
        return (
          <div
            className={styles["country-alarm"]}
            style={{ backgroundColor: "#141414" }}
          >
            {text}
          </div>
        );
      default:
        return;
    }
  }

  if (loading) {
    return <Loading />;
  } else {
    return (
      <div>
        <Header />
        <Indicator />
        <div className={styles.box}>
          <div className={styles.container}>
            <div className={styles["country-top"]}>
              <div className={styles["country-name"]}>
                <p>{Icountry.data[0].country_eng_nm}</p>
              </div>
              <AlarmBlock />
            </div>
            <hr />
            <CountryMap props={alarmlevel} />
            <hr />
            <CountryInfo iprops={Icountry} cprop={alarmlevel} />
            <hr />
            <div className={styles["country-detail"]}>
              <CountryCurrency sprop={params} />
              <AlarmDetail alarm={alarmlevel} />
              <AlarmDetail alarm={alarmlevel} />
            </div>
            <hr />
            <RecommendCity />
            <hr />
          </div>
          <p className={styles.exdata} style={{ fontSize: "10px" }}>
            *제공되는 모든 정보는 공공데이터포털을 통해 제공되는 데이터를
            이용했습니다.
          </p>
        </div>
        <footer>
          <h1>FOOTER</h1>
        </footer>
      </div>
    );
  }
}

export default CountryList;

function RecommendCity() {
  function CityLayerHover({ num, city, text }) {
    return (
      <span>
        <div>
          <h2>{num}</h2>
          <h2>{city}</h2>
        </div>
        <hr />
        <div>
          <p>Introduction</p>
        </div>
      </span>
    );
  }
  return (
    <div className={styles["country-city"]}>
      <div className={styles["city-table"]}>
        <h1>Place to Go</h1>
        <table>
          <tbody>
            <tr>
              <td>
                <CityLayerHover num={"01"} city={"Seoul"} />
                <img src="https://i.pinimg.com/564x/51/b5/d1/51b5d1ea4bb7637c8265738fab51b979.jpg" />
                <h3>Seoul</h3>
              </td>
              <td>
                <CityLayerHover num={"02"} city={"Paris"} />
                <img src="https://i.pinimg.com/564x/c8/43/b1/c843b1a2cdc681da7216073828d5aaa3.jpg" />
                <h3>Paris</h3>
              </td>
            </tr>
            <tr>
              <td>
                <CityLayerHover num={"03"} city={"NewYork"} />
                <img src="https://i.pinimg.com/564x/55/05/c9/5505c945aad0ebdd2f12498bdcff7e6d.jpg" />
                <h3>NewYork</h3>
              </td>
              <td>
                <CityLayerHover num={"04"} city={"Tokyo"} />
                <img src="https://i.pinimg.com/564x/2b/41/45/2b4145328a4b15d08d263a256d410783.jpg" />
                <h3>Tokyo</h3>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
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
