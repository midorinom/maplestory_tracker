import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { GetClassesRes } from "../../types/types";
import styles from "./CharactersAdd.module.css";
import { Button, TextField, Autocomplete } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const CharactersAdd = () => {
  // =========
  // Variables
  // =========
  const userData = useAppSelector((state) => state.user.userData);
  const [classes, setClasses] = useState<string[]>([]);

  // ==========
  // useEffects
  // ==========
  useEffect(() => {
    getClasses();
  }, []);

  // ===============
  // Fetch Functions
  // ===============
  const getClasses = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/enums/classes/get", {
        method: "GET",
        headers: { "content-type": "application/json" },
      });
      const response: GetClassesRes = await res.json();

      setClasses(response.classes);
    } catch (err: any) {
      console.log(err);
    }
  };

  // ======
  // Return
  // ======
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
          <Autocomplete
            disablePortal
            id="classes_dropdown"
            options={classes}
            sx={{ width: "60%" }}
            renderInput={(params) => <TextField {...params} label="Classes" />}
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
