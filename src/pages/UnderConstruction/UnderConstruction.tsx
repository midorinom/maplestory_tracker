import React from "react";
import cryingSpirit from "../../images/crying_spirit.png";
import styles from "./UnderConstruction.module.css";

const UnderConstruction = () => {
  return (
    <div className={styles.parent_ctn}>
      <div className={styles.main_ctn}>
        <img src={cryingSpirit} />
        <div className={styles.text}>Under Construction</div>
      </div>
    </div>
  );
};

export default UnderConstruction;
