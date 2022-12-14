import { useState, useRef } from "react";
import { useAppDispatch } from "../../../store/hooks";
import { loginActions } from "../../../store/login";
import { userActions } from "../../../store/user";
import { LoginRes } from "../../../types/types";
import styles from "../Login.module.css";
import { Button, TextField } from "@mui/material";

const LoginComp = () => {
  // =========
  // Variables
  // =========
  const url = process.env.REACT_APP_API_ENDPOINT;
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
        const res = await fetch(`${url}/users/login`, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            username: usernameRef.current.value,
            password: passwordRef.current.value,
          }),
        });
        const response: LoginRes = await res.json();

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
            color="info"
            className={styles.input_field}
          />
          <TextField
            inputRef={passwordRef}
            type="password"
            label="Password"
            required
            error={loginError}
            helperText={loginError && "Incorrect username or password"}
            onChange={handleOnChange}
            color="info"
            className={styles.input_field}
          />
        </div>
        <Button
          className={styles.login_btn}
          size="large"
          variant="contained"
          color="info"
          type="submit"
        >
          LOGIN
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
