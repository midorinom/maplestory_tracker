import { useState, useRef, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { dashboardActions } from "../../../store/dashboard";
import { Character, GetClassesRes } from "../../../types/types";
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

interface EditFeaturedCharProps {
  getCharacters: () => void;
}

const EditFeaturedChar = () => {
  // =========
  // Variables
  // =========
  const dispatch = useAppDispatch();
  const userData = useAppSelector((state) => state.user.userData);
  const featuredChar = useAppSelector((state) => state.dashboard.featuredChar);
  const [editedChar, setEditedChar] = useState<Character>(featuredChar);
  const ignRef = useRef<HTMLInputElement>(null);
  const levelRef = useRef<HTMLInputElement>(null);
  const statRef = useRef<HTMLInputElement>(null);
  const dojoRef = useRef<HTMLInputElement>(null);
  const baRef = useRef<HTMLInputElement>(null);
  const [classes, setClasses] = useState<string[]>([]);
  const [selectedClass, setSelectedClass] = useState<string | null>(
    featuredChar.class_name
  );
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

  function handleMainChange(e: any) {
    if (editedChar.is_main === true) {
      setEditedChar((prevState: Character) => {
        return { ...prevState, [e.target.id]: false };
      });
    } else {
      setEditedChar((prevState: Character) => {
        return { ...prevState, [e.target.id]: true };
      });
    }
  }

  function handleFileChange(e: any) {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  }

  function backButton() {
    dispatch(dashboardActions.setIsEditing(false));
  }

  // ==========
  // useEffects
  // ==========
  // onMount
  useEffect(() => {
    getClasses();

    if (ignRef.current && levelRef.current) {
      ignRef.current.value = featuredChar.ign;
      levelRef.current.value = String(featuredChar.level);
      if (statRef.current && featuredChar.stats) {
        statRef.current.value = String(featuredChar.stats);
      }
      if (dojoRef.current && featuredChar.dojo) {
        dojoRef.current.value = String(featuredChar.dojo);
      }
      if (baRef.current && featuredChar.ba) {
        baRef.current.value = String(featuredChar.ba);
      }
    }
  }, []);

  // // after character is created
  // useEffect(() => {
  //   if (createdChar) {
  //     uploadImage();
  //   }
  // }, [createdChar]);

  // ===============
  // Fetch Functions
  // ===============
  const getClasses = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/enums/classes/get", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          role: userData.role,
        }),
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
    <div className={styles.edit_ctn}>
      <div className={styles.edit_top}>
        <Button
          onClick={backButton}
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
            value={selectedClass}
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
              style={{ width: "max-content" }}
              onChange={handleMainChange}
              checked={editedChar.is_main}
              id="is_main"
            />
          }
          label="Main Character"
        />
        <TextField
          size="small"
          inputRef={statRef}
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
          inputRef={dojoRef}
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
          inputRef={baRef}
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
