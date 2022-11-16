import { useState, useRef } from "react";
import { useAppSelector } from "../../../store/hooks";
import { Character } from "../../../types/types";
import styles from "../Dashboard.module.css";
import { Button, TextField, Autocomplete, Tooltip, Alert } from "@mui/material";

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
    <div className={styles.featured_ctn}>
      <div className={styles.featured_top}>
        {/* {showEditIcon && (
          <IconButton
            style={{ position: "absolute", top: "1%", right: "2%" }}
            onClick={edit}
            size="large"
            className={styles.edit_btn_ctn}
          >
            <EditIcon className={styles.edit_btn_icon} />
          </IconButton>
        )} */}
        <div className={styles.featured_image_ctn}></div>
        <div className={styles.featured_ign_class}>
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
            renderInput={(params) => <TextField {...params} label="Classes" />}
          />
        </div>
      </div>
      <div className={styles.featured_mid}>
        <p>Stat:</p>
        <p>Dojo Floor:</p>
        <p>Full Rotation BA (b/s):</p>
      </div>
      <div className={styles.featured_btm}>Delete Button</div>
    </div>
  );
};

export default EditFeaturedChar;
