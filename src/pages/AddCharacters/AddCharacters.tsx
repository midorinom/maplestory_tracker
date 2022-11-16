import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import {
  GetClassesRes,
  DefaultRes,
  CreateCharacterRes,
  Character,
} from "../../types/types";
import styles from "./AddCharacters.module.css";
import { Button, TextField, Autocomplete, Tooltip, Alert } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const AddCharacters = () => {
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
  const [classError, setClassError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [duplicateError, setDuplicateError] = useState<boolean>(false);
  const [file, setFile] = useState<File>();
  const [createdChar, setCreatedChar] = useState<Character>();

  function getImageTooltip() {
    if (userData.role === "GMS") {
      return "Search for your character either on maplestory.gg or the official website's rankings page. Alternatively, you can create your character on maples.im";
    } else if (userData.role === "MSEA") {
      return "Create your character on the maples.im website. Alternatively, you can use a snipping tool to crop out your character from ingame.";
    }
  }
  const imageTooltip = getImageTooltip();
  // ==============
  // Event Handlers
  // ==============
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSuccess(false);
    setDuplicateError(false);

    let validation: number = 0;

    // Check if IGN is 12 characters or less
    if (ignRef.current) {
      if (ignRef.current.value.length > 12) {
        setIgnError(true);
        validation += 1;
      }
    }

    // Check if Level is a number and is an integer of 1 - 300
    if (levelRef.current) {
      if (!Number(levelRef.current.value)) {
        setLevelError(true);
        validation += 1;
      } else {
        const level = Number(levelRef.current.value);
        if (!Number.isInteger(level) || level < 1 || level > 300) {
          setLevelError(true);
          validation += 1;
        }
      }
    }

    // Check if Class is selected
    if (ignRef.current && levelRef.current) {
      if (!selectedClass) {
        setClassError(true);
        validation += 1;
      }

      // If there are no errors, perform the fetch to create a new character
      if (validation === 0) {
        createCharacter();
      }
    }
  }

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

  function handleFileChange(e: any) {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  }

  // ==========
  // useEffects
  // ==========
  useEffect(() => {
    getClasses();
  }, []);

  useEffect(() => {
    if (createdChar) {
      uploadImage();
    }
  }, [createdChar]);

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

  const createCharacter = async () => {
    try {
      if (ignRef.current && levelRef.current) {
        const res = await fetch("http://127.0.0.1:5000/characters/create", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            username: userData.username,
            ign: ignRef.current.value,
            level: levelRef.current.value,
            class_name: selectedClass,
          }),
        });
        const response: CreateCharacterRes = await res.json();
        // Handle duplicate IGN error
        if (response.message === "This character has already been created") {
          setDuplicateError(true);
          throw new Error(response.message);
        } else if (response.message === "Character is created") {
          setSuccess(true);
          setCreatedChar(response.character);
        }
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  const uploadImage = async () => {
    try {
      if (file && createdChar) {
        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch(
          `http://127.0.0.1:5000/characters/upload/${createdChar.uuid}`,
          {
            method: "POST",
            body: formData,
          }
        );
        const response: DefaultRes = await res.json();
      }
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
        <div className={styles.main_top_ctn}>
          <Button
            variant="outlined"
            color="secondary"
            component={Link}
            to="/"
            startIcon={<ArrowBackIcon />}
            className={styles.back_btn}
          >
            Back
          </Button>
          {success && (
            <Alert severity="success" className={styles.alert}>
              Character added!
            </Alert>
          )}
          {duplicateError && (
            <Alert severity="error" className={styles.alert}>
              Duplicate IGN
            </Alert>
          )}
          {classError && (
            <Alert severity="error" className={styles.alert}>
              Please select a class
            </Alert>
          )}
        </div>
        <form onSubmit={handleSubmit} className={styles.form}>
          <TextField
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
            onChange={handleClassChange}
            disablePortal
            id="classes_dropdown"
            options={classes}
            sx={{ width: "60%" }}
            renderInput={(params) => <TextField {...params} label="Class" />}
          />
          <div className={styles.upload_ctn}>
            <Tooltip title={imageTooltip}>
              {file ? <p>{file.name}</p> : <p>Image: </p>}
            </Tooltip>
            <Button variant="outlined" color="secondary" component="label">
              Upload File
              <input type="file" onChange={handleFileChange} hidden />
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

export default AddCharacters;
