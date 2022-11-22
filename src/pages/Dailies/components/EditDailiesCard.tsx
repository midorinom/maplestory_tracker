import React, { useState, useEffect, useRef } from "react";
import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import { dailiesActions } from "../../../store/dailies";
import { TextField, Button } from "@mui/material";

interface EditDailiesCardProps {
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
  const dispatch = useAppDispatch();
  const editedDailies = useAppSelector((state) => state.dailies.editedDailies);
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
    props.setDailiesSuccess(false);

    if (inputRef.current) {
      if (!lengthError) {
        if (inputRef.current.value.length > 20) {
          setLengthError(true);
          props.setEditDailiesError(true);
        } else {
          const editedDailiesArr = [...editedDailies];
          editedDailiesArr.splice(props.index, 1, inputRef.current.value);
          dispatch(dailiesActions.setEditedDailies(editedDailiesArr));
        }
      } else {
        if (inputRef.current.value.length <= 20) {
          setLengthError(false);
          props.setEditDailiesError(false);

          const editedDailiesArr = [...editedDailies];
          editedDailiesArr.splice(props.index, 1, inputRef.current.value);
          dispatch(dailiesActions.setEditedDailies(editedDailiesArr));
        }
      }
    }
  }

  function handleDelete() {
    props.setDailiesSuccess(false);
    props.setMapEditDailiesCards(true);

    const editedDailiesArr = [...editedDailies];
    editedDailiesArr.splice(props.index, 1);
    dispatch(dailiesActions.setEditedDailies(editedDailiesArr));
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
