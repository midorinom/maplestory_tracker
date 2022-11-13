import React from "react";
import styles from "../Login.module.css";
import windSpirit from "../../../images/wind_spirit.png";
import { useAppDispatch } from "../../../store/hooks";
import { loginActions } from "../../../store/login";
import { Button } from "@mui/material";

const Registered = () => {
  const dispatch = useAppDispatch();

  function handlePage() {
    dispatch(loginActions.setPage("login"));
  }

  return (
    <div className={styles.main_ctn}>
      <div className={styles.registered_main_ctn}>
        <p className={styles.registered_text}>Registered!</p>
        <img src={windSpirit} alt="Wind Spirit" />
      </div>
      <div className="centered">
        <Button
          onClick={handlePage}
          className={styles.login_btn}
          size="large"
          variant="text"
          color="secondary"
        >
          Back to login
        </Button>
      </div>
    </div>
  );
};

export default Registered;
