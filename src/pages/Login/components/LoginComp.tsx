import { useState, useRef } from "react";
import { useAppDispatch } from "../../../store/hooks";
import { loginActions } from "../../../store/login";
import { userActions } from "../../../store/user";
import { LoginResponse } from "../../../types/types";
import styles from "../Login.module.css";
import { Button, TextField } from "@mui/material";

const LoginComp = () => {
  // =========
  // Variables
  // =========
  const dispatch = useAppDispatch();

  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [loginError, setLoginError] = useState<boolean>(false);

  // ==============
  // Event Handlers
  // ==============
  function handlePage() {
    dispatch(loginActions.setPage("register"));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (usernameRef.current && passwordRef.current) {
      login();
    }
  }

  function handleOnChange() {
    if (loginError) {
      setLoginError(false);
    }
  }

  // ===============
  // Fetch Functions
  // ===============
  const login = async () => {
    try {
      if (usernameRef.current && passwordRef.current) {
        const res = await fetch("http://127.0.0.1:5000/users/login", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            username: usernameRef.current.value,
            password: passwordRef.current.value,
          }),
        });
        const response: LoginResponse = await res.json();

        if (response.role) {
          dispatch(
            userActions.setUserData({
              username: usernameRef.current.value,
              role: response.role,
            })
          );
        } else {
          // Handle login error
          setLoginError(true);
          throw new Error(response.message);
        }
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  // ======
  // Return
  // ======
  return (
    <div className={styles.main_ctn}>
      <form onSubmit={handleSubmit} className={styles.main_top_ctn}>
        <div className={styles.login_inputs}>
          <TextField
            inputRef={usernameRef}
            label="Username"
            required
            error={loginError}
            onChange={handleOnChange}
            className={styles.input_field}
          />
          <TextField
            inputRef={passwordRef}
            type="password"
            label="Password"
            required
            error={loginError}
            helperText={loginError && "incorrect username or password"}
            onChange={handleOnChange}
            className={styles.input_field}
          />
        </div>
        <Button
          className={styles.login_btn}
          size="large"
          variant="contained"
          color="primary"
          type="submit"
        >
          Login
        </Button>
      </form>
      <div className="centered">
        <p className={styles.main_btm_text}>Not registered?</p>
        <Button
          onClick={handlePage}
          className={styles.login_btn}
          size="small"
          variant="text"
          color="secondary"
        >
          Create an account
        </Button>
      </div>
    </div>
  );
};

export default LoginComp;
