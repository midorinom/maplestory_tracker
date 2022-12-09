import React from "react";
import styles from "./Bossing.module.css";

const Bossing = () => {
  return (
    <div className={styles.parent_ctn}>
      <div className={styles.top_ctn}>Top Ctn</div>
      <div className={styles.main_ctn}>Main Ctn</div>
      <div className={styles.btm_ctn}>Btm Ctn</div>
    </div>
  );
};

export default Bossing;
