import { useEffect, useState } from "react";
import { exchange } from "../../data/exchange";
import styles from "./Country.module.css";
import { Countries } from "../../data/DataInfo";
import axios from "axios";

const CURRENCY_API_KEY = process.env.REACT_APP_CURRENCY_API;

export default function CountryCurrency({ sprop }) {
  const [valueExchange, setValueExchange] = useState(1);
  const [valueKRW, setValueKRW] = useState(1000);
  const [symbol, setSymbol] = useState();
  const [currencyAPI, setCurrencyAPI] = useState();

  useEffect(() => {
    setCurrentCountry();
    //getCurrency();
  }, []);

  const setCurrentCountry = () => {
    let currency;
    for (let i = 0; i < Countries.length; i++) {
      // <= Countries에서 나라에따른 currency 찾기
      if (Countries[i].name === sprop.cont) {
        //Countries에서 맞는 Continent 찾기
        for (let j = 0; j < Countries[i].list_Currency.length; j++) {
          let temp = Countries[i].list_Currency[j];
          if (temp.KOR === sprop.id) {
            currency = temp.currency;
            setSymbol(temp.currency);
            break;
          }
        }
        break;
      }
    }
    setValueExchange((exchange.rates[currency] * 1000).toFixed(2)); //1000원에 따른 환율 적용
    setValueKRW(1000); //초기 값 1000원
  };
  const getCurrency = async () => {
    try {
      const response = await axios.get(
        "https://api.apilayer.com/fixer/latest",
        {
          params: {
            apikey: CURRENCY_API_KEY,
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

  const valueHandler = ({ target: { value } }) => {
    setValueExchange(value);
    setValueKRW(
      parseInt(value * convertKRW(exchange.rates[symbol])).toLocaleString(
        "ko-KR"
      )
    );
  };

  const valueKRWHandler = ({ target: { value } }) => {
    setValueKRW(value);
    setValueExchange(
      parseFloat((value * exchange.rates[symbol]).toFixed(2)).toLocaleString(
        "ko-KR"
      )
    );
  };

  const convertKRW = (data) => {
    let i = 1 / data;
    return i;
  };

  return (
    <div className={styles["exchange-box"]}>
      <h2>환율계산기</h2>
      <div className={styles["exchange-info"]}>
        <span>{symbol}</span>
        <input
          type="text"
          value={valueExchange}
          onChange={valueHandler}
        ></input>
      </div>
      <div className={styles["exchange-info"]}>
        <span>KRW</span>
        <input type="text" value={valueKRW} onChange={valueKRWHandler}></input>
      </div>
    </div>
  );
}
