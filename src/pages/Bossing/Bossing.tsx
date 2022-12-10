import { useState, useEffect } from "react";
import { useAppSelector } from "../../store/hooks";
import moment from "moment";
import styles from "./Bossing.module.css";

const Bossing = () => {
  // =========
  // Variables
  // =========
  const url = process.env.REACT_APP_API_ENDPOINT;
  const userData = useAppSelector((state: any) => state.user.userData);
  const [todayDate, setTodayDate] = useState<string>();
  const [weeklyDate, setWeeklyDate] = useState<string>();

  // =========
  // Functions
  // =========
  function getDates() {
    let today: string = "";

    // GMS;
    if (userData.role === "GMS") {
      today = moment.utc().toISOString();
      setWeeklyDate(moment.utc().day(11).fromNow());
    }

    // MSEA
    if (userData.role === "MSEA") {
      today = moment().toISOString();
      setWeeklyDate(moment().day(11).fromNow());
    }

    setTodayDate(today.slice(0, 10));
  }

  // =========
  // useEffect
  // =========
  useEffect(() => {
    getDates();
  }, []);

  // ======
  // Return
  // ======
  return (
    <div className={styles.parent_ctn}>
      <div className={styles.top_ctn}>
        <div className={styles.top_left_ctn}>Reset {weeklyDate}</div>
        <div className={styles.top_right_ctn}>top 2</div>
      </div>
      <div className={styles.main_ctn}>Main Ctn</div>
      <div className={styles.btm_ctn}>Btm Ctn</div>
    </div>
  );
};

export default Bossing;
