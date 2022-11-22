import React, { useState, useEffect, useRef } from "react";
import { TextField, Button } from "@mui/material";

interface EditWeekliesCardProps {
  editedWeeklies: string[];
  setEditedWeeklies: any;
  editWeekliesError: boolean;
  setEditWeekliesError: any;
  weekliesSuccess: boolean;
  setWeekliesSuccess: any;
  setMapEditWeekliesCards: any;
  name: string;
  index: number;
}

const EditWeekliesCard: React.FC<EditWeekliesCardProps> = (props) => {
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
  function handleEditWeekliesChange() {
    props.setWeekliesSuccess(false);

    if (inputRef.current) {
      if (!lengthError) {
        if (inputRef.current.value.length > 20) {
          setLengthError(true);
          props.setEditWeekliesError(true);
        } else {
          const editedWeekliesArr = [...props.editedWeeklies];
          editedWeekliesArr.splice(props.index, 1, inputRef.current.value);
          props.setEditedWeeklies(editedWeekliesArr);
        }
      } else {
        if (inputRef.current.value.length <= 20) {
          setLengthError(false);
          props.setEditWeekliesError(false);

          const editedWeekliesArr = [...props.editedWeeklies];
          editedWeekliesArr.splice(props.index, 1, inputRef.current.value);
          props.setEditedWeeklies(editedWeekliesArr);
        }
      }
    }
  }

  function handleDelete() {
    props.setWeekliesSuccess(false);
    props.setMapEditWeekliesCards(true);

    const editedWeekliesArr = [...props.editedWeeklies];
    editedWeekliesArr.splice(props.index, 1);
    props.setEditedWeeklies(editedWeekliesArr);
  }

  // ======
  // Return
  // ======
  return (
    <div>
      <TextField
        size="small"
        id={props.name}
        inputRef={inputRef}
        onChange={handleEditWeekliesChange}
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
        style={{ position: "relative", top: "0.8rem" }}
      >
        —
      </Button>
    </div>
  );
};

export default EditWeekliesCard;
