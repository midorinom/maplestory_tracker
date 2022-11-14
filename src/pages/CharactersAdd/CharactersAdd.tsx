import React from "react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import styles from "./CharactersAdd.module.css";

const CharactersAdd = () => {
  const userData = useAppSelector((state) => state.user.userData);

  return <div className={styles.parent_ctn}>Add Characters Page</div>;
};

export default CharactersAdd;
