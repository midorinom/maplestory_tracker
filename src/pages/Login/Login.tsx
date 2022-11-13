import React from "react";
import styles from "./Login.module.css";
import { useAppSelector } from "../../store/hooks";
import LoginComp from "./components/LoginComp";
import Register from "./components/Register";

const Login = () => {
  const page = useAppSelector((state) => state.login.page);

  return (
    <div className={`${styles.parent_ctn} + centered`}>
      {page === "login" ? <LoginComp /> : <Register />}
    </div>
  );
};

export default Login;
