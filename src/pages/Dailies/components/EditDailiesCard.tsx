import React, { useState, useEffect, useRef } from "react";
import { TextField, Button } from "@mui/material";
import styles from "../Dailies.module.css";

interface EditDailiesCardProps {
  editedDailies: string[];
  setEditedDailies: any;
  editDailiesError: boolean;
  setEditDailiesError: any;
  name: string;
  index: number;
}

const EditDailiesCard: React.FC<EditDailiesCardProps> = (props) => {
  // =========
  // Variables
  // =========
  const [lengthError, setLengthError] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // =======
  // onMount
  // =======
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = props.name;
    }
  }, []);

  // ==============
  // Event Handlers
  // ==============
  function handleEditDailiesChange() {
    if (inputRef.current) {
      if (!lengthError) {
        if (inputRef.current.value.length > 20) {
          setLengthError(true);
          props.setEditDailiesError(true);
        } else {
          const editedDailiesArr = [...props.editedDailies];
          editedDailiesArr.splice(props.index, 1, inputRef.current.value);
          props.setEditedDailies(editedDailiesArr);
        }
      } else {
        if (inputRef.current.value.length <= 20) {
          setLengthError(false);
          props.setEditDailiesError(false);

          const editedDailiesArr = [...props.editedDailies];
          editedDailiesArr.splice(props.index, 1, inputRef.current.value);
          props.setEditedDailies(editedDailiesArr);
        }
      }
    }
  }

  function handleDelete() {
    const editedDailiesArr = [...props.editedDailies];
    editedDailiesArr.splice(props.index, 1);
    props.setEditedDailies(editedDailiesArr);
  }

  // ======
  // Return
  // ======
  return (
    <div className={styles.edit_dailies_card}>
      <TextField
        size="small"
        id={props.name}
        inputRef={inputRef}
        onChange={handleEditDailiesChange}
        error={lengthError}
        helperText={lengthError && "Must be <= 20 chars"}
        color="primary"
        style={{ margin: "0.5rem", minWidth: "15vw" }}
      ></TextField>
      <Button
        onClick={handleDelete}
        size="small"
        variant="outlined"
        color="error"
      >
        —
      </Button>
    </div>
  );
};

export default EditDailiesCard;
