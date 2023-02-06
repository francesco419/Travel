import styles from "../Page/Country.module.css";
import { useEffect, useState } from "react";

export default function CountryMap({ props }) {
  const [imagedata, setImagedata] = useState(null);
  return (
    <div className={styles.map}>
      <div className={styles.mainimage}>
        <img
          className={styles.mainimagebox}
          onClick={() => {
            document.getElementById("popupimg").style.display = "block";
          }}
          src={imagedata ? imagedata : props.data[0].flag_download_url}
        />
      </div>
      <div id="popupimg" className={styles.popup_window}>
        <div className={styles.popup_flex}>
          <img
            className={styles.popup_img}
            src={imagedata ? imagedata : props.data[0].flag_download_url}
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
    </div>
  );
}
