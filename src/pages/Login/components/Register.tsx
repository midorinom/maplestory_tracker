import React from "react";
import styles from "../Login.module.css";
import { useAppDispatch } from "../../../store/hooks";
import { loginActions } from "../../../store/login";
import { Button, TextField } from "@mui/material";

const Register = () => {
  const dispatch = useAppDispatch();

  function handlePage() {
    dispatch(loginActions.setPage("login"));
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
    <div className={styles.main_ctn}>
      <form className={styles.main_top_ctn}>
        <div className={styles.register_inputs}>
          <div className={styles.register_user_pw}>
            <TextField className={styles.input_field} label="Username" />
            <TextField
              className={styles.input_field}
              type="password"
              label="Password"
            />
          </div>
          <div className={`${styles.regions_ctn} + centered`}>
            <Button variant="outlined" color="secondary">
              MapleSEA
            </Button>
            <Button variant="outlined" color="secondary">
              GMS Reboot
            </Button>
          </div>
        </div>
        <Button
          className={styles.login_btn}
          size="large"
          variant="contained"
          color="primary"
          type="submit"
        >
          Register
        </Button>
      </form>
      <div className="centered">
        <p className={styles.main_btm_text}>Already have an account?</p>
        <Button
          onClick={handlePage}
          className={styles.main_btm_btn}
          size="small"
          variant="text"
          color="secondary"
        >
          Login
        </Button>
      </div>
    </div>
  );
};

export default Register;
