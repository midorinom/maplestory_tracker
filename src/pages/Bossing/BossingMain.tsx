import React from "react";
import styles from "./Bossing.module.css";

const BossingMain = () => {
  // =========
  // Variables
  // =========
  const url = process.env.REACT_APP_API_ENDPOINT;

  // ======
  // Return
  // ======
  return (
    <div className={styles.main_ctn}>
      <div className={styles.main_left_ctn}>Boss Names</div>
      <div className={styles.main_right_ctn}>
        <div>
          <div>Checkbox 1</div>
          <div>Checkbox 2</div>
          <div>Checkbox 3</div>
        </div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
      </div>
    </div>
  );
};

export default BossingMain;
