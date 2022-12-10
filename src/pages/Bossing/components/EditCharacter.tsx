import React from "react";
import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import styles from "../Bossing.module.css";

interface EditCharacterProps {
  setIsEditing: any;
}

const EditCharacter: React.FC<EditCharacterProps> = (props) => {
  return (
    <div className={styles.edit_ctn}>
      <Button
        onClick={() => {
          props.setIsEditing(false);
        }}
        size="medium"
        variant="outlined"
        color="secondary"
        startIcon={<ArrowBackIcon />}
        style={{ position: "absolute", left: "0" }}
      >
        Back
      </Button>
    </div>
  );
};

export default EditCharacter;
