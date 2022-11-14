import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { GetClassesRes } from "../../types/types";
import styles from "./CharactersAdd.module.css";
import { Button, TextField, Autocomplete, Tooltip } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const CharactersAdd = () => {
  // =========
  // Variables
  // =========
  const userData = useAppSelector((state) => state.user.userData);

  const ignRef = useRef<HTMLInputElement>(null);
  const levelRef = useRef<HTMLInputElement>(null);
  const [classes, setClasses] = useState<string[]>([]);
  const [selectedClass, setSelectedClass] = useState<string | null>("");
  const [ignError, setIgnError] = useState<boolean>(false);
  const [levelError, setLevelError] = useState<boolean>(false);

  // ==============
  // Event Handlers
  // ==============
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (ignRef.current) {
      if (ignRef.current.value.length > 12) {
        setIgnError(true);
      }
    }

    if (ignRef.current && levelRef.current) {
      if (!selectedClass) {
        alert("Please select a class");
      }

      console.log({
        ign: ignRef.current.value,
        level: levelRef.current.value,
        class: selectedClass,
      });
    }
  }

  function handleIgnChange() {
    if (ignError) {
      if (ignRef.current) {
        if (ignRef.current.value.length <= 12) {
          setIgnError(false);
        }
      }
    }
  }

  function handleClassChange(e: any, value: string | null) {
    setSelectedClass(value);
  }

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
        <form onSubmit={handleSubmit} className={styles.form}>
          <TextField
            inputRef={ignRef}
            onChange={handleIgnChange}
            error={ignError}
            label="IGN"
            required
            color="primary"
            className={styles.text_field}
          />
          <TextField
            inputRef={levelRef}
            label="Level"
            required
            color="primary"
            className={styles.text_field}
          />
          <Autocomplete
            onChange={handleClassChange}
            disablePortal
            id="classes_dropdown"
            options={classes}
            sx={{ width: "60%" }}
            renderInput={(params) => <TextField {...params} label="Classes" />}
          />
          <div className={styles.upload_ctn}>
            <Tooltip title="Search for your character either on maplestory.gg or the official website's rankings page. Alternatively, you can create your character on maples.im">
              <p>Image: </p>
            </Tooltip>
            <Button variant="outlined" color="secondary" component="label">
              Upload File
              <input type="file" hidden />
            </Button>
          </div>
          <div className={styles.btm_ctn}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              color="info"
              className={styles.add_btn}
            >
              Add Character
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CharactersAdd;
