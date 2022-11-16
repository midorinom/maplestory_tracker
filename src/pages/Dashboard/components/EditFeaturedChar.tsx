import { useState, useRef } from "react";
import { useAppSelector } from "../../../store/hooks";
import { Character } from "../../../types/types";
import styles from "../Dashboard.module.css";
import {
  Button,
  TextField,
  Autocomplete,
  Checkbox,
  FormControlLabel,
  Alert,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const EditFeaturedChar = () => {
  // =========
  // Variables
  // =========
  const userData = useAppSelector((state) => state.user.userData);
  const featuredChar = useAppSelector((state) => state.dashboard.featuredChar);
  const editedChar = useState<Character>(featuredChar);
  const ignRef = useRef<HTMLInputElement>(null);
  const levelRef = useRef<HTMLInputElement>(null);
  const [classes, setClasses] = useState<string[]>([]);
  const [selectedClass, setSelectedClass] = useState<string | null>("");
  const [ignError, setIgnError] = useState<boolean>(false);
  const [levelError, setLevelError] = useState<boolean>(false);
  const [classError, setClassError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [duplicateError, setDuplicateError] = useState<boolean>(false);
  const [file, setFile] = useState<File>();

  // ==============
  // Event Handlers
  // ==============
  // Check if the user has resolved the ign error
  function handleIgnChange() {
    if (ignError) {
      if (ignRef.current) {
        if (ignRef.current.value.length <= 12) {
          setIgnError(false);
        }
      }
    }
    if (success) {
      setSuccess(false);
    }
  }

  // Check if the user has resolved the level error
  function handleLevelChange() {
    if (levelError) {
      if (levelRef.current) {
        // Check if Level is a number and is an integer of 1 - 300
        if (Number(levelRef.current.value)) {
          const level = Number(levelRef.current.value);
          if (Number.isInteger(level) && level >= 1 && level <= 300) {
            setLevelError(false);
          }
        }
      }
    }
    if (success) {
      setSuccess(false);
    }
  }

  function handleClassChange(e: any, value: string | null) {
    setSelectedClass(value);

    if (classError) {
      setClassError(false);
    }

    if (success) {
      setSuccess(false);
    }
  }

  const handleFileChange = (e: any) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  // ======
  // Return
  // ======
  return (
    <div className={styles.edit_ctn}>
      <div className={styles.edit_top}>
        <Button
          size="medium"
          variant="outlined"
          color="secondary"
          startIcon={<ArrowBackIcon />}
          className={styles.edit_back_btn}
          style={{ position: "absolute", top: "1%", left: "2%" }}
        >
          Back
        </Button>
        <div className={styles.edit_image_ctn}>
          <Button
            size="large"
            variant="outlined"
            color="secondary"
            component="label"
          >
            Upload File
            <input type="file" onChange={handleFileChange} hidden />
          </Button>
          {file && <p>{file.name}</p>}
        </div>
        <div className={styles.edit_ign_class}>
          <TextField
            size="small"
            inputRef={ignRef}
            onChange={handleIgnChange}
            error={ignError}
            helperText={ignError && "IGN must be 12 characters or less"}
            label="IGN"
            required
            color="primary"
            className={styles.text_field}
          />
          <TextField
            size="small"
            inputRef={levelRef}
            onChange={handleLevelChange}
            error={levelError}
            helperText={
              levelError && "Level must be an integer number from 1-300"
            }
            label="Level"
            required
            color="primary"
            className={styles.text_field}
          />
          <Autocomplete
            size="small"
            onChange={handleClassChange}
            disablePortal
            id="classes_dropdown"
            options={classes}
            sx={{ width: "100%" }}
            renderInput={(params) => <TextField {...params} label="Class" />}
          />
        </div>
      </div>
      <div className={styles.edit_mid}>
        <FormControlLabel
          style={{ width: "max-content" }}
          control={
            <Checkbox
              // style={{ width: "max-content" }}
              // onChange={handleChange}
              // checked={tracking.bossing}
              id="bossing"
            />
          }
          label="Main Character"
        />
        <TextField
          size="small"
          inputRef={levelRef}
          onChange={handleLevelChange}
          error={levelError}
          helperText={
            levelError && "Level must be an integer number from 1-300"
          }
          label="Stat"
          color="primary"
          className={styles.text_field}
        />
        <TextField
          size="small"
          inputRef={levelRef}
          onChange={handleLevelChange}
          error={levelError}
          helperText={
            levelError && "Level must be an integer number from 1-300"
          }
          label="Dojo Floor"
          color="primary"
          className={styles.text_field}
        />
        <TextField
          size="small"
          inputRef={levelRef}
          onChange={handleLevelChange}
          error={levelError}
          helperText={
            levelError && "Level must be an integer number from 1-300"
          }
          label="Full Rotation BA (b/s)"
          color="primary"
          className={styles.text_field}
        />
      </div>
      <div className={styles.edit_btm}>
        <Button
          variant="contained"
          size="large"
          color="error"
          className={styles.delete_btn}
        >
          Delete
        </Button>
        <Button
          variant="contained"
          size="large"
          color="info"
          className={styles.delete_btn}
        >
          Update
        </Button>
      </div>
    </div>
  );
};

export default EditFeaturedChar;
