import { useEffect, useState } from "react";
import styles from "./Indicator.module.css";
import { Link, useNavigate } from "react-router-dom";

export default function Indicator() {
  const [click, setClick] = useState(false);
  const moveIndicator = () => {
    const doc = document.getElementById("indicator");
    window.addEventListener("scroll", (e) => {
      doc.style.top = `${window.pageYOffset + 200}px`;
    });
  };

  useEffect(() => {
    moveIndicator();
    return () => {
      moveIndicator();
    };
  }, []);

  return (
    <div id="indicator" className={styles["indicator-comp"]}>
      <div id="indicator2" className={styles["indicator"]}>
        <div className={styles["indicator-inner"]}>
          <h3>History</h3>
          <div className={styles["indicator-history"]}>
            {JSON.parse(localStorage.getItem("VisitHistory")) ? (
              JSON.parse(localStorage.getItem("VisitHistory")).map(
                (item, index) => {
                  if (index > 9) {
                    return;
                  }
                  return <History data={item} key={`history_${index}`} />;
                }
              )
            ) : (
              <p>비어있음</p>
            )}
          </div>
        </div>
      </div>
      <button
        onClick={() => {
          if (click) {
            document.getElementById("indicator").style.height = "20vh";
            document.getElementById("indicator2").style.height = "18vh";
          } else {
            document.getElementById("indicator").style.height = "auto";
            document.getElementById("indicator2").style.height = "auto";
          }
          setClick((click) => !click);
        }}
      >
        {click ? "-" : `+`}
      </button>
    </div>
  );
}

function History({ data }) {
  /* const Delete_Content = (data) => {
    document.getElementById(data).style.display = "none";
    let local = JSON.parse(localStorage.getItem("VisitHistory"));
    let index = local.indexOf(data);
    local.splice(index, 1);
    localStorage.setItem("VisitHistory", JSON.stringify(local));
  }; */

  return (
    <div id={data} className={styles["history-content"]}>
      <Link className={styles.history_link} to={`/Country/${data}`}>
        {data}
      </Link>
    </div>
  );
}
