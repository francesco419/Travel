import styles from "./Country.module.css";

export default function CountryInfo({ iprops, cprop }) {
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
        return `${temp[0]} 외 ${temp.length - 1}개`;
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

  function Infobox({ text, data }) {
    let icon = false;
    if (text === "여행경보") {
      icon = true;
    }
    return (
      <ul className={styles.info_box}>
        <li className={styles.info_name}>
          <p>{text}</p>
        </li>
        <li className={styles.info_data}>
          <p>{data ? data : "-"}</p>
        </li>
      </ul>
    );
  }

  return (
    <div className={styles.info}>
      <div className={styles["country-flag"]}>
        <img src={cprop.data[0].flag_download_url} />
      </div>
      <div>
        <Infobox text="나라명" data={iprops.data[0].country_nm} />
        <Infobox text="수도" data={splitter(iprops.data[0].capital, null)} />
        <Infobox text="기후" data={iprops.data[0].climate} />
      </div>
      <div>
        <Infobox
          text="인구수"
          data={populationcut(iprops.data[0].population)}
        />
        <Infobox text="언어" data={splitter(null, iprops.data[0].lang)} />
        <Infobox text="종교" data={splitter(null, iprops.data[0].religion)} />
      </div>
    </div>
  );
}
