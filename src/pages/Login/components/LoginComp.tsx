import React from "react";
import { useAppDispatch } from "../../../store/hooks";
import { loginActions } from "../../../store/login";

const LoginComp = () => {
  const dispatch = useAppDispatch();

  function handlePage() {
    dispatch(loginActions.setPage("register"));
  }

  const insertIntoDB = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/users/register", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          username: "usernameTest",
          password: "passwordTest",
        }),
      });
      const response = await res.json();
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      Login Comp
      <p>Not registered?</p>
      <button onClick={handlePage}>Create an account</button>
    </div>
  );
};

export default LoginComp;
