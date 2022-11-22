import React from "react";
import { useAppSelector } from "../../../store/hooks";
import moment from "moment";
import styles from "../Dashboard.module.css";

const Charts = () => {
  const userData = useAppSelector((state) => state.user.userData);
  let dailyDate: string = "";
  let weeklyDate: string = "";

  // GMS;
  if (userData.role === "GMS") {
    dailyDate = moment.utc().endOf("day").fromNow();
    weeklyDate = moment.utc().day(4).fromNow();
  }

  // MSEA
  if (userData.role === "MSEA") {
    dailyDate = moment().endOf("day").fromNow();
    weeklyDate = moment().day(4).fromNow();
  }

  return (
    <div className={styles.charts_ctn}>
      <p>Daily Reset {dailyDate}</p>
      <p>Weekly Boss Reset {weeklyDate}</p>
    </div>
  );
};

export default Charts;
