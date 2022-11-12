import React from "react";
import { useAppSelector } from "../../store/hooks";
import LoginComp from "./components/LoginComp";
import Register from "./components/Register";

const Login = () => {
  const page = useAppSelector((state) => state.login.page);

  return <>{page === "login" ? <LoginComp /> : <Register />}</>;
};

export default Login;
