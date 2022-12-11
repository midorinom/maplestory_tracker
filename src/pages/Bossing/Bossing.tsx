import { useState, useEffect } from "react";
import { useAppSelector } from "../../store/hooks";
import moment from "moment";
import BossingMain from "./BossingMain";
import BossingTop from "./BossingTop";
import styles from "./Bossing.module.css";

const Bossing = () => {
  const [weeklyDate, setWeeklyDate] = useState<string>();
  const userData = useAppSelector((state: any) => state.user.userData);

  // =========
  // Functions
  // =========
  function getDate() {
    let today: string = "";

    if (userData.role === "GMS") {
      today = moment.utc().toISOString();
      setWeeklyDate(moment.utc().day(4).fromNow());
    }
    if (userData.role === "MSEA") {
      today = moment().toISOString();
      setWeeklyDate(moment().day(4).fromNow());
    }
  }

  useEffect(() => {
    getDate();
  }, []);

  return (
    <div className={styles.parent_ctn}>
      <div className={styles.timer_ctn}>Reset {weeklyDate}</div>
      <div className={styles.bossing_ctn}>
        <BossingTop />
        <BossingMain />
        <div className={styles.btm_ctn}>Btm Ctn</div>
      </div>
    </div>
  );
};

export default Bossing;
