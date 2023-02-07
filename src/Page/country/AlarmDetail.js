import styles from "./Country.module.css";

export default function AlarmDetail({ alarm }) {
  return (
    <div className={styles["alarmdetail"]}>
      <h2>여행경보지역</h2>
      <img src={alarm.data[0].dang_map_download_url} />
      <p>{alarm.data[0].remark}</p>
    </div>
  );
}
