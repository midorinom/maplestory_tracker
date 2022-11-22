import React, { useState, useEffect, useRef } from "react";
import { TextField, Button } from "@mui/material";

interface EditDailiesCardProps {
  editedDailies: string[];
  setEditedDailies: any;
  editDailiesError: boolean;
  setEditDailiesError: any;
  dailiesSuccess: boolean;
  setDailiesSuccess: any;
  setMapEditDailiesCards: any;
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
    if (props.dailiesSuccess) {
      props.setDailiesSuccess(false);
    }

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
    props.setMapEditDailiesCards(true);
    props.setEditedDailies(editedDailiesArr);
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
        style={{ position: "relative", top: "0.8rem" }}
      >
        —
      </Button>
    </div>
  );
};

export default EditDailiesCard;
