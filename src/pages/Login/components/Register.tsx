import { useState, useRef } from "react";
import { useAppDispatch } from "../../../store/hooks";
import { loginActions } from "../../../store/login";
import { DefaultRes } from "../../../types/types";
import styles from "../Login.module.css";
import { Button, TextField } from "@mui/material";

const Register = () => {
  // =========
  // Variables
  // =========
  const dispatch = useAppDispatch();

  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [region, setRegion] = useState<string>("");
  const [duplicateError, setDuplicateError] = useState<boolean>(false);

  // ==============
  // Event Handlers
  // ==============
  function handlePage() {
    dispatch(loginActions.setPage("login"));
  }

  function handleRegion(e: React.MouseEvent<HTMLButtonElement>) {
    const regionClicked = e.target as HTMLButtonElement;

    if (regionClicked.value === region) {
      setRegion("");
    } else {
      setRegion(regionClicked.value);
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!region) {
      alert("Please select your server");
    }

    if (usernameRef.current && passwordRef.current && region) {
      createUser();
    }
  }

  function handleOnChange() {
    if (duplicateError) {
      setDuplicateError(false);
    }
  }

  // ===============
  // Fetch Functions
  // ===============
  const createUser = async () => {
    try {
      if (usernameRef.current && passwordRef.current) {
        const res = await fetch("http://127.0.0.1:5000/users/register", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            username: usernameRef.current.value,
            password: passwordRef.current.value,
            role: region,
          }),
        });
        const response: DefaultRes = await res.json();
        // Handle duplicate username error
        if (response.message === "Duplicate username") {
          setDuplicateError(true);
          throw new Error(response.message);
        } else {
          dispatch(loginActions.setPage("registered"));
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
        <div className={styles.register_inputs}>
          <div className={styles.register_user_pw}>
            <TextField
              inputRef={usernameRef}
              label="Username"
              required
              error={duplicateError}
              helperText={duplicateError && "username is already taken"}
              onChange={handleOnChange}
              className={styles.input_field}
            />
            <TextField
              inputRef={passwordRef}
              type="password"
              label="Password"
              required
              className={styles.input_field}
            />
          </div>
          <div className={`${styles.regions_ctn} + centered`}>
            <Button
              onClick={handleRegion}
              value="MSEA"
              variant={region === "MSEA" ? "contained" : "outlined"}
              color="secondary"
            >
              MapleSEA
            </Button>
            <Button
              onClick={handleRegion}
              value="GMS"
              variant={region === "GMS" ? "contained" : "outlined"}
              color="secondary"
            >
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
          REGISTER
        </Button>
      </form>
      <div className={styles.main_btm_ctn}>
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
