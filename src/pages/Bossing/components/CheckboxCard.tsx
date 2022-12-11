import React, { useState } from "react";
import { useAppDispatch } from "../../../store/hooks";
import { FormControlLabel, Checkbox } from "@mui/material";
import styles from "../Bossing.module.css";

interface CheckboxCardProps {
  boss: string;
  index: number;
  checked: boolean;
}

const CheckboxCard: React.FC<CheckboxCardProps> = (props) => {
  // =========
  // Variables
  // =========
  const [checked, setChecked] = useState<boolean>(props.checked);

  // ==============
  // Event Handlers
  // ==============
  function handleChange() {
    if (checked) {
      setChecked(false);
    } else {
      setChecked(true);
    }
  }

  // ======
  // Return
  // ======
  return (
    <div>
      <FormControlLabel
        control={
          <Checkbox
            onChange={handleChange}
            checked={checked}
            //   id={props.name}
          />
        }
        label={props.boss}
      />
    </div>
  );
};

export default CheckboxCard;
