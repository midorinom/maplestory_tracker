import React from "react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import styles from "./Characters.module.css";

const Characters = () => {
  const userData = useAppSelector((state) => state.user.userData);

  return <div className={styles.parent_ctn}>Characters Page</div>;
};

export default Characters;
