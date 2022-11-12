import React from "react";
import { useAppDispatch } from "../../../store/hooks";
import { loginActions } from "../../../store/login";

const Register = () => {
  const dispatch = useAppDispatch();

  function handlePage() {
    dispatch(loginActions.setPage("login"));
  }

  //   const insertIntoDB = async () => {
  //     try {
  //       const res = await fetch("http://127.0.0.1:5000/users/register", {
  //         method: "POST",
  //         headers: { "content-type": "application/json" },
  //         body: JSON.stringify({
  //           username: "usernameTest",
  //           password: "passwordTest",
  //         }),
  //       });
  //       const response = await res.json();
  //       console.log(response);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

  return (
    <div>
      Register
      <p>Already have an account?</p>
      <button onClick={handlePage}>Login</button>
    </div>
  );
};

export default Register;
