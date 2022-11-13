import React from "react";
import styles from "./Login.module.css";
import { useAppSelector } from "../../store/hooks";
import harmonySpirit from "../../images/harmony_spirit.png";
import LoginComp from "./components/LoginComp";
import Register from "./components/Register";

const Login = () => {
  const page = useAppSelector((state) => state.login.page);

  return (
    <div className={`${styles.parent_ctn} + centered`}>
      <div className={styles.header}>
        <img className={styles.harmony_spirit} src={harmonySpirit} />
        <h1 className={`${styles.header_text} + centered`}>Maple Tracker</h1>
      </div>
      {page === "login" ? <LoginComp /> : <Register />}
    </div>
  );
};

export default Login;
