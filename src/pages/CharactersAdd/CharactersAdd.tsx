import React from "react";
import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import styles from "./CharactersAdd.module.css";
import { Button, TextField } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const CharactersAdd = () => {
  const userData = useAppSelector((state) => state.user.userData);

  return (
    <div className={styles.parent_ctn}>
      <div className={styles.main_ctn}>
        <Button
          variant="outlined"
          color="secondary"
          component={Link}
          to={userData.characters.length > 0 ? "/characters" : "/"}
          startIcon={<ArrowBackIcon />}
          className={styles.back_btn}
        >
          Back
        </Button>
        <form className={styles.form}>
          <TextField
            label="IGN"
            required
            color="info"
            className={styles.text_field}
          />
          <TextField
            label="Level"
            required
            color="info"
            className={styles.text_field}
          />
          <TextField
            label="Class"
            required
            color="info"
            className={styles.text_field}
          />
          <TextField
            label="Image"
            required
            color="info"
            className={styles.text_field}
          />
        </form>
        <div className={styles.btm_ctn}>
          <Button className={styles.add_btn} variant="contained" size="large">
            Add Character
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CharactersAdd;
