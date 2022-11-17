import { useState, useRef, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { dashboardActions } from "../../../store/dashboard";
import { Character, DefaultRes, GetClassesRes } from "../../../types/types";
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
  const [isMain, setIsMain] = useState<boolean>(featuredChar.is_main);
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
  const [duplicateError, setDuplicateError] = useState<boolean>(false);
  const [levelError, setLevelError] = useState<boolean>(false);
  const [classError, setClassError] = useState<boolean>(false);
  const [statError, setStatError] = useState<boolean>(false);
  const [dojoError, setDojoError] = useState<boolean>(false);
  const [baError, setBaError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [file, setFile] = useState<File>();

  // ==============
  // Event Handlers
  // ==============
  function backButton() {
    dispatch(dashboardActions.setIsEditing(false));
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

  // Check if the user has resolved the class error
  function handleClassChange(e: any, value: string | null) {
    setSelectedClass(value);
    if (classError) {
      setClassError(false);
    }
    if (success) {
      setSuccess(false);
    }
  }

  // Check if the user checked the "Main" checkbox
  function handleMainChange(e: any) {
    if (isMain === true) {
      setIsMain(false);
    } else {
      setIsMain(true);
    }
  }

  // Check if the user has resolved the stat error
  function handleStatChange() {
    if (statError) {
      if (statRef.current) {
        // Check if stat is a number and is an integer of 1 - 999999
        if (Number(statRef.current.value)) {
          const stat = Number(statRef.current.value);
          if (Number.isInteger(stat) && stat >= 1 && stat <= 999999) {
            setStatError(false);
          }
        }
      }
    }
    if (success) {
      setSuccess(false);
    }
  }

  // Check if the user has resolved the dojo error
  function handleDojoChange() {
    if (dojoError) {
      if (dojoRef.current) {
        // Check if dojo is a number and is an integer of 1 - 999
        if (Number(dojoRef.current.value)) {
          const dojo = Number(dojoRef.current.value);
          if (Number.isInteger(dojo) && dojo >= 1 && dojo <= 999) {
            setDojoError(false);
          }
        }
      }
    }
    if (success) {
      setSuccess(false);
    }
  }

  // Check if the user has resolved the stat error
  function handleBaChange() {
    if (baError) {
      if (baRef.current) {
        // Check if ba is a number and is an integer of 1 - 9999
        if (Number(baRef.current.value)) {
          const ba = Number(baRef.current.value);
          if (Number.isInteger(ba) && ba >= 1 && ba <= 9999) {
            setBaError(false);
          }
        }
      }
    }
    if (success) {
      setSuccess(false);
    }
  }

  // Check if the user has selected a different file
  function handleFileChange(e: any) {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  }

  // ======
  // Submit
  // ======
  function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setSuccess(false);
    setDuplicateError(false);

    let validation: number = 0;

    // Check if IGN is 12 characters or less
    if (ignRef.current) {
      if (
        ignRef.current.value.length > 12 ||
        ignRef.current.value.length === 0
      ) {
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

      // Validate for Stats
      if (statRef.current && statRef.current.value !== "") {
        if (!Number(statRef.current.value)) {
          setStatError(true);
          validation += 1;
        } else {
          const stats = Number(statRef.current.value);
          if (!Number.isInteger(stats) || stats < 0 || stats > 999999) {
            setStatError(true);
            validation += 1;
          }
        }
      }

      // Validate for Dojo
      if (dojoRef.current && dojoRef.current.value !== "") {
        if (!Number(dojoRef.current.value)) {
          setDojoError(true);
          validation += 1;
        } else {
          const dojo = Number(dojoRef.current.value);
          if (!Number.isInteger(dojo) || dojo < 0 || dojo > 999) {
            setStatError(true);
            validation += 1;
          }
        }
      }

      // Validate for Ba
      if (baRef.current && baRef.current.value !== "") {
        if (!Number(baRef.current.value)) {
          setBaError(true);
          validation += 1;
        } else {
          const ba = Number(baRef.current.value);
          if (!Number.isInteger(ba) || ba < 0 || ba > 9999) {
            setBaError(true);
            validation += 1;
          }
        }
      }

      // If there are no errors, perform the fetch to create a new character
      if (validation === 0) {
        updateCharacter();
        uploadImage();

        if (isMain) {
          const currentMain = userData.characters.find(
            (element) => element.is_main === true
          );
          if (currentMain) {
            updateMain(currentMain.uuid);
          }
        }

        setSuccess(true);
      }
    }
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

  const updateCharacter = async () => {
    try {
      if (ignRef.current && levelRef.current) {
        // Combined the form inputs with the previous character data
        let stat: number = 0;
        let dojo: number = 0;
        let ba: number = 0;
        if (statRef.current) {
          stat = Number(statRef.current.value);
        }
        if (dojoRef.current) {
          dojo = Number(dojoRef.current.value);
        }
        if (baRef.current) {
          ba = Number(baRef.current.value);
        }

        const formInputs = {
          ign: ignRef.current.value,
          level: levelRef.current.value,
          class_name: selectedClass,
          stats: stat,
          dojo: dojo,
          ba: ba,
          is_main: isMain,
        };

        // Update the character
        const res = await fetch("http://127.0.0.1:5000/characters/update", {
          method: "PATCH",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ ...featuredChar, ...formInputs }),
        });
        const updateResponse: DefaultRes = await res.json();
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  const uploadImage = async () => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch(
        `http://127.0.0.1:5000/characters/upload/${featuredChar.uuid}`,
        {
          method: "POST",
          body: formData,
        }
      );
      const response: DefaultRes = await res.json();
    }
  };

  const updateMain = async (uuid: string) => {
    if (uuid) {
      const update = {
        uuid: uuid,
        is_main: false,
      };

      const res = await fetch("http://127.0.0.1:5000/characters/update", {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...update }),
      });
      const response: DefaultRes = await res.json();
    }
  };

  // ======
  // Return
  // ======
  return (
    <div className={styles.edit_ctn}>
      <div className={styles.edit_top}>
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
            helperText={ignError && "Required and must be <= 12 chars"}
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
            helperText={levelError && "Level must be an integer from 1-300"}
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
        <TextField
          size="small"
          inputRef={statRef}
          onChange={handleStatChange}
          error={statError}
          helperText={
            statError && "Stats must be an integer number from 1-999999"
          }
          label="Stat"
          color="primary"
          className={styles.stats_text_field}
        />
        <TextField
          size="small"
          inputRef={dojoRef}
          onChange={handleDojoChange}
          error={dojoError}
          helperText={dojoError && "Level must be an integer number from 1-999"}
          label="Dojo Floor"
          color="primary"
          className={styles.stats_text_field}
        />
        <TextField
          size="small"
          inputRef={baRef}
          onChange={handleBaChange}
          error={baError}
          helperText={baError && "BA must be an integer number from 1-9999"}
          label="Full Rotation BA (b/s)"
          color="primary"
          className={styles.stats_text_field}
        />
        <FormControlLabel
          style={{ width: "max-content" }}
          control={
            <Checkbox
              style={{ width: "max-content" }}
              onChange={handleMainChange}
              checked={isMain}
              id="is_main"
            />
          }
          label="Main Character"
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
          onClick={handleSubmit}
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
